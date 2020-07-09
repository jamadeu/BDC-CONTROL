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
import Asset from './Asset';

@Entity('in_transit')
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
  status: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ default: false })
  delivered: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default InTransit;
