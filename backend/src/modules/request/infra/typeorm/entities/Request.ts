import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('requests')
class Request {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  request_identification: string;

  @Column()
  contract: string;

  @Column()
  request_type: string;

  @Column()
  asset_partnumber: string;

  @Column('int')
  asset_id: number;

  @Column('int')
  site_id: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Request;
