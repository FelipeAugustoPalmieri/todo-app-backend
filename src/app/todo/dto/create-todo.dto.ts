import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  task: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  isDone: number;
}
