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
  IsNull,
} from 'typeorm';
import Site from '@modules/site/infra/typeorm/entities/Site';
import Asset from './Asset';

@Entity('tb_in_transit')
class InTransit {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  asset_id: number;

  @ManyToOne(() => Asset, { eager: true })
  @JoinColumn({ name: 'asset_id' })
  asset: Asset;

  @Column()
  site_origem_id: number;

  @ManyToOne(() => Site, { eager: true })
  @JoinColumn({ name: 'site_origem_id' })
  origem: Site;

  @Column()
  site_destination_id: number;

  @ManyToOne(() => Site, { eager: true })
  @JoinColumn({ name: 'site_destination_id' })
  destination: Site;

  @Column()
  invoice: string;

  @Column({ nullable: true })
  prev: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  note: string;

  @Column({ default: false })
  delivered: boolean;

  @Column({ default: 'GREEN' })
  sla: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default InTransit;
