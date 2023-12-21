import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsString()
    @MaxLength(300)
    @IsNotEmpty()
    readonly image: string;

}
