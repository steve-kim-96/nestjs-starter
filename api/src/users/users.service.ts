import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.create(createUserDto);
      return this.userRepository.save(user);
    } catch (error) {
      console.error("Woops. Couldn't create user");
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      console.error("Woops. Couldn't find the users");
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = this.userRepository.findOne(id);
      return user;
    } catch (error) {
      console.error("Woops. Couldn't find that user");
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    try {
      const updatedUser = this.userRepository.update(id, updateUserDto);
      return updatedUser
    } catch (error) {
      console.error("Woops, couldn't update that user");
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const deletedUser = this.userRepository.delete(id);
      return deletedUser;
    } catch (error) {
      console.error("Woops. Couldn't delete that user");
    }
  }
}
