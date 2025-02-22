import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';
import { CreateTodoSwagger } from './swagger/create-todo.swagger';
import { ShowTodoSwagger } from './swagger/show-todo.swagger';
import { UpdateTodoSwagger } from './swagger/update-todo.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'List all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved task list.',
    type: IndexTodoSwagger,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async index() {
    return await this.todoService.findall();
  }

  @Post()
  @ApiOperation({ summary: 'Add a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task successfully created.',
    type: ShowTodoSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data format or missing required fields.',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() body: CreateTodoDto) {
    return await this.todoService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search for a task' })
  @ApiResponse({
    status: 200,
    description: 'Task successfully retrieved.',
    type: ShowTodoSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'Task successfully updated.',
    type: UpdateTodoSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'invalid data.',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
    type: NotFoundSwagger,
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTodoDto,
  ) {
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 204,
    description: 'Task successfully deleted. No content returned.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
    type: NotFoundSwagger,
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.todoService.deleteById(id);
  }
}
