import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Package_Enum } from 'src/packages/enum/package_type.enum';
import { Package } from 'src/packages/entities/package.entity';

async function seedPackages() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const packageModel = app.get('Package'); // Replace 'YourPackageModel' with the actual name of your Package model

  try {
    // Check and remove existing packages
    await packageModel.deleteMany({});

    // Create new packages based on the enum values
    const packages = Object.values(Package_Enum).map(price => ({ price }));
    await packageModel.insertMany(packages);

    console.log('Packages seeded successfully.');
  } catch (error) {
    console.error('Error seeding packages:', error);
  } finally {
    await app.close();
  }
}

seedPackages();
