import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTaskDTO {
  @IsString()
  @IsOptional()
  title?: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
