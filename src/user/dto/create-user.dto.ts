import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsEnum, IsEmail, IsOptional } from 'class-validator';
enum USER_TYPE {
  get,
  post,
  delete,
}
export class CreateUserDto {
  @ApiProperty({
    description: '用户名称',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  email: string;

  @IsInt()
  @IsOptional()
  state: number;

  @IsString()
  @IsOptional()
  roles: string;

  // @ApiProperty({ example: 0, enum: USER_TYPE })
  // @IsEnum(USER_TYPE)
  // type: USER_TYPE;
}
