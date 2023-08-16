import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInputDto {
  creatorId: string;

  @IsString({ message: 'Nome do usuário é obrigatório' })
  @IsNotEmpty({ message: 'Nome do usuário é obrigatório' })
  username: string;

  @IsString({ message: 'Nome do usuário é obrigatório' })
  @IsNotEmpty({ message: 'Nome do usuário é obrigatório' })
  password: string;
}

export class CreateUserOutputDto {
  userId: string;
}
