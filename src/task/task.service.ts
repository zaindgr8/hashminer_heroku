import { Injectable, Res } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITask } from './task.interface';
@Injectable()
export class TaskService {
  constructor(@InjectModel("Task") private taskModel: Model<ITask>){}
  
  async createTask(createTaskDto: CreateTaskDto):Promise<any> {
       
   console.log("In service")
    const addedtask = await this.taskModel.create(createTaskDto);
    return addedtask;
  }

  async tasks(id:string) {
    console.log("Id in task service", id)
    const tasksList =  await this.taskModel.find({userId:id});
    console.log("tasksList in service", tasksList)
    return tasksList;
  }

    async taskById(id: string) {
    const task = await this.taskModel.findById(id);
    return task
  }

  async update(id: string, updateTaskInfo: UpdateTaskDto)  {
     const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id : id  },
      {$set: {title: updateTaskInfo.title, description: updateTaskInfo.description,
         image: updateTaskInfo.image
        }},
      {new: true}
      ); 

    return updatedTask;
  }

  async delete(id: string) {

   await this.taskModel.deleteOne({_id: id})
    return `Deleted Successfully`  
  }
}
