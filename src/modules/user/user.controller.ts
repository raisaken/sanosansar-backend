import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserInput } from './dto/user.input';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserQueryDto } from './dto/user-query.dto';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth('authorization')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const {
        firstName,
        middleName,
        lastName,
        gender,
        email,
        role,
        password,
        phoneNumber,
        dateOfBirth,
      } = createUserDto;

      const isUserExistsWithEmail = await this.userService.findByEmail(email);
      if (isUserExistsWithEmail) {
        throw new ConflictException(`User already exists for requested email: ${email}.`)
      }

      const user: UserInput = {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber: Number(phoneNumber),
        gender,
        role,
        password: await bcrypt.hash(password, 8),
        dateOfBirth,
      };
      return this.userService.create(user);
    } catch (err) {
      throw err;
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/list')
  findUsersByRole(@Query() query: UserQueryDto) {
    return this.userService.findUsersByRole(query);
  }


  @Get('detail')
  findUserDetail(@Req() req) {
    const { user } = req?.auth;
    return this.userService.findOne(user.id);
  }

  @Get(':id([0-9]+)') // route mapping issue ref: https://stackoverflow.com/questions/52173335/typeorm-logs-to-the-console-but-doesnt-return
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {

      const { email, password } = updateUserDto;
      // if(email){
      //   const userByEmail =  await this.userService.findByEmail(email);
      //   if(userByEmail){
      //     throw new ConflictException(`user can't be updated with email: ${email}`)
      //   }
      // }
      if (password) {
        updateUserDto.password = await bcrypt.hash(password, 8);
      }
      return this.userService.update(+id, updateUserDto);
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
