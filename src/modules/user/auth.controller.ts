import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';
import * as bcrypt from 'bcrypt';
import { UserInput } from './dto/user.input';
import { CreateUserDto } from './dto/user.dto';
import { AuthCredentialsDto, RefreshAuthDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
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
        categoryId,
      } = createUserDto;
      if (
        password.length < 8 ||
        !/[a-z]/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/[0-9]/.test(password)
      ) {
        throw new BadRequestException('Password requirements not met.');
      }
      const userInput: UserInput = {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber: Number(phoneNumber),
        gender,
        role,
        categoryId,
        password: await bcrypt.hash(password, 8),
      };
      if (dateOfBirth) {
        userInput.dateOfBirth = dateOfBirth;
      }

      const user = await this.userService.create(userInput);
      const tokens = await this.tokenService.generateAuthTokens(user);
      return tokens;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Post('/login')
  async login(@Body() authCredentialDto: AuthCredentialsDto) {
    const { email, password } = authCredentialDto;
    try {
      const user = await this.authService.loginUserWithEmailAndPassword(
        email,
        password,
      );
      const tokens = await this.tokenService.generateAuthTokens(user);
      return tokens;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Post('/logout')
  async logOut(@Body() refreshAuthDto: RefreshAuthDto) {
    try {
      const { refreshToken } = refreshAuthDto;
      await this.authService.logout(refreshToken);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Post('/refreshauth')
  async refreshAuth(@Body() refreshAuthDto: RefreshAuthDto) {
    try {
      const { refreshToken } = refreshAuthDto;
      const tokens = await this.authService.refreshAuth(refreshToken);
      return tokens;
    } catch (err) {
      throw new Error(err);
    }
  }

  // async forgotPassword(req: any, res: any, next: any) {
  //     try {
  //         const { error } = UserValidator.forgotPassword(req.body);
  //         if (error) {
  //             throw new Error(String(error));
  //         }
  //         const resetPasswordToken = await this.tokenService.generateResetPasswordToken(req.body.email);
  //         // await sendResetPasswordEmail(req.body.email, resetPasswordToken);
  //         res.status(200).send('Password sent to mail');
  //     } catch (err) {
  //         throw new Error(err);
  //     }
  // };

  // @Post('/resetpassword')
  // async resetPassword(@Body() authCredentialDto: AuthCredentialsDto) {
  //     const { token, password } = authCredentialDto;
  //     try {
  //         return await this.authService.resetPassword(token, password);
  //     } catch (err) {
  //         throw new Error(err);
  //     }
  // };
}
