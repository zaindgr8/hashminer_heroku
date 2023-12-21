import { Injectable } from '@nestjs/common';
import { CreateRefralDto } from './dto/create-refral.dto';
import { UpdateRefralDto } from './dto/update-refral.dto';
import { Model } from 'mongoose';
import { User } from '../user/entities/user.entity';
import { Package } from '../packages/entities/package.entity';
import { UserPackage } from '../packages/entities/user_packages.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { UserRefralLinks } from 'src/user/entities/user.refrals_links.entity';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

@Injectable()
export class RefralService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(UserRefralLinks.name) private readonly userRefralLinkModel: Model<UserRefralLinks>,

     
  ) {}
  create(createRefralDto: CreateRefralDto) {
    return 'This action adds a new refral';
  }

  async getrefral(userId:string) {
    // return `This action returns all refral`;
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      console.log('user', user);

 
      const referralLink = uuidv4();

      // Store the referral link in the database
      const userReferralLink = new this.userRefralLinkModel({
        userId: userId,
        refral_links: referralLink,
      });
      await userReferralLink.save();

      // Return the generated referral link in the response
      const result = { link: referralLink };
      return result;
    } catch (error) {
      console.error('Error in getting refral:', error.message);
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} refral`;
  }

  update(id: number, updateRefralDto: UpdateRefralDto) {
    return `This action updates a #${id} refral`;
  }

  remove(id: number) {
    return `This action removes a #${id} refral`;
  }
}
