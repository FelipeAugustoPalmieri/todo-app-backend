import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';

describe('TodoController', () => {
  let todoController: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
  });
});
