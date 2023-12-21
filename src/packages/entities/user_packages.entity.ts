// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// @Schema()
// export class UserPackage extends Document {
//   @Prop({ type: Types.ObjectId, ref: 'User' })
//   userId: Types.ObjectId;

//   @Prop({ type: Types.ObjectId, ref: 'Package' })
//   packageId: Types.ObjectId;

//   @Prop()
//   startDate: Date;

//   @Prop()
//   expiryDate: Date;

//   @Prop({ default: 'inactive' })
//   status: string;
// }

// export const UserPackageSchema = SchemaFactory.createForClass(UserPackage);


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserPackage extends Document {
  @Prop()
  userId: string;

  @Prop()
  price: string;

  @Prop()
  startDate: Date;

  @Prop()
  expiryDate: Date;

  @Prop({ default: 'inactive' })
  status: string;
}

export const UserPackageSchema = SchemaFactory.createForClass(UserPackage);
