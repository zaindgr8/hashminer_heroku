
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateTaskDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @MaxLength(300)
    @IsNotEmpty()
    readonly description: string;
}