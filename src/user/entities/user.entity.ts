import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity, OneToOne,
} from 'typeorm';
import { UserStatus } from '../enum/status.enum';
import { UserRole } from '../enum/role.enum';
import { ActivityLog } from './activity-log.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  image: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ nullable: true, select: false })
  passVerificationCode: string;

  @Column({ nullable: true, select: false })
  passExpiryTime: string;

  @Column({ default: false, select: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => ActivityLog, (activityLog) => activityLog.user)
  activityLog: ActivityLog;
}
