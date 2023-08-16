import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserInputDto {
  id: string;

  @IsString({ message: 'Nome do usuário é obrigatório' })
  @IsNotEmpty({ message: 'Nome do usuário é obrigatório' })
  username: string;

  @IsString({ message: 'Nome do usuário é obrigatório' })
  @IsNotEmpty({ message: 'Nome do usuário é obrigatório' })
  password: string;
}
