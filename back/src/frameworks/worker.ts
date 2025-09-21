import 'dotenv/config';
import connectMongoose from '@/frameworks/database/mongoose';
import { startQueuesProcessing, stopQueuesProcessing } from '@/frameworks/queues/index';
import logger from '@/frameworks/utils/logger';
import { OnWorkerTerminateParams, startCluster, WorkerInstances } from '@/frameworks/utils/processes';

startCluster({
  clusterName: 'Worker',
  onWorkerStart,
  onWorkerTerminate,
  shouldProcessJobs: true,
}).catch((error) => {
  logger.error('Worker crashed.', error);
});

async function onWorkerStart() {
  const workerInstances: WorkerInstances = {};

  workerInstances.mongooseConnection = await connectMongoose();
  // initWorkerSentry();

  await startQueuesProcessing();

  return workerInstances;
}

async function onWorkerTerminate({ workerInstances }: OnWorkerTerminateParams) {
  await workerInstances.mongooseConnection?.close();
  await stopQueuesProcessing();
}
