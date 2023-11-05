import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { loggingMiddleware } from './middlewares/logging.middleware';
import { softDeleteMiddleware } from './middlewares/soft-delete.middleware';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({ log: [{ emit: 'event', level: 'query' }] });

    this.$use(loggingMiddleware());
    this.$use(softDeleteMiddleware());
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
