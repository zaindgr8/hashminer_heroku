import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { AuthMiddleWare } from './auth.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './entities/task.entity';


@Module({
  imports:[MongooseModule.forFeature([{name:"Task",schema:TaskSchema}])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleWare).forRoutes('task');
  }
}
