import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { UserRefralBalanceSchema } from './entities/user.refral.balance.entity';
import { UserRefralLinksSchema } from './entities/user.refrals_links.entity';


@Module({
  imports: [MongooseModule.forFeature([{name:"User",schema:UserSchema},{name:"UserRefralBalance",schema:UserRefralBalanceSchema},{name:"UserRefralLinks",schema:UserRefralLinksSchema}])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
