import { IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
