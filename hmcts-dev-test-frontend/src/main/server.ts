#!/usr/bin/env node
import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';

import { app } from './app';

let httpsServer: https.Server | null = null;

// used by shutdownCheck in readinessChecks
app.locals.shutdown = false;

// TODO: set the right port for your application
const port: number = parseInt(process.env.PORT || '3100', 10);

if (app.locals.ENV === 'development') {
  const sslDirectory = path.join(__dirname, 'resources', 'localhost-ssl');
  const sslOptions = {
    cert: fs.readFileSync(path.join(sslDirectory, 'localhost.crt')),
    key: fs.readFileSync(path.join(sslDirectory, 'localhost.key')),
  };
  httpsServer = https.createServer(sslOptions, app);
  httpsServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Task-UI :: server :: DEV Application started: https://localhost:${port}`);
  });
} else {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Task-UI :: server :: Application started: http://localhost:${port}`);
  });
}

function gracefulShutdownHandler(signal: string) {
  // eslint-disable-next-line no-console
  console.log(`⚠️ Caught ${signal}, gracefully shutting down. Setting readiness to DOWN`);
  // stop the server from accepting new connections
  app.locals.shutdown = true;

  setTimeout(() => {
    // eslint-disable-next-line no-console
    console.log('Shutting down application');
    // Close server if it's running
    httpsServer?.close(() => {
      // eslint-disable-next-line no-console
      console.log('HTTPS server closed');
    });
  }, 4000);
}

process.on('SIGINT', gracefulShutdownHandler);
process.on('SIGTERM', gracefulShutdownHandler);
