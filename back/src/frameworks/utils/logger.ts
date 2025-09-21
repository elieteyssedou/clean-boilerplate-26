import pino from 'pino';

const loggerOptions = {
  level: process.env.LOG_LEVEL ?? 'info',
  transport: process.env.MODE === 'development' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  } : undefined,
};

const logger = pino(loggerOptions);

export function logWithExecutionTime({ startTime, message, context = {} } = {
  startTime: process.hrtime.bigint(),
  message: 'Execution time',
  context: {},
}) {
  const hrend = process.hrtime.bigint();
  const executionTimeMs = Number(hrend - startTime) / 1e6;
  logger.info({ ...context, executionTimeMs }, message);
}
export default logger;
