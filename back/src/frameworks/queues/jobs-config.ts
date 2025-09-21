import { JobsOptions } from 'bullmq';
import { JobData } from '@/frameworks/queues/jobs';

const tz = 'Europe/Paris';

export type QueuableJobOptions = JobsOptions & { getJobIdFromData?: ((data: JobData) => string) };

export interface JobConfig {
  queue: 'CRON' | 'DEFAULT'; // someday we may have more queues, as a 'FAST' queue with concurrency
  opts: QueuableJobOptions;
}

export type JobsWithConfig = Record<string, JobConfig>;

export const cronJobsConfig: JobsWithConfig = {
  healthcheckJob: {
    queue: 'CRON',
    opts: { priority: 1, repeat: { tz, pattern: '*/15 * * * *' } },
  },
};

export const allJobsConfigs: JobsWithConfig = {
  // getNewDocumentsJob: {
  //   queue: 'DEFAULT',
  //   opts: {
  //     priority: 7, getJobIdFromData: (params) => `getNewDocumentsJob-${params.companyId}`
  //   },
  // },
  ...cronJobsConfig,
};
