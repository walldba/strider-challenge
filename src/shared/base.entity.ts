import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP(0)' })
  createdAt: Date;
}
