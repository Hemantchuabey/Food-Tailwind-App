'use strict';

const net = require('net');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

function findAvailablePort(port, host) {
  try {
    const detect = require('detect-port-alt');
    return detect(port, host);
  } catch (e) {
    return new Promise((resolve, reject) => {
      const server = net.createServer();
      server.unref();
      server.on('error', err => {
        if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
          resolve(findAvailablePort(port + 1, host));
        } else {
          reject(err);
        }
      });
      server.listen(port, host, () => {
        server.close(() => resolve(port));
      });
    });
  }
}

try {
  process.env.GENERATE_SOURCEMAP = 'false';
  process.env.FAST_REFRESH = 'false';

  const webpackConfigPath = require.resolve('react-scripts/config/webpack.config');
  const origWebpackConfig = require(webpackConfigPath);
  require.cache[webpackConfigPath].exports = function () {
    process.env.BABEL_ENV = 'production';
    process.env.NODE_ENV = 'production';
    return origWebpackConfig('production');
  };

  const devServerConfigPath = require.resolve('react-scripts/config/webpackDevServer.config');
  const origDevServerFactory = require(devServerConfigPath);
  require.cache[devServerConfigPath].exports = function (...args) {
    const cfg = origDevServerFactory(...args);
    const cacheHeaders = {
      'Cache-Control': 'public, max-age=31536000, immutable',
    };
    cfg.headers = {
      ...cfg.headers,
      ...cacheHeaders,
    };
    cfg.devMiddleware = {
      ...cfg.devMiddleware,
      headers: cacheHeaders,
    };
    return cfg;
  };
} catch (e) {
  // Ignore if react-scripts internal structure differs
}

findAvailablePort(DEFAULT_PORT, HOST)
  .then(port => {
    if (port !== DEFAULT_PORT) {
      console.log(`Port ${DEFAULT_PORT} is in use or unavailable. Automatically using port ${port}...`);
    }
    process.env.PORT = String(port);
    require('react-scripts/scripts/start');
  })
  .catch(err => {
    console.error('Failed to find an available port:', err);
    process.exit(1);
  });
