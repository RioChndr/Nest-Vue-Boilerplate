import { readFileSync } from 'fs';
import { NextFunction, Request, Response } from 'express';
import { ViteDevServer, createServer } from 'vite';

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;
const isProduction = process.env.NODE_ENV === 'production';

export function ClientRender(clientDir: string, prefixApi: string | string[]) {
  const url = "*"

  const middleware = (req: Request, res: Response, next: NextFunction) => {
    let isRequestFE = true
    if (Array.isArray(prefixApi)) {
      isRequestFE = prefixApi.some((prefix) => req.originalUrl.startsWith(prefix)) === false
    } else {
      isRequestFE = req.originalUrl.startsWith(prefixApi) === false
    }

    if (isRequestFE) {
      let template = readFileSync(
        clientDir + "/index.html",
        'utf-8'
      )
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
      return;
    }
    next()
  }
  return [
    url,
    middleware
  ]
}

export async function serverDevClient(root: string) {
  let vite: ViteDevServer;
  vite = await createServer({
    root,
    logLevel: isTest ? 'error' : 'info',
    appType: 'custom',
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100
      }
    }
  });
  // use vite's connect instance as middleware
  return vite
}