import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date = new Date();

  @UpdateDateColumn({ default: null })
  updatedAt: Date | null = null;
}
