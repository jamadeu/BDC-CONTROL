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

@Entity('assets')
class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  partnumber: string;

  @Column()
  serie: string;

  @Column({ unique: true })
  partnumber_serie: string;

  @Column()
  status: string;

  @Column()
  site_id: string;

  @ManyToOne(() => Site, { eager: true })
  @JoinColumn({ name: 'site_id' })
  site: Site;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Asset;
