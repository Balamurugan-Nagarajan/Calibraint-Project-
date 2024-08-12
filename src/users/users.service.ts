import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, //repo
  ) {}

  async createUser(
    firstName: string,
    lastName: string,
    organization: string,
    email: string,
    password: string,
  ): Promise<User> {
    const newUser = new this.userModel({ firstName, lastName, organization, email, password }); //admin logic
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(
    id: string,
    firstName: string,
    lastName: string,
    organization: string,
    email: string,
  ): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { firstName, lastName, organization, email },
      { new: true },
    ).exec();

    if (!updatedUser) { 
      throw new NotFoundException(`User with ID ${id} not found`); //separate file for error message
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
