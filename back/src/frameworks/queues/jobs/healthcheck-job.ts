import { JobProcessor } from '@/frameworks/queues/jobs';
import logger from '@/frameworks/utils/logger';

const healthcheckJob: JobProcessor = () => {
  // Cool be cool to configure https://healthchecks.io/
  // if (process.env.MODE === 'production') await fetch(process.env.HC_WORKER_URL);
  logger.info('Ping healthchecks job');
};

export default healthcheckJob;
