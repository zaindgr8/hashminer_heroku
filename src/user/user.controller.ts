import { Controller, Post, Res, Body, HttpStatus, Get,Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user')
  async registerUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.registerUser(createUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User Created Successfully',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }

  @Post('/login')
  async login(
    @Res() response,
    @Body() userInfo: { email: string; password: string },
  ) {
    try {
      const jwt = await this.userService.login(userInfo);

      return response.status(HttpStatus.OK).json({
        token: jwt,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Email or Password is Incorrect!',
        error: 'Bad Request',
      });
    }
  }

  @Get ('/status/:id')
  async status(
    @Res() response,
    @Param('id') id: string
  ) {
    try {
      const userwithupdatedStatus = await this.userService.getstatus(id);

      return response.status(HttpStatus.FOUND).json({
        status: userwithupdatedStatus,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: In getting user status !',
        error: 'Bad Request',
      });
    }
  }

  @Get ('/refral_balabce/:id')
  async refralBal(
    @Res() response,
    @Param('id') id: string
  ) {
    try {
      const refralBal = await this.userService.getRefralBal(id);

      return response.status(HttpStatus.FOUND).json({
        userRefralBal: refralBal,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: In getting user refral balance !',
        error: 'Bad Request',
      });
    }
  }

  @Post('/logout')
  async logout(
    @Res() response,
    @Body()  token: string,
  ) {
    try {
      const jwt = await this.userService.logout(token);

      return response.status(HttpStatus.OK).json({
        token: jwt,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Please Login First!',
        error: 'Bad Request',
      });
    }
  }

}
