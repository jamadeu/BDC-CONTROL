import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableInTransit1592754571724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'in_transit',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'asset_id',
            type: 'varchar',
          },
          {
            name: 'site_origem_id',
            type: 'varchar',
          },
          {
            name: 'site_destination_id',
            type: 'varchar',
          },
          {
            name: 'invoice',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'comment',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'delivered',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'in_transit',
      new TableForeignKey({
        name: 'SiteOrigem',
        columnNames: ['site_origem_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sites',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'in_transit',
      new TableForeignKey({
        name: 'SiteDestination',
        columnNames: ['site_destination_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sites',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'in_transit',
      new TableForeignKey({
        name: 'AssetInTransit',
        columnNames: ['asset_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'assets',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('in_transit', 'AssetInTransit');
    await queryRunner.dropForeignKey('in_transit', 'SiteDestination');
    await queryRunner.dropForeignKey('in_transit', 'SiteOrigem');
    await queryRunner.dropTable('in_transit');
  }
}
