import { PartialType } from '@nestjs/swagger';

export class UserInput {
  firstName: string;
  middleName?: string;
  lastName: string;
  role?: string;
  email: string;
  phoneNumber?: number;
  password: string;
  gender: string;
  dateOfBirth?: string;
  categoryId?: number;
}

export class UpdateUserInput extends PartialType(UserInput) {}
