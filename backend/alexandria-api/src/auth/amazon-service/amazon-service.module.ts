import { Global, Module } from '@nestjs/common';
import { AmazonService } from './amazon-service.service';
import { PrismaService } from 'prisma/prisma.service';

@Global()
@Module({
  providers: [AmazonService, PrismaService],
  exports: [AmazonService],
})
export class AmazonServiceModule {}
