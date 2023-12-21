import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getModelToken } from '@nestjs/mongoose';


describe('TaskService', () => {
  let service: TaskService;
  
  let mocTaskModel  = {
     create: jest.fn(),
     find : jest.fn(),
     deleteOne: jest.fn(),
     findOneAndUpdate : jest.fn(),
     findById: jest.fn()
  } 

  let mocTask = {
    _id:"eoiwjfsociew",
    title: "test_title",
    description: "test_description",
    image: "testimage",
    userId: '2k42mfd'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
      {
        provide: getModelToken("Task"),
        useValue: mocTaskModel,
      }],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('task should be defined', () => {
    expect(service).toBeDefined();
  });



  it('will add task ', async () => {
    const createTaskDto = {
    title: "test_title",
    description: "test_description",
    image: "testimage",
    userId: '2k42mfd'
    } 

    jest.spyOn( mocTaskModel,'create').mockResolvedValue(mocTask);
    const result = await  service.createTask(createTaskDto);
    expect(mocTaskModel.create).toHaveBeenCalledWith(createTaskDto)
    expect(result).toBe(mocTask)
    
  })


  it('should return tasks by user ID', async () => {
    
    const userId = 'someuserid';
    const mockTasksList: any = [
        { _id: 'task1', title: 'Task 1', description: 'Description 1', userId, image: 'task1.jpg' },
        { _id: 'task2', title: 'Task 2', description: 'Description 2', userId, image: 'task2.jpg' },
    ];

    // Mock the find method to resolve with mockTasksList
    jest.spyOn(mocTaskModel, 'find').mockResolvedValueOnce(mockTasksList);

    const result = await service.tasks(userId);

    // Assert
    expect(mocTaskModel.find).toHaveBeenCalledWith({ userId });
    expect(result).toEqual(mockTasksList);
});


it('should return a task by its ID', async () => {
  // Arrange
  const taskId = 'someTaskId';
  const mockTask: any = {
      _id: taskId,
      title: 'Task 1',
      description: 'Description 1',
      userId: 'someuserid',
      image: 'task1.jpg',
  };

  // Mock the findById method to resolve with mockTask
  jest.spyOn(mocTaskModel, 'findById').mockResolvedValueOnce(mockTask);

  // Act
  const result = await service.taskById(taskId);

  // Assert
  expect(mocTaskModel.findById).toHaveBeenCalledWith(taskId);
  expect(result).toEqual(mockTask);
});


describe('update', () => {
  it('should update a task by its ID', async () => {
      // Arrange
      const taskId = 'someTaskId';
      const updateTaskInfo: any = {
          title: 'Updated Task Title',
          description: 'Updated Task Description',
          image: 'updated-task.jpg',
      };

      const updatedTask: any = {
          _id: taskId,
          userId: 'someuserid',
          ...updateTaskInfo,
      };

      // Mock the findOneAndUpdate method to resolve with updatedTask
      jest.spyOn(mocTaskModel, 'findOneAndUpdate').mockResolvedValueOnce(updatedTask);

      // Act
      const result = await service.update(taskId, updateTaskInfo);

      // Assert
      expect(mocTaskModel.findOneAndUpdate).toHaveBeenCalledWith(
          { _id: taskId },
          { $set: { title: updateTaskInfo.title, description: updateTaskInfo.description, image: updateTaskInfo.image } },
          { new: true }
      );
      expect(result).toEqual(updatedTask);
  });
});

it('should delete a task by its ID', async () => {
  // Arrange
  const taskId = 'someTaskId';

  // Mock the deleteOne method to resolve successfully
  jest.spyOn(mocTaskModel, 'deleteOne').mockResolvedValueOnce({ n: 1, ok: 1, deletedCount: 1 });

  // Act
  const result = await service.delete(taskId);

  expect(mocTaskModel.deleteOne).toHaveBeenCalledWith({ _id: taskId });
  expect(result).toBe('Deleted Successfully');
});

});


