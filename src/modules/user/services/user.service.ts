import { Injectable } from '@nestjs/common';
import { User } from 'src/database/models/user.entity';
import { Repository, Connection, Like } from 'typeorm';
import { UserQueryDto } from '../dto/user-query.dto';
import { UpdateUserInput, UserInput } from '../dto/user.input';

@Injectable()
export class UserService {
  private _userRepository: Repository<User>;

  constructor(private _connection: Connection) {
    this._userRepository = this._connection.getRepository(User);
  }

  async create(userInput: UserInput) {
    const user = await this._userRepository.save(userInput);
    return user;
  }

  findAll() {
    return this._userRepository.find();
  }

  async findUsersByRole(query: UserQueryDto) {
    let { page, limit, order, role } = query;
    page = page ? Number(page) : 1;
    limit = limit ? Number(limit) : 10;
    const orderBy = order ? order : 'DESC';
    const condition: any = {
      isActive: true,
    };

    if (role) {
      condition.role = Like(`%${role}%`);
    }

    const [result, total] = await Promise.all([
      this._userRepository.find({
        where: condition,
        take: limit,
        skip: limit * (page - 1),
        order: { createdAt: order },
      }),
      this._userRepository.count(condition),
    ]);

    return {
      result,
      total,
      page,
      perPage: limit,
    };
  }

  findOne(id: number) {
    return this._userRepository.findOne(id);
  }

  findByEmail(email: string) {
    return this._userRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'password'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserInput) {
    const {
      email,
      firstName,
      middleName,
      lastName,
      password,
      gender,
      role,
      dateOfBirth,
      profilePicture,
    } = updateUserDto;
    const user = await this._userRepository.findOne(id, {
      select: [
        'id',
        'role',
        'email',
        'middleName',
        'firstName',
        'lastName',
        'dateOfBirth',
        'password',
      ],
    });

    if (user) {
      user.role = role || user.role;
      // user.email =  email || user.email;
      user.gender = gender || user.gender;
      user.password = password || user.password;
      user.lastName = lastName || user.lastName;
      user.firstName = firstName || user.firstName;
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      user.profilePicture = profilePicture || user.profilePicture;
      user.middleName = middleName === '' ? '' : middleName || user.middleName;
      await this._userRepository.save(user);
    }
    return user;
  }

  remove(id: string) {
    return this._userRepository.delete(id);
  }
}
