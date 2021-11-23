import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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
      const posts = await this.postsRepository.find({ relations: ['user'] });
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
      console.error("Woops. Couldn't find post with that id...");
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      const post = await this.postsRepository.findOne(id);
      if (updatePostDto.Title) {
        post.Title = updatePostDto.Title;
      }
      if (updatePostDto.Content) {
        post.Content = updatePostDto.Content;
      }
      return this.postsRepository.save(post);
    } catch (error) {
      console.error("Woops! Couldn't update the post...");
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.postsRepository.delete(id);
    } catch (error) {
      console.error("Woopsie... Couldn't delete the post...");
    }
  }
}
