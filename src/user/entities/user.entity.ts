import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude() // 查询结果过滤掉此字段
  password: string;

  @UpdateDateColumn({
    name: 'update_time',
    nullable: true,
  })
  update_time: Date | null;

  @CreateDateColumn({
    name: 'create_time',
    nullable: true,
  })
  create_time: Date;

  @Column({ default: '' })
  email: string;

  @Column({ default: 1 })
  state: number;

  @Column({ default: 'admin' })
  roles: string;
}
