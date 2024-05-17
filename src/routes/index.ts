import { z } from 'zod';
import { Express, NextFunction, Request, Response } from 'express';
import {
  validateMiddleware,
  validateSchema,
} from '../middlewares/schemaValidation.middleware';
import transactionRoute from './transaction.route';
import accountRoute from './account.route';
import reportRoute from './report.route';

export function registerRoutes(server: Express) {
  server.get('/favicon.ico', (req, res) => res.status(204));

  const routes = [...transactionRoute, ...accountRoute, ...reportRoute];

  routes.forEach((route) => {
    server[route.method.toLowerCase() as Lowercase<Route<any, any>['method']>](
      route.path,
      [validateMiddleware(route.schema.input), ...(route.hooks ?? [])],
      async function (req: Request, res: Response): Promise<void> {
        try {
          const response = await route.handler(req);
          const validateResponse = validateSchema(
            route.schema.output,
            response
          );
          if (validateResponse !== true) {
            console.error(
              "We sent a bad response that could not be validated by zod. Have we changed the output and the schema doesn't match?",
              {
                errors: validateResponse,
                route: {
                  method: route.method,
                  path: route.path,
                },
              }
            );
            // if we want to send an error should the response be invalid, keep the next lines uncommented
            // res.status(500).json({ error: 'Internal Server Error', message: 'We sent a bad response that could not be validated by zod. Have we changed the output and the schema doesn\'t match?' })
            // return
          }
          res.status(200).json(response);
          return;
        } catch (error) {
          console.error('We had an error in handling the request', error);
          if (error instanceof Error) {
            res.status(500).json({ error: error.message });
            return;
          }
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
      }
    );
  });
}

export type Route<Input = undefined, Output = undefined> = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  schema: {
    input: z.ZodSchema<Input>;
    output: z.ZodSchema<Output>;
  };
  handler: (request: Request) => Promise<Output>;
  hooks?: ((req: Request, res: Response, next: NextFunction) => void)[];
};
