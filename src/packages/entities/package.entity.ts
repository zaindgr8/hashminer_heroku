import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Package_Enum } from '../enum/package_type.enum'; 

@Schema()
export class Package extends Document { 
   @Prop()
   price: number;
   @Prop({ default: 'inactive' }) // Default status is 'inactive'
   status: string;
   @Prop({ default: null })
   start_date: Date;
   @Prop({ default: null })
   expiry_date: Date; 
}

export const PackageSchema = SchemaFactory.createForClass(Package);
