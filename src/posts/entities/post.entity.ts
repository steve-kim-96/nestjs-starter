import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", { length: 100 })
    Title: string;

    @Column("varchar", { length: 255 })
    Content: string;

    @ManyToOne(() => User, user => user.posts)
    user: User;
}
