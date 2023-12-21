import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateTaskDto } from './dto/create-task.dto';
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}_${file.originalname}`);
        },
      }),
    }),
  )

  async create(
    @UploadedFile() file: any,
    @Res() res,
    @Req() req,
    @Body() taskInfo: CreateTaskDto,
  ) {
    try {
      const id = req.id;
      const taskData = {
        title: taskInfo.title,
        description: taskInfo.description,
        image: file.filename,
        userId: id,
      };

      const newtask = await this.taskService.createTask(taskData);

      res.status(HttpStatus.CREATED).json({
        message: 'Task Added Successfully',
      });
    } catch (error) {
      
      res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Could not add task',
      });
    }
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}_${file.originalname}`);
        },
      }),
    }),
  )

  async update(
    @UploadedFile() file: any,
    @Param('id') id: string,
    @Res() res,
    @Body() updateTaskDto: CreateTaskDto,
  ) {
    try {
      const taskData = {
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        image: file.filename
      }
      const task = await this.taskService.update(id, taskData);
      res.status(HttpStatus.ACCEPTED).json({
        message: task,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: `Error in Updating task with id : ${id}`,
      });
    }
  }

  @Get()
  async tasks(@Res() res, @Req() req) {
    try {
      const id = req.id;
      const tasksList = await this.taskService.tasks(id);
      res.status(HttpStatus.CREATED).json({
        message: tasksList,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Could not Fetch tasks',
      });
    }
  }

  @Get(':id')
  async taskById(@Param('id') id: string, @Res() res) {
    try {
      const task = await this.taskService.taskById(id);
      res.status(HttpStatus.CREATED).json({
        message: task,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: `Could not Fetch task with id : ${id}`,
      });
    }
  }


  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res, @Req() req) {
    try {
      const task = await this.taskService.delete(id);
      res.status(HttpStatus.ACCEPTED).json({
        message: `Task with id: ${id} deleted successfully  `,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: `Error in Deleting task with id : ${id}`,
      });
    }
  }

}
