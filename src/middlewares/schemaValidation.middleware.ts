import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export function validateSchema(schema: z.ZodSchema<unknown>, input: unknown) {
  const validation = schema.safeParse(input);

  if (validation.success) return true;
  else
    return validation.error.errors.map((issue: z.ZodIssue) => ({
      message: `${issue.path.join('.')} is ${issue.message}`,
    }));
}

export function validateMiddleware(schema: z.ZodSchema<unknown>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = validateSchema(schema, req.body);

    if (validation === true) {
      next();
    } else {
      res.status(400).json({ errors: validation });
    }
  };
}
