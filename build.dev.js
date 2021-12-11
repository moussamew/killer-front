const http = require('http');

const esbuild = require('esbuild');

const esbuildConfig = require('./utils/config');

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
          port,
          path: req.url,
          method: req.method,
          headers: req.headers,
        };

        const proxyReq = http.request(options, (proxyRes) => {
          if (proxyRes.statusCode === 404) {
            http
              .request({ ...options, path: '/' }, ({ statusCode, headers }) => {
                res.writeHead(statusCode, headers);
                proxyRes.pipe(res, { end: true });
              })
              .end();
          } else {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res, { end: true });
          }
        });

        req.pipe(proxyReq, { end: true });
      })
      .listen(port);

    console.log(`\n> Server running on: http://localhost:${port}/`);
  });
