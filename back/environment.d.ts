export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      MODE: 'development' | 'test' | 'production'; // app mode, not the same as NODE_ENV.
      LOG_LEVEL: 'silent' | 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'; // Log level desired, from less verbose to most.
      PORT: string; // default "5100", port of the server.
      MONGODB_URL: string; // mongodb server url to connect.
      DATABASE_NAME: string; // database name to use.
      REDIS_URL: string; // redis server url to connect.
      STACK_AUTH_PROJECT_ID: string; // stack auth project id.
      STACK_AUTH_SECRET_SERVER_KEY: string; // stack auth project id.

      // LANGSMITH RELATED VARIABLES
      LANGSMITH_TRACING?: 'true' | 'false';
      LANGSMITH_ENDPOINT?: string
      LANGSMITH_API_KEY?: string
      LANGSMITH_PROJECT?: string

      // INTERNAL ENV VARIABLES, not coming from .env file but from inside the code.
      INTERNAL_PROCESS_CRON_JOBS: 'true' | 'false'; // whether the worker should process cron jobs, only one worker should process cron jobs.
    }
  }
}
