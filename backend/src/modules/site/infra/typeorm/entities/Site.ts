/*
 * @Author: Jean Amadeu
 * @Date: 2020-06-20 15:29:03
 * @Last Modified by:   Jean Amadeu
 * @Last Modified time: 2020-06-20 15:29:03
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('tb_site')
class Site {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Site;
