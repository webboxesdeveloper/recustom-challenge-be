import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { findService } from '../utils/helpers/find.service.helper';
import { ERROR_MESSAGES } from 'src/utils/constants/messages.constants';
import { UserStatus } from './enum/status.enum';
import { UserRole } from './enum/role.enum';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

@Injectable()
export class UserService {
  genericFunctions: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create({
        ...createUserDto,
      });

      return this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findAll(offset: number, limit: number) {
    try {
      return findService(
        this.userRepository,
        'findPaginate',
        {
          isDeleted: false,
          role: UserRole.USER,
          status: UserStatus.ACTIVE,
        },
        {
          offset,
          limit,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findOne(id: number) {
    try {
      return findService(this.userRepository, 'findOne', {
        id,
        isDeleted: false,
      }).then((res) => {
        if (res) return res;
        else throw new NotFoundException(ERROR_MESSAGES.USER['013']);
      });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.COMMON['001']);
    }
  }

  filterUser(options: {}) {
    try {
      return this.userRepository.findOne({
        where: options,
        select: [
          'id',
          'name',
          'email',
          'password',
          'role',
          'status',
          'passExpiryTime',
          'passVerificationCode',
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.COMMON['001']);
    }
  }

  findUser(email: string) {
    try {
      return this.userRepository
        .findOne({
          where: { email, isDeleted: false },
          select: [
            'id',
            'name',
            'email',
            'password',
            'role',
            'status',
            'passExpiryTime',
            'passVerificationCode',
          ],
        })
        .then((res) => {
          if (res) return res;
          else throw new NotFoundException(ERROR_MESSAGES.USER['002']);
        });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.COMMON['001']);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepository
        .findOne({ where: { id, isDeleted: false } })
        .then((res) => {
          if (res)
            return this.userRepository.save({ ...res, ...updateUserDto });
          else throw new NotFoundException(ERROR_MESSAGES.USER['013']);
        });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.COMMON['001']);
    }
  }

  updateWithOptions(id: number, updateUserDto: any) {
    try {
      return this.userRepository
        .findOne({ where: { id, isDeleted: false } })
        .then((res) => {
          if (res)
            return this.userRepository.save({ ...res, ...updateUserDto });
          throw new NotFoundException(ERROR_MESSAGES.USER['013']);
        });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.COMMON['001']);
    }
  }

  remove(id: number) {
    try {
      return this.userRepository
        .findOne({ where: { id, isDeleted: false } })
        .then((res) => {
          if (res) return this.userRepository.save({ ...res, isDeleted: true });
          else throw new NotFoundException(ERROR_MESSAGES.USER['013']);
        });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.COMMON['001']);
    }
  }

  async generatePdf(id: number) {
    const res = await this.userRepository
      .findOne({ where: { id, isDeleted: false } });
    if (res) {
      const pdfDoc = await PDFDocument.create()
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
      const page = pdfDoc.addPage()
      const { width, height } = page.getSize();
      const headerFontSize = 20;
      const contentFontSize = 14;
      const boldFont = timesRomanFont;

      page.drawText('User Activity Summary', {
        x: width / 2 - 100,
        y: height - 30,
        size: headerFontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      const userInfo = {
        name: res.name,
        email: res.email,
        role: res.role,
      };

      page.drawText('User Information:', {
        x: 50,
        y: height - 80,
        size: contentFontSize + 2,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Name: ${userInfo.name}`, {
        x: 50,
        y: height - 110,
        size: contentFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Email: ${userInfo.email}`, {
        x: 50,
        y: height - 130,
        size: contentFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Role: ${userInfo.role}`, {
        x: 50,
        y: height - 150,
        size: contentFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      const activities = {
        logins: 25,
        downloads: 10,
      };

      page.drawText('User Activities:', {
        x: 50,
        y: height - 190,
        size: contentFontSize + 2,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Number of Logins: ${activities.logins}`, {
        x: 50,
        y: height - 220,
        size: contentFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Number of Downloads: ${activities.downloads}`, {
        x: 50,
        y: height - 240,
        size: contentFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      const tableX = 50;
      const tableY = height - 300;
      const cellWidth = 100;
      const cellHeight = 30;

      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
          const x = tableX + col * cellWidth;
          const y = tableY - row * cellHeight;
          page.drawRectangle({
            x,
            y,
            width: cellWidth,
            height: cellHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
          });

          page.drawText(`Data ${row + 1}-${col + 1}`, {
            x: x + 10,
            y: y + 10,
            size: contentFontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
          });
        }
      }

      return await pdfDoc.save();
    }
    else throw new NotFoundException(ERROR_MESSAGES.USER['013']);
  }
}
