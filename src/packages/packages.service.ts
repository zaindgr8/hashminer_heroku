import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';
import { Package } from './entities/package.entity';
import { Model } from 'mongoose';
import { AssignPackageDto } from './dto/assign_package.dto';
import { UserPackage } from './entities/user_packages.entity';
import { Types } from 'mongoose';
@Injectable()
export class PackagesService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Package.name) private readonly packageModel: Model<Package>,
    @InjectModel(UserPackage.name) private readonly userPackageModel: Model<UserPackage>,
     
  ) {}

  async create(createPackageDto: CreatePackageDto, userId: string) {
    try {
      const user = await this.userModel.findById(userId);
      console.log('user', user);
      if (!user || !user.is_admin) {
        throw new Error('Only Admin can add package');
      }
      const { price } = createPackageDto;

      console.log('Price', price);
      const existingPackage = await this.packageModel.findOne({ price });

      console.log('existingPackage', existingPackage);

      if (existingPackage) {
        throw new Error('A package with this price already exists');
      }

      const newPackage = await this.packageModel.create({ price: price });

      return newPackage;

    } catch (error) {
      console.error('Error in adding package:', error.message);
      throw error;
    }
  }

  async findAll(userId: string) {
    try {
      const user = await this.userModel.findById(userId);
      console.log('user', user);
      if (!user || !user.is_admin) {
        throw new Error('Only Admin can see packages list');
      }
      const packages = await this.packageModel.find().exec();
      return packages;
    } catch (error) {
      console.error('Error fetching packages:', error.message);
      throw error;
    }
    return `This action returns all packages`;
  }

  findOne(id: number) {
    console.log("hereeee ")
    return `This action returns a #${id} package`;
  }

  update(id: number, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }

  

  async assign_package(assignPackageDto: AssignPackageDto): Promise<User> {
    try {
      const { email, packageId, price, startDate, expireDate } = assignPackageDto;
  
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      // const _package = await this.packageModel.findById(packageId);
      // if (!_package) {
      //   throw new NotFoundException('Package not found');
      // }
  
      // if (user.userPackages.some((userPackage) => userPackage.packageId.equals(_package.id))) {
      //   throw new Error('Package is already assigned to the user');
      // }
  
      const userPackage = new this.userPackageModel({

        userId: user._id,
        // packageId: _package._id,
        price: price,
        startDate: new Date(startDate),
        expiryDate: new Date(expireDate),
        status: 'active',
      });
  
      await userPackage.save();
  
      user.userPackages.push(userPackage.id);
      user.status = 'assigned';
      return await user.save();
    } catch (error) {
      console.error('Error in assigning package to user:', error.message);
      throw error;
    }
  }
  

  async requestPackage(userId: string): Promise<any> {
    try {
      const user = await this.userModel.findById(userId);
      console.log('user', user);

      if (!user) {
        throw new Error('User not found');
      }

      user.status = 'pending';
      return await user.save();
    } catch (error) {
      console.error('Error updating user status:', error.message);
      throw error;
    }
  }

  // async getAllUserPackages(userId: string): Promise<UserPackage[]> {
  //   try {
  //     console.log("In get all user packages service")
  //     const objectIdUserId = Types.ObjectId(userId);
  //     const userPackages = await this.userPackageModel.find({ userId: userId }).exec();
  //     console.log("userPackages", userPackages)
  //     return userPackages;
  //   } catch (error) {
  //     throw new Error('Error in getAllUserPackages service: ' + error.message);
  //   }
  // }
  async getAllUserPackages(userId: string): Promise<UserPackage[]> {
    try {
      console.log("In get all user packages service");
      console.log("userId",userId);
      
      const userPackages = await this.userPackageModel.find({ userId }).exec();
      
      console.log("userPackages", userPackages);
      
      return userPackages;
    } catch (error) {
      throw new Error('Error in getAllUserPackages service: ' + error.message);
    }
  }
}
