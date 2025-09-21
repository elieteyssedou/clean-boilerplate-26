import { Job, Worker } from 'bullmq';
import { createQueue, createWorker, processJob } from './utils';
import { queueJob } from './index.js';
import { JobsWithConfig } from '@/frameworks/queues/jobs-config';

export const cronQueueName = 'CRON_QUEUE';

export const cronQueue = createQueue(cronQueueName);

async function cleanCronJobs() {
  const repeatableJobs = await cronQueue.getRepeatableJobs();

  // Cleans everything in cronQueue to remove scheduled CRON jobs
  // This cleans is making CRON jobs list below exhaustive
  // (no CRON still scheduled from previous deploy)
  await Promise.all(repeatableJobs.map(
    async (repeatableJob) => cronQueue.removeRepeatableByKey(repeatableJob.key),
  ));
}

async function scheduleJobs(cronJobsConfig: JobsWithConfig) {
  await Promise.all(
    Object.keys(cronJobsConfig).map(async (jobName) => queueJob(jobName, {})),
  );
}

async function cronProcessor(job: Job) {
  await processJob({ queueName: 'CRON queue', job });
}

let worker: Worker;

export async function startWorkerOnCronQueue(cronJobsConfig: JobsWithConfig) {
  await cleanCronJobs();
  await scheduleJobs(cronJobsConfig);

  worker = createWorker({
    queueName: cronQueueName,
    processor: cronProcessor,
  });
}

export async function stopWorkerOnCronQueue() {
  await worker.close();
}
