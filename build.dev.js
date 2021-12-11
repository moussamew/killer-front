const esbuild = require('esbuild');
const http = require('http');
const esbuildConfig = require('./utils/config');

/**
 * Forward the response from esbuild to the client.
 */
const forwardResponse = (proxyRes, res) => {
  res.writeHead(proxyRes.statusCode, proxyRes.headers);
  proxyRes.pipe(res, { end: true });
};

esbuild
  .serve(
    {
      servedir: 'public',
      port: 4000,
    },
    esbuildConfig,
  )
  .then(({ host, port }) => {
    http
      .createServer((req, res) => {
        const options = {
          hostname: host,
          port: port,
          path: req.url,
          method: req.method,
          headers: req.headers,
        };

        const proxyReq = http.request(options, (proxyRes) => {
          if (proxyRes.statusCode === 404) {
            http
              .request({ ...options, path: '/' }, (proxyRes) =>
                forwardResponse(proxyRes, res),
              )
              .end();
          } else {
            forwardResponse(proxyRes, res);
          }
        });

        req.pipe(proxyReq, { end: true });
      })
      .listen(port);

    console.log(`\n> Server running on: http://localhost:${port}/`);
  });
