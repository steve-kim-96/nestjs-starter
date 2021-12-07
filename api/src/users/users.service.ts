import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, switchMap, map, catchError, throwError, Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUser } from './entities/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  create(user: CreateUserDto): Observable<IUser> {
    try {
      return this.authService.hashPassword(user.password).pipe(
        switchMap((passwordHash) => {
          const newUser = new User();
          newUser.email = user.email;
          newUser.firstName = user.firstName;
          newUser.lastName = user.lastName;
          newUser.username = user.username;
          newUser.password = passwordHash;
          newUser.role = user.role;
          return from(this.userRepository.save(newUser)).pipe(
            map((user: User) => {
              const { password, ...result } = user;
              return result;
            }),
          );
        }),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll(): Observable<IUser[]> {
    try {
      return from(this.userRepository.find()).pipe(
        map((users: IUser[]) => {
          users.forEach((user) => delete user.password);
          return users;
        }),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(id: string): Observable<IUser> {
    try {
      return from(this.userRepository.findOne(id)).pipe(
        map((user: User) => {
          const { password, ...result } = user;
          return result;
        }),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    try {
      const updatedUser = this.userRepository.update(id, updateUserDto);
      return updatedUser;
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
  login({ email, password }): Observable<string> {
    return this.validateUser(email, password).pipe(
      switchMap((user: User) => {
        if (user) {
          return this.authService
            .generateJWT(user)
            .pipe(map((jwt: string) => jwt));
        } else {
          return 'Incorrect email or password';
        }
      }),
    );
  }

  validateUser(email: string, password: string): Observable<IUser> {
    return this.findByEmail(email).pipe(
      switchMap((user: User) =>
        this.authService.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              const { password, ...result } = user; // Known as rest parameter
              return result;
            } else {
              throw Error();
            }
          }),
        ),
      ),
    );
  }

  findByEmail(email: string): Observable<User> {
    return from(this.userRepository.findOne({ email }));
  }
}
