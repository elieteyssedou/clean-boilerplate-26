import { Job } from 'bullmq';
import healthcheckJob from '@/frameworks/queues/jobs/healthcheck-job';

export type JobName = string;

export type JobData = Record<PropertyKey, unknown>;

type MaybeAsync<T> = T | Promise<T>;
export type JobProcessor = (jobData: JobData, job: Job) => MaybeAsync<void>;

type Jobs = Record<JobName, JobProcessor>;

const jobs: Jobs = {
  healthcheckJob,
};

export default jobs;
