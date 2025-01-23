import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { User } from '../user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSeeder } from 'src/user/seeder/user.seeder';
import configuration from '../utils/config/configuration';
import { ActivityLog } from '../user/entities/activity-log.entity';

seeder({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.main.host'),
        port: configService.get('database.main.port'),
        username: configService.get('database.main.username'),
        password: configService.get('database.main.password'),
        database: configService.get('database.main.database'),
        entities: ['dist/**/*.entity.js'],
        logging: true,
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([User, ActivityLog]),
  ],
  providers: [UserSeeder],
}).run([UserSeeder]);
