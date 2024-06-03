import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CollectionController } from './collection/collection.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, CollectionController],
  providers: [AppService],
})
export class AppModule {}
