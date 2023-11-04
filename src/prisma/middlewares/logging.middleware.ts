import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function loggingMiddleware(): Prisma.Middleware {
  const logger = new Logger('Query execution time');

  return async (params, next) => {
    const before = Date.now();

    const result = await next(params);

    const after = Date.now();

    logger.log(
      `Query ${params.model}.${params.action} took ${after - before}ms`,
    );

    return result;
  };
}
