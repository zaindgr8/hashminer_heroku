
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class RevokedToken {
   @Prop()
   token: string;
}
export const TaskSchema = SchemaFactory.createForClass(RevokedToken);
