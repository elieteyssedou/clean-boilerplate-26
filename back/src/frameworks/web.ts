import 'dotenv/config';
import { createServer } from 'node:http';

import connectMongoose from '@/frameworks/database/mongoose';
import yoga from '@/frameworks/web/app';
import logger from '@/frameworks/utils/logger';
import {
  OnWorkerStartParams, OnWorkerTerminateParams, startCluster, WorkerInstances,
} from '@/frameworks/utils/processes';

const PORT = process.env.PORT || 3000;

startCluster({
  clusterName: 'Web',
  onWorkerStart,
  onWorkerTerminate,
  shouldProcessJobs: false,
}).catch((error) => {
  logger.error('Server crashed.');
  logger.debug(error);
});

async function onWorkerStart({ clusterName }: OnWorkerStartParams) {
  const workerInstances: WorkerInstances = {};

  workerInstances.mongooseConnection = await connectMongoose();

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const server = createServer(yoga);
  workerInstances.server = server.listen(PORT, () => {
    logger.info(`${clusterName} | Worker process ${process.pid} is listening on port ${PORT}`);
  });

  return workerInstances;
}

async function onWorkerTerminate({ workerInstances }: OnWorkerTerminateParams) {
  await workerInstances.mongooseConnection?.close();
}
