import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  bio!: string;

  @Column({ nullable: true })
  avatar!: string;

  // Owner side (has foreign key)
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user!: User;
}
