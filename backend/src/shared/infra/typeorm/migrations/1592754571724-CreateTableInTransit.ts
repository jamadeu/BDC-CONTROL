import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableInTransit1592754571724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'in_transit',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'asset_id',
            type: 'int',
          },
          {
            name: 'site_origem_id',
            type: 'int',
          },
          {
            name: 'site_destination_id',
            type: 'int',
          },
          {
            name: 'invoice',
            type: 'varchar',
          },
          {
            name: 'prev',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'note',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sla',
            type: 'varchar',
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
      'tb_in_transit',
      new TableForeignKey({
        name: 'SiteOrigem',
        columnNames: ['site_origem_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_site',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'tb_in_transit',
      new TableForeignKey({
        name: 'SiteDestination',
        columnNames: ['site_destination_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_site',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'tb_in_transit',
      new TableForeignKey({
        name: 'AssetInTransit',
        columnNames: ['asset_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_asset',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_in_transit', 'AssetInTransit');
    await queryRunner.dropForeignKey('tb_in_transit', 'SiteDestination');
    await queryRunner.dropForeignKey('tb_in_transit', 'SiteOrigem');
    await queryRunner.dropTable('tb_in_transit');
  }
}
