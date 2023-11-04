import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP Request');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl: url } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('close', () => {
      const { statusCode } = res;
      const message = `[${method}] ${url} - ${statusCode} - ${userAgent} ${ip}`;

      if (statusCode >= 400) {
        this.logger.error(message);
      } else {
        this.logger.log(message);
      }
    });

    next();
  }
}
