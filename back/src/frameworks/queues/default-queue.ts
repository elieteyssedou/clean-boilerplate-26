import { Job, Worker } from 'bullmq';
import { createQueue, createWorker, processJob } from './utils.js';

export const defaultQueueName = 'DEFAULT_QUEUE';

export const defaultQueue = createQueue(defaultQueueName);

let worker: Worker;

async function processor(job: Job) {
  return processJob({ queueName: defaultQueueName, job });
}

export function startWorkerOnDefaultQueue() {
  // if in need of concurrency, you may want to create a new queue for that
  worker = createWorker({ queueName: defaultQueueName, processor, opts: { concurrency: 1 } });
}

export async function stopWorkerOnDefaultQueue() {
  await worker.close();
}
