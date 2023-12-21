import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserRefralLinks extends Document {
    @Prop()
    userId: string;

    @Prop()
    refral_links: string;
}


export const UserRefralLinksSchema = SchemaFactory.createForClass(UserRefralLinks);

