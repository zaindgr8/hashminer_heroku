import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { AssignPackageDto } from './dto/assign_package.dto';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post('')
  create(@Body() createPackageDto: CreatePackageDto, @Req() req) {
    const userId = req.id;
    return this.packagesService.create(createPackageDto, userId);
  }

  @Get('')
  findAll(@Req() req) {
    const userId = req.id;
    return this.packagesService.findAll(userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.packagesService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packagesService.update(+id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagesService.remove(+id);
  }

  @Post('/assign_package')
  async assignPackage(
    @Req() req,
    @Res() response,
    @Body() packageInfo: AssignPackageDto,
  ) {
    try {
      const result = await this.packagesService.assign_package(packageInfo);
      console.log('Result from assignPackage:', result);
      return response.status(200).json(result);
    } catch (error) {
      console.error('Error in assignPackage controller:', error.message);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // @Post('/request_package')
  // async requestPackage(
  //   @Req() req,
  //   @Res() response,
  //   @Body() packageInfo: AssignPackageDto,
  // ) {
  //   try {
  //     const userId = req.id;
  //     const result = await this.packagesService.requestPackage(userId);
  //     return response.status(200).json(result);
  //   } catch (error) {
  //     console.error('Error in requestPackage controller:', error.message);
  //     return response.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }

  @Get('/user_packages') // Use the appropriate HTTP method and path
  async getAllUserPackages(@Req() req, @Res() response) {
    try {
      console.log("called ***********")
      const userId = req.id; // Assuming you have the user ID in the request object
      console.log("userId in controller",userId)
      const userPackages = await this.packagesService.getAllUserPackages(userId);
      return response.status(200).json(userPackages);
    } catch (error) {
      console.error('Error in getAllUserPackages controller:', error.message);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
