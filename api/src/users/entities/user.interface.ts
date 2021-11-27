import { Post } from "src/posts/entities/post.entity";

export interface IUser {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  posts?: Post[];
}
