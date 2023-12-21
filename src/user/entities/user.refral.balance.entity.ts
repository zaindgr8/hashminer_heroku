import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserRefralBalance extends Document {
    @Prop()
    userId: string;

    @Prop()
    refral_balance: number;
}


export const UserRefralBalanceSchema = SchemaFactory.createForClass(UserRefralBalance);

