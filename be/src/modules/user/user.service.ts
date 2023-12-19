import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserOutput } from './dtos/user-output.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { compare, hash } from 'bcrypt';
import { RegisterInput } from '../auth/dtos/register.input';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async findUserById(id: number): Promise<User> {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async getUserInfo(userId: number): Promise<Partial<User>> {
    const user = await this.repository.findOne({
      where: {
        id: userId,
      },
      select: ['id', 'name'],
    });

    return plainToInstance(UserOutput, {
      ...user,
    });
  }

  async validateUsernamePassword(
    username: string,
    password: string,
  ): Promise<Partial<User>> {
    const user = await this.repository.findOne({
      where: {
        username,
      },
      select: ['id', 'username', 'password'],
    });

    if (!user) {
      throw new NotFoundException('Invalid username.');
    }

    const match = await compare(password, user.password);
    if (!match) {
      throw new NotFoundException('Invalid password.');
    }

    return user;
  }

  async createUser(input: RegisterInput): Promise<User> {
    const nextId = await this.repository.getNextId();
    const user = plainToInstance(User, {
      id: nextId,
      ...input,
    });
    // get next id from user sequence
    user.password = await hash(user.password, 10);
    return this.repository.save(user);
  }

  async findOne(
    options?: FindOneOptions<User>,
  ): Promise<Partial<User> | undefined> {
    return this.repository.findOne(options);
  }

  async findByUsername(username: string): Promise<Partial<User> | undefined> {
    const user: Partial<User> = await this.repository.findOne({
      where: {
        username,
      },
      select: ['id', 'username', 'name'],
    });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }
}
