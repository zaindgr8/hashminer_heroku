import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://zangbang360:ajalpc-yo1@cluster0.mwkciiy.mongodb.net/',
      { dbName: 'userdb' },
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
