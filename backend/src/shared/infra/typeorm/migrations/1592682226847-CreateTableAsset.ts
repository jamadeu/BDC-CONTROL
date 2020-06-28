import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableAsset1592682226847 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'assets',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'partnumber',
            type: 'varchar',
          },
          {
            name: 'serie',
            type: 'varchar',
          },
          {
            name: 'partnumber_serie',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'site_id',
            type: 'int',
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
      'assets',
      new TableForeignKey({
        name: 'AssetLocation',
        columnNames: ['site_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sites',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('assets', 'AssetLocation');
    await queryRunner.dropTable('assets');
  }
}
