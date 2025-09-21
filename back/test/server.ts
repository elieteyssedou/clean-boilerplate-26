import { createServer } from 'node:http';
import '@test/test-container';
import yoga from '@/frameworks/web/app';

// Wrap GraphQL Yoga in HTTP server for test compatibility
// eslint-disable-next-line @typescript-eslint/no-misused-promises
const server = createServer(yoga);

export default server;
