import { JobsOptions } from 'bullmq';
import {
  startWorkerOnDefaultQueue, stopWorkerOnDefaultQueue, defaultQueue, defaultQueueName,
} from './default-queue';
import {
  startWorkerOnCronQueue, stopWorkerOnCronQueue, cronQueue, cronQueueName,
} from './cron-queue';
import logger from '@/frameworks/utils/logger';
import WorkerError from '@/domain/errors/WorkerError';
import { connection, createFlow } from './utils';
import {
  allJobsConfigs, cronJobsConfig, JobConfig, QueuableJobOptions,
} from '@/frameworks/queues/jobs-config';
import { JobData, JobName } from '@/frameworks/queues/jobs';

export async function queueJob(jobName: JobName, data: JobData, options?: JobsOptions) {
  const jobConfig = allJobsConfigs[jobName];
  const jobOpts = getJobOptions(jobName, data, options);

  switch (jobConfig.queue) {
    case 'CRON':
      logger.info({ jobName, data, jobOpts }, 'Queue a job on cron queue');
      return cronQueue.add(jobName, data, { ...jobOpts });
    case 'DEFAULT':
    default:
      logger.info({ jobName, data, jobOpts }, 'Queue a job on default queue');
      return defaultQueue.add(jobName, data, { ...jobOpts });
  }
}

type FlowName = string;
type FlowData = Record<PropertyKey, unknown>;
type FlowJobs = [{ name: JobName, data: JobData, options: JobsOptions }];
interface FlowOptions {
  data: FlowData,
  jobs: FlowJobs,
  options: JobsOptions
}

export async function queueFlow(
  flowName: FlowName,
  { data, jobs, options }: FlowOptions,
) {
  const flowConfig = allJobsConfigs[flowName];
  const queueName = getQueueName(flowConfig);
  const flowOpts = getJobOptions(flowName, data, options);

  const children = jobs.map((job) => {
    const jobConfig = allJobsConfigs[job.name];
    const jobOpts = getJobOptions(job.name, job.data, job.options);
    return { ...job, opts: jobOpts, queueName: getQueueName(jobConfig) };
  });

  return createFlow({
    name: flowName, opts: flowOpts, queueName, data, children,
  }, {
    queuesOptions: {
      // potential options for a fast queue
      // [fastQueueName]: {
      //   defaultJobOptions: {
      //     removeOnComplete: true,
      //     attempts: 3,
      //     backoff: {
      //       type: 'exponential',
      //       delay: 1000,
      //     },
      //   },
      // },
      [defaultQueueName]: {
        defaultJobOptions: {
          removeOnComplete: true,
        },
      },
    },
  });
}

export const stopQueues = async () => {
  await cronQueue.close();
  await defaultQueue.close();

  connection.disconnect();
};

export const startQueuesProcessing = async () => {
  startWorkerOnDefaultQueue();

  if (process.env.INTERNAL_PROCESS_CRON_JOBS === 'true') {
    await startWorkerOnCronQueue(cronJobsConfig);
  }
};

export const stopQueuesProcessing = async () => {
  await stopWorkerOnDefaultQueue();

  if (process.env.INTERNAL_PROCESS_CRON_JOBS === 'true') {
    await stopWorkerOnCronQueue();
  }

  await stopQueues();
};

function getJobOptions(jobName: JobName, data: JobData, options: JobsOptions = {}) {
  const jobConfig = allJobsConfigs[jobName];
  if (!jobConfig) throw new WorkerError(`You must configure the following job: ${jobName}. You have to do it here: back/src/queues/index.js`);

  const jobOpts: QueuableJobOptions = {
    ...jobConfig.opts,
    ...options,
  };

  if (jobOpts.getJobIdFromData) {
    jobOpts.jobId = jobOpts.getJobIdFromData(data);
  }

  return jobOpts;
}

function getQueueName(jobConfig: JobConfig) {
  switch (jobConfig.queue) {
    case 'CRON':
      return cronQueueName;
    case 'DEFAULT':
    default:
      return defaultQueueName;
  }
}
