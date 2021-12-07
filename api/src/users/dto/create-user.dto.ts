import { UserRole } from "../entities/user.role";

export class CreateUserDto {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole
}
