import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from 'src/task/entities/task.entity';
import { UserSchema } from 'src/user/entities/user.entity';
import { PackageSchema } from './entities/package.entity';
import { AuthMiddleWare } from 'src/task/auth.middleware';
import { UserPackageSchema } from './entities/user_packages.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"User",schema:UserSchema}, {name:"Package",schema:PackageSchema},{name:"UserPackage",schema:UserPackageSchema}])],
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleWare).forRoutes('packages');
  }
}
