import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { IUser } from './user.interface';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { UserRefralBalance } from './entities/user.refral.balance.entity';
import { User } from './entities/user.entity';
import { retry } from 'rxjs';
import { UserRefralLinks } from './entities/user.refrals_links.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('UserRefralBalance')
    private userRefralBalanceModel: Model<UserRefralBalance>,
    @InjectModel(UserRefralLinks.name)
    private userRefralLinksModel: Model<UserRefralLinks>
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      if (createUserDto.refral_Link) {
        console.log('registering with refral');
        const link: any = createUserDto.refral_Link;

        console.log('link', link);
        // Decryption function
        const linkerUserInfo = await this.userRefralLinksModel.findOne({
          refral_links: createUserDto.refral_Link
        });

   console.log("linkerUserInfo", linkerUserInfo)

   const linkerUser = await this.userModel.findOne({
    _id: linkerUserInfo.userId
  });

  console.log("linkerUser", linkerUser)

        const userData: any = {
          ...createUserDto,
          father: linkerUser?._id,
          grandfather: linkerUser?.father,
        };

        let father = linkerUser?._id;
        let grandfather = linkerUser?.father;

        if (father) {
          const faterRefaralBalabce = await this.userRefralBalanceModel.findOne(
            { userId: father },
          );
          console.log('faterRefaralBalabce', faterRefaralBalabce);
          let updatedBalance: any;
          if (faterRefaralBalabce) {
            updatedBalance = faterRefaralBalabce?.refral_balance + 20;
            // Update the fatherReferralBalance in the database
            await this.userRefralBalanceModel.findOneAndUpdate(
              { userId: father },
              { $set: { refral_balance: updatedBalance } },
              { new: true }, // Set to true to return the updated document
            );
          } else {
            const firstGrandFatherRefralBal = {
              userId: father,
              refral_balance: 20,
            };
            const firstGrandFatherRefral = new this.userRefralBalanceModel(
              firstGrandFatherRefralBal,
            );
            await firstGrandFatherRefral.save();
          }
        }

        if (grandfather) {
          const grandFaterRefaralBalabce =
            await this.userRefralBalanceModel.findOne({ userId: grandfather });
          console.log('grandFaterRefaralBalabce', grandFaterRefaralBalabce);

          if (grandFaterRefaralBalabce) {
            const updatedBalance =
              grandFaterRefaralBalabce?.refral_balance + 10;
            // Update the grandfatherReferralBalance in the database
            await this.userRefralBalanceModel.findOneAndUpdate(
              { userId: grandfather },
              { $set: { refral_balance: updatedBalance } },
              { new: true }, // Set to true to return the updated document
            );
          } else {
            const grandFatherRefral = {
              userId: grandfather,
              refral_balance: 10,
            };
            const firstGrandFatherRefral = new this.userRefralBalanceModel(
              grandFatherRefral,
            );
            await firstGrandFatherRefral.save();
          }
        }

        const new_user = await new this.userModel(userData);
        return new_user.save();
      }
      const newUser = await new this.userModel(createUserDto);
      return newUser.save();
    } catch (error) {
      console.log('error', error);
      return error.message;
    }
  }

  async login(userInfo: { email: string; password: string }): Promise<string> {
    const user = await this.userModel.findOne(userInfo);
    console.log('user', user);
    if (!user) {
      throw new NotFoundException(`Did not found user with #${userInfo} !`);
    }

    const secretKey = 'secretKey';
    const { _id, name, email, status, is_admin } = user; // Extract relevant properties
    const token = jwt.sign(
      { user_id: _id, name, email, status, is_admin },
      secretKey,
      {
        algorithm: 'HS256',
      },
    );
    console.log('JWT Token:', token);
    return token;
  }

  async getstatus(id: string): Promise<any> {
    const user = await this.userModel.findOne({ _id: id });
    console.log('user', user);
    if (!user) {
      throw new NotFoundException(`Did not found user with #${id} !`);
    }
    const status = user.status;
    // const secretKey = 'secretKey';
    // const token = jwt.sign({ user_id: user._id }, secretKey, {
    //   algorithm: 'HS256',
    // });
    // console.log('JWT Token:', token);
    return status;
  }

  async getRefralBal(id: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({ _id: id });
      console.log('user', user);
      if (!user) {
        throw new NotFoundException(`Did not found user with #${id} !`);
      }
      const userRefral = await this.userRefralBalanceModel.findOne({
        userId: id,
      });

      const userRefralBalance: any = userRefral?.refral_balance;
      // const secretKey = 'secretKey';
      // const token = jwt.sign({ user_id: user._id }, secretKey, {
      //   algorithm: 'HS256',
      // });
      // console.log('JWT Token:', token);
      console.log('userRefralBalance', userRefralBalance);

      return userRefralBalance;
    } catch (error) {
      console.log('error');
      return error.message;
    }
  }

  async logout(token: string): Promise<any> {
    // const user = await this.userModel.findOne(userInfo);
    // console.log('user', user);
    // if (!user) {
    //   throw new NotFoundException(`Did not found user with #${userInfo} !`);
    // }
    // const secretKey = 'secretKey';
    // const token = jwt.sign({ user_id: user._id }, secretKey, {
    //   algorithm: 'HS256',
    // });
    // console.log('JWT Token:', token);
    // return token;
  }
}
