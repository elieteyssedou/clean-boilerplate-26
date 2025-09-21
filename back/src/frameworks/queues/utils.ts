import {
  FlowJob,
  FlowOpts,
  FlowProducer, Job, Queue, QueueEvents, Worker,
  WorkerOptions,
} from 'bullmq';
import { pick } from 'lodash-es';
import { Redis } from 'ioredis';
import logger, { logWithExecutionTime } from '@/frameworks/utils/logger';
import jobs, { JobData } from '@/frameworks/queues/jobs';

const handleQueueErrors = (queue: Queue) => {
  queue.on('error', (err) => {
    // Sentry.captureException(err, {
    //   tags: {
    //     event: 'error',
    //     queue: queue.name,
    //   },
    // });

    logger.error({ err }, 'error', err);
  });
};

const handleQueueEvents = (queue: QueueEvents) => {
  queue.on('stalled', ({ jobId }) => {
    logger.warn(`Job id ${jobId} stalled`);
  });
};

const handleWorkerEvents = (worker: Worker, queueName: string) => {
  worker.on('stalled', (jobId) => {
    logger.warn({ jobId }, `${queueName} - ${jobId} STALLED`);
  });

  worker.on('failed', (job) => {
    logger.error({ job }, `${queueName} - ${job?.name} FAILED`);
  });

  worker.on('error', (err) => {
    logger.error({ err }, `${queueName} - ERROR`);
  });
};

export const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableOfflineQueue: false,
});

export const createQueue = (name: string) => {
  const queue = new Queue(name, {
    connection,
    defaultJobOptions: {
      // the job is remove by metrics collector
      removeOnComplete: false,
      removeOnFail: false,
    },
    streams: {
      // @see https://github.com/taskforcesh/bullmq/blob/master/src/interfaces/queue-options.ts#L13
      events: { maxLen: 100 },
    },
  });

  handleQueueErrors(queue);

  const queueEvents = new QueueEvents(name);
  handleQueueEvents(queueEvents);

  return queue;
};

export const createWorker = ({ queueName, processor, opts = {} }: {
  queueName: string;
  processor: (job: Job) => Promise<void>;
  opts?: Omit<WorkerOptions, 'connection'>;
}) => {
  const allOpts = {
    ...opts,
    connection,
  };

  const worker = new Worker(queueName, processor, allOpts);

  handleWorkerEvents(worker, queueName);

  return worker;
};

export const processJob = async ({ queueName, job }: {
  queueName: string;
  job: Job;
}) => {
  try {
    const startTime = process.hrtime.bigint();

    logger.info({ job: pick(job, ['name', 'id', 'data']) }, `${queueName} - STARTING to process ${job.name} job`);

    const result = await jobs[job.name](job.data as JobData, job);

    logWithExecutionTime({ context: { job: pick(job, ['name', 'id', 'data']) }, startTime, message: `${queueName} - DONE processing ${job.name} job` });

    return result;
  } catch (err) {
    logger.error({ err, queueName, job }, 'ERROR on processing job');
    // Sentry.captureException(err, {
    //   tags: { event: 'error', queue: queueName, job: job.name },
    //   extra: { job },
    // });

    throw err;
  }
};

export const createFlow = async (flow: FlowJob, opts: FlowOpts) => {
  const flowProducer = new FlowProducer({ connection });
  return flowProducer.add(flow, opts);
};
