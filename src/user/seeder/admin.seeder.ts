import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { enCodePassword } from 'src/utils/helpers/generic.helper';

@Injectable()
export class AdminSeeder implements Seeder {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async seed(): Promise<any> {
    const adminSeedData = {
      name: this.configService.get('seed.admin.name'),
      email: this.configService.get('seed.admin.email'),
      password: enCodePassword(this.configService.get('seed.admin.password')),
      role: this.configService.get('seed.admin.role'),
    };
    this.userRepository.create(adminSeedData);
    const adminData = this.userRepository.create(adminSeedData);

    await this.userRepository.save(adminData);
  }

  async drop(): Promise<any> {
    return this.userRepository.clear();
  }
}
