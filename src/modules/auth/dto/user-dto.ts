import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CheckUserEmailDto {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email: string;
}
//  we will use same this for any entity signup (user,admin,super-admin)
export class EntitySignupWithEmailDto {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  @IsStrongPassword(
    {
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Min length is 10 with atleast one lowercase, one uppercase, one number and one symbol',
    },
  )
  password: string;

  @IsNotEmpty({ message: 'confirmPassword is required' })
  @IsString()
  confirmPassword: string;

  @IsNotEmpty({ message: 'firstName is required' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'lastName is required' })
  @IsString()
  lastName: string;

  @IsEnum(['male', 'female'], {
    message: 'gender should be male or female',
  })
  @IsString()
  gender: string;

  @IsOptional()
  @IsDate()
  @IsString()
  dob: string;

  @IsOptional()
  @IsPhoneNumber()
  @IsString()
  phoneNumber: string;
}

export class UserVerifyEmailDto {
  @IsNotEmpty({ message: 'otp is required' })
  @IsString()
  otp: string;
}

export class UserLoginEmailDto {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  password: string;
}
