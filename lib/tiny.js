import { createServer } from "http";
import { parse } from "url";
import httpx from "httpx";

/**
 * 
 * @param {AsyncFunction} handler 
 * @returns 
 */
export function createFunction(handler) {
  const port = 9000;

  const app = createServer(async (req, res) => {
    if (req.method === 'POST') {
      const parsed = parse(req.url);
      if (parsed.pathname === '/invoke') {
        await handler(req, res);
        return;
      }
    }

    res.writeHead(404, 'Not Found');
    res.end();
  });

  function start() {
    return new Promise((resolve, reject) => {
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
        resolve();
      });
    });
  }

  function stop() {
    return new Promise((resolve, reject) => {
      app.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  async function call(data) {
    const res = await httpx.request(`http://localhost:${port}/invoke`, {
        method: 'POST',
        data: JSON.stringify(data)
    });
    const resBody = await httpx.read(res, 'utf-8');
    return {
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        headers: res.headers,
        body: resBody
    };
  }

  return {
    start,
    stop,
    call
  }
}

export function read(req, encoding) {
  return new Promise((resolve, reject) => {
    const buffers = [];
    req.on('data', function (buff) {
      buffers.push(buff);
    });
    req.on('end', () => {
      const finalBuffer = Buffer.concat(buffers);
      if (encoding) {
        resolve(finalBuffer.toString(encoding));
      } else {
        resolve(finalBuffer);
      }
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
}