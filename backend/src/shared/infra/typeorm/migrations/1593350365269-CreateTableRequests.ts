import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableRequests1593350365269
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'requests',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'request_identification',
            type: 'varchar',
          },
          {
            name: 'contract',
            type: 'varchar',
          },
          {
            name: 'request_type',
            type: 'varchar',
          },
          {
            name: 'asset_partnumber',
            type: 'varchar',
          },
          {
            name: 'asset_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'site_id',
            type: 'int',
          },
          {
            name: 'status',
            type: 'varchar',
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
      'requests',
      new TableForeignKey({
        name: 'Asset',
        columnNames: ['asset_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'assets',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'requests',
      new TableForeignKey({
        name: 'Destination',
        columnNames: ['site_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sites',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('requests', 'Destination');
    await queryRunner.dropForeignKey('requests', 'Asset');
    await queryRunner.dropTable('requests');
  }
}
