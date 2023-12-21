// import { IsNotEmpty, IsString, MaxLength } from "class-validator";
// export class CreateUserDto {
//     @IsString()
//     @IsNotEmpty()
//     readonly name: string;

//     @IsString()
//     @IsNotEmpty()
//     readonly email: string;

//     @IsString()
//     @MaxLength(40)
//     @IsNotEmpty()
//     readonly password: string;

    
// }
import { IsNotEmpty, IsString, MaxLength, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    readonly password: string;

    @IsOptional() // Make refral optional
    readonly refral_Link?: any;

}
