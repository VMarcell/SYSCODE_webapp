import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
