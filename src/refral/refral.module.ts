import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RefralService } from './refral.service';
import { RefralController } from './refral.controller';
import { AuthMiddleWare } from 'src/task/auth.middleware';
import { UserSchema } from 'src/user/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRefralBalanceSchema } from './entities/user.refral.balance.entity';
import { UserRefralLinksSchema } from 'src/user/entities/user.refrals_links.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"User",schema:UserSchema},{name:"UserRefralBalance",schema:UserRefralBalanceSchema},{name:"UserRefralLinks",schema:UserRefralLinksSchema}])],
  controllers: [RefralController],
  providers: [RefralService],
})
export class RefralModule implements NestModule{
configure(consumer: MiddlewareConsumer) {
  consumer.apply(AuthMiddleWare).forRoutes("refral")
}

}
