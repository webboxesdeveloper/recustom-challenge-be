import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Res,
  HttpStatus,
  ConflictException,
  // UseGuards,
  // Req,
  // UploadedFile,
  // BadRequestException,
  // UseInterceptors,
  // UnsupportedMediaTypeException,
} from '@nestjs/common';
import {
  enCodePassword,
  // checkFileType,
  // comparePassword,
} from '../utils/helpers/generic.helper';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from 'src/utils/constants/messages.constants';
// import { AuthGuard } from '@nestjs/passport';
import { /*ApiBearerAuth, ApiBody, ApiConsumes, */ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserRole } from './enum/role.enum';
// import { AccountStatusDto } from './dto/account-status.dto';
// import { ChangePasswordMeDto } from './dto/change-password.dto';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { UpdateMeProfileDto } from './dto/update-me-profile.dto';

import { FileUploadService } from 'src/shared/uploadFile.service';
import { PaginationParams } from 'src/utils/dtos/pagination.dto';
import { Roles } from 'src/utils/decorators/role.decorator';

// import { CheckValidId } from 'src/utils/decorators/id.decorator';
// import { RolesGuard } from 'src/utils/guards/roles.guard';
// import * as _ from 'lodash';
// import * as mime from 'mime-types';

@ApiTags('User')
@ApiTags('User Management')
@Controller('user')
// @UseGuards(AuthGuard('jwt'))
// @ApiBearerAuth('access_token')
// @UseGuards(RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const foundUser = await this.userService.filterUser({
      email: createUserDto.email,
      isDeleted: false,
    });
    if (foundUser) {
      throw new ConflictException(ERROR_MESSAGES.USER['003']);
    }
    createUserDto.password = enCodePassword(createUserDto.password);
    const createNewUser = await this.userService.create(createUserDto);
    if (createNewUser) {
      return {
        message: SUCCESS_MESSAGES.USER['006'],
        status: HttpStatus.CREATED,
      };
    }
  }

  @Get()
  @Roles(UserRole.ADMIN)
  async find(@Query() { offset, limit }: PaginationParams) {
    const userList = await this.userService.findAll(offset, limit);
    if (userList) {
      return {
        data: userList,
        status: HttpStatus.OK,
      };
    }
  }

  @Get('pdf/:id')
  async generatePdf(@Param('id') id: string, @Res() res: Response) {
    const pdfBytes = await this.userService.generatePdf(+id);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="example.pdf"');
    res.end(Buffer.from(pdfBytes));
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUserData = await this.userService.update(+id, updateUserDto);
    if (updatedUserData) {
      return {
        message: SUCCESS_MESSAGES.USER['005'],
        status: HttpStatus.OK,
      };
    }
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    const deletedUser = await this.userService.remove(+id);
    if (deletedUser) {
      return {
        message: SUCCESS_MESSAGES.USER['008'],
        status: HttpStatus.OK,
      };
    }
  }
}
