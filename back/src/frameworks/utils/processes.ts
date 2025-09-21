import 'dotenv/config';
import cluster from 'cluster';
import os from 'os';
import { Connection } from 'mongoose';
import { Server } from 'http';
import logger from '@/frameworks/utils/logger';

const numCPUs = process.env.MODE === 'development' ? 2 : os.cpus().length;

// Usefull for storing connections, etc. to be used while terminating the worker
export interface WorkerInstances {
  mongooseConnection?: Connection,
  server?: Server
}

export interface OnWorkerStartParams {
  clusterName: string
}

export interface OnWorkerTerminateParams {
  clusterName: string,
  workerInstances: WorkerInstances
}

interface StartClusterParams {
  clusterName: string,
  onWorkerStart: ({ clusterName }: OnWorkerStartParams) => Promise<WorkerInstances>,
  onWorkerTerminate: ({ clusterName, workerInstances }: OnWorkerTerminateParams) => Promise<void>,
  shouldProcessJobs: boolean
}

type WorkerInternalEnvById = Record<number, object>;
const workerInternalEnvById: WorkerInternalEnvById = {};

export async function startCluster({
  clusterName, onWorkerStart, onWorkerTerminate, shouldProcessJobs,
}: StartClusterParams) {
  if (cluster.isPrimary) {
    logger.info(`${clusterName} | Primary process (${process.pid}) is running`);

    for (let i = 0; i < numCPUs; i += 1) {
      const isFirstWorker = i === 0;
      const processCronJob = (shouldProcessJobs && isFirstWorker) ? 'true' : 'false';
      const internalEnv = { INTERNAL_PROCESS_CRON_JOBS: processCronJob };
      forkWorker(cluster, internalEnv);
    }

    cluster.on('exit', (worker) => {
      if (process.env.MODE === 'development') {
        const waitTimeInSec = 5;
        logger.info(`${clusterName} | Worker ${worker.id} process (${worker.process.pid}) died. Restarting in ${waitTimeInSec}sec...`);
        setTimeout(() => {
          forkWorker(cluster, workerInternalEnvById[worker.id]);
        }, waitTimeInSec * 1000);
      } else {
        logger.info(`${clusterName} | Worker ${worker.id} process (${worker.process.pid}) died. Restarting now...`);
        forkWorker(cluster, workerInternalEnvById[worker.id]);
      }
    });
  } else {
    await startWorker(clusterName, onWorkerStart, onWorkerTerminate);
  }
}

function forkWorker(primary: typeof cluster, internalEnv: object) {
  const worker = primary.fork(internalEnv);
  workerInternalEnvById[worker.id] = internalEnv;
}

async function startWorker(clusterName: StartClusterParams['clusterName'], onWorkerStart: StartClusterParams['onWorkerStart'], onWorkerTerminate: StartClusterParams['onWorkerTerminate']) {
  const workerInstances = await onWorkerStart({ clusterName });

  listenTerminateSignals(clusterName, onWorkerTerminate, workerInstances);
}

// FIXME: Graceful shutdown seems to not work properly. Pass the "server" to close() ?
function listenTerminateSignals(clusterName: StartClusterParams['clusterName'], onWorkerTerminate: StartClusterParams['onWorkerTerminate'], workerInstances: WorkerInstances) {
  const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

  for (const sig of sigs) {
    process.on(sig, () => {
      onWorkerTerminate({
        clusterName,
        workerInstances,
      }).then(() => {
        logger.info(`${clusterName} | Worker process (${process.pid}) Closed`);
        process.exit(0);
      }).catch((err) => {
        logger.warn(`${clusterName} | Worker process (${process.pid}) Closed with errors`);
        logger.error(err);
        process.exit(0);
      });
    });
  }
}
