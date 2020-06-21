/*
 * @Author: Jean Amadeu
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Site from '@modules/site/infra/typeorm/entities/Site';

@Entity('tb_asset')
class Asset {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  partnumber: string;

  @Column()
  serie: string;

  @Column({ unique: true })
  partnumber_serie: string;

  @Column()
  status: string;

  @Column()
  site_id: number;

  @ManyToOne(() => Site, { eager: true })
  @JoinColumn({ name: 'site_id' })
  site: Site;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Asset;
