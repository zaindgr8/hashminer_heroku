import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { PackagesModule } from './packages/packages.module';
import { RefralModule } from './refral/refral.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://zangbang360:ajalpc-yo1@cluster0.mwkciiy.mongodb.net/',
      { dbName: 'userdb' },
    ),
    PackagesModule,
    UserModule,
    TaskModule,
    RefralModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
