import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  ConflictException,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  // Obtener todas las tareas
  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  // Obtener una tarea por su ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  // Crear una nueva tarea
  @Post()
  async createTask(@Body() task: CreateTaskDTO) {
    try {
      return await this.tasksService.create(task);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Error creating task: Task already exists');
      }
      throw error;
    }
  }

  // Actualizar una tarea existente
  @Put(':id')
  async update(@Param('id') id: string, @Body() task: UpdateTaskDTO) {
    const taskEdit = await this.tasksService.update(id, task);
    if (!taskEdit) throw new NotFoundException('Task not found');
    return taskEdit;
  }

  // Eliminar una tarea
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const task = await this.tasksService.delete(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}
