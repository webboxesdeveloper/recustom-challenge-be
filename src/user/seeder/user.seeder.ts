import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { enCodePassword } from 'src/utils/helpers/generic.helper';
import seedData from '../../utils/mock';
import { ActivityLog } from '../entities/activity-log.entity';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ActivityLog)
    private readonly activityLogRepository: Repository<ActivityLog>,
  ) {}
  async seed(): Promise<any> {
    const userSeedData = seedData.map(async (it) => {
      const activityLog = this.activityLogRepository.create({
        logins: it.activityLog.logins,
        downloads: it.activityLog.downloads,
      });
      const savedActivityLog = await this.activityLogRepository.save(activityLog);

      return this.userRepository.create({
        ...it,
        password: enCodePassword(it.password),
        activityLog: savedActivityLog,
      });
    });
    const userData = await Promise.all(userSeedData);
    await this.userRepository.save(userData);
  }

  async drop(): Promise<any> {
    return this.userRepository.clear();
  }
}
