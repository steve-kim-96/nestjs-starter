import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const newPost = await this.postsRepository.create(createPostDto);
      return this.postsRepository.save(newPost);
    } catch (error) {
      console.error("Woops. Couldn't create a post");
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      const posts = await this.postsRepository.find();
      return posts;
    } catch (error) {
      console.error('Woops');
    }
  }

  async findOne(id: string): Promise<Post> {
    try {
      const post = await this.postsRepository.findOne(id);
      return post;
    } catch (error) {
      console.error("Woops. Couldn't find post with that id...")
    }
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
