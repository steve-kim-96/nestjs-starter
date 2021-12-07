import { Post } from "src/posts/entities/post.entity";
import { UserRole } from "./user.role";

export interface IUser {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  posts?: Post[];
  role?: UserRole;
}
