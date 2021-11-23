import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: "username"
    })
    username: string;

    @Column({
        name: "first_name"
    })
    firstName: string;

    @Column({
        name: "last_name"
    })
    lastName: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}
