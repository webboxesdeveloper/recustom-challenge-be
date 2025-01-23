import { User } from './user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity, OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('activity_logs')
export class ActivityLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.activityLog, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  logins: number;

  @Column()
  downloads: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
