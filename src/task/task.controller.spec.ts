import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

describe('TaskController', () => {
    let taskController: TaskController;
    let taskService: TaskService;
    let mocTaskModel;
    beforeEach(async () => {
        const module : TestingModule = await Test.createTestingModule({
            controllers: [TaskController],
            providers: [ TaskService ,
              {
                provide : getModelToken('Task'),
               useValue : mocTaskModel
              }
            
            ],
        }).compile();

        taskController = module.get<TaskController>(TaskController);
        taskService = module.get<TaskService>(TaskService);
    });

    it('should be defined', () => {
        expect(taskController).toBeDefined();
    });

    describe('create', () => {
        it('should create a new task and return success response', async () => {
            
            const createTaskDto: CreateTaskDto = {
                title: 'New Task',
                description: 'Task Description',
            };

            const mockFile = {
                filename: 'example.jpg',
            };

            const mockReq = {
                id: 'someUserId',
            };

            jest.spyOn(taskService, 'createTask').mockResolvedValueOnce({});

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Act
            await taskController.create(mockFile, res, mockReq, createTaskDto);

            // Assert
            expect(taskService.createTask).toHaveBeenCalledWith({
                title: createTaskDto.title,
                description: createTaskDto.description,
                image: mockFile.filename,
                userId: mockReq.id,
            });
            expect(res.status).toHaveBeenCalledWith(HttpStatus.ACCEPTED);
            expect(res.json).toHaveBeenCalledWith({ message: 'Task Added Successfully' });
        });

        it('should handle error and return error response', async () => {
            // Arrange
            const createTaskDto: CreateTaskDto = {
                title: 'New Task',
                description: 'Task Description',
            };

            const mockFile = {
                filename: 'example.jpg',
            };

            const mockReq = {
                id: 'someUserId',
            };

            jest.spyOn(taskService, 'createTask').mockRejectedValueOnce(new Error('Task creation failed'));

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Act
            await taskController.create(mockFile, res, mockReq, createTaskDto);

            // Assert
            expect(taskService.createTask).toHaveBeenCalledWith({
                title: createTaskDto.title,
                description: createTaskDto.description,
                image: mockFile.filename,
                userId: mockReq.id,
            });
            expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith({ error: 'Could not add task' });
        });
    });


    describe('user tasks', () => {
        it('should fetch tasks and return success response', async () => {
            // Arrange
            const mockTasks:any = [{ _id: 'task1', title: 'Task 1' }, { _id: 'task2', title: 'Task 2' }];
            const req = { id: 'someUserId' };
            jest.spyOn(taskService, 'tasks').mockResolvedValueOnce(mockTasks);

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Act
            await taskController.tasks(res, req);

            // Assert
            expect(taskService.tasks).toHaveBeenCalledWith(req.id);
            expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
            expect(res.json).toHaveBeenCalledWith({
                message: mockTasks,
            });
        });

        it('should handle error during fetching tasks and return error response', async () => {
            // Arrange
            const errorMessage = 'Error fetching tasks';
            jest.spyOn(taskService, 'tasks').mockRejectedValueOnce(new Error(errorMessage));

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Act
            await taskController.tasks(res, {});

            // Assert
            expect(taskService.tasks).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Could not Fetch tasks',
            });
        });
    });

describe('taskById', () => {
        it('should fetch a task by ID and return success response', async () => {
            // Arrange
            const taskId = 'someTaskId';
            const mockTask:any = { _id: taskId, title: 'Task 1' };
            jest.spyOn(taskService, 'taskById').mockResolvedValueOnce(mockTask);

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            
            await taskController.taskById(taskId, res);

            expect(taskService.taskById).toHaveBeenCalledWith(taskId);
            expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
            expect(res.json).toHaveBeenCalledWith({
                message: mockTask,
            });
        });

        it('should handle error during fetching task by ID and return error response', async () => {

            const taskId = 'nonexistentTaskId';
            const errorMessage = 'Error fetching task';
            jest.spyOn(taskService, 'taskById').mockRejectedValueOnce(new Error(errorMessage));

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await taskController.taskById(taskId, res);

            expect(taskService.taskById).toHaveBeenCalledWith(taskId);
            expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith({
                error: `Could not Fetch task with id : ${taskId}`,
            });
        });
    });


describe('update', () => {
        it('should update a task and return success response', async () => {

            // Arrange
            const taskId = 'someTaskId';
            const updateTaskDto = { title: 'Updated Task', description: 'Updated Description' };
            const mockFile = { filename: 'example.jpg' };
            const mockUpdatedTask:any = {}; // Your mock updated task data
    
            jest.spyOn(taskService, 'update').mockResolvedValueOnce(mockUpdatedTask);
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
    
            await taskController.update(mockFile, taskId, res, updateTaskDto);
    
            expect(taskService.update).toHaveBeenCalledWith(taskId, {
                title: updateTaskDto.title,
                description: updateTaskDto.description,
                image: mockFile.filename,
            });
            expect(res.status).toHaveBeenCalledWith(HttpStatus.ACCEPTED);
            expect(res.json).toHaveBeenCalledWith({
                message: mockUpdatedTask, // Adjust this based on your actual expected response
            });
        });
    
        it('should handle error during update and return error response', async () => {
            // Arrange
            const taskId = 'nonexistentTaskId';
            const updateTaskDto = { title: 'Updated Task', description: 'Updated Description' };
            const mockFile = { filename: 'example.jpg' };
            const errorMessage = 'Error during update';
    
            jest.spyOn(taskService, 'update').mockRejectedValueOnce(new Error(errorMessage));
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
    
            // Act
            await taskController.update(mockFile, taskId, res, updateTaskDto);
    
            // Assert
            expect(taskService.update).toHaveBeenCalledWith(taskId, {
                title: updateTaskDto.title,
                description: updateTaskDto.description,
                image: mockFile.filename,
            });
            expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith({
                error: `Error in Updating task with id : ${taskId}`,
            });
        });
    });
    

describe("delete task", () =>{

  it('it should delete task',async() =>{
    let taskId = 'someTaskId';
    const mockTask = '';

    jest.spyOn(taskService, 'delete').mockResolvedValueOnce(mockTask);

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    // Act
    await taskController.delete(taskId, res, {} as any);

    // Assert
    expect(taskService.delete).toHaveBeenCalledWith(taskId);
    expect(res.status).toHaveBeenCalledWith(HttpStatus.ACCEPTED);

    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            message: expect.stringContaining(`Task with id: ${taskId} deleted successfully`),
        })
    );

  })
})



});












