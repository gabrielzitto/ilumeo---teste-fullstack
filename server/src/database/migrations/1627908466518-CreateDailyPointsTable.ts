import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDailyPointsTable1627908466518 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'daily_points',
                columns: [
                    {
                        name: 'user_code',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'working',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'hours_today',
                        type: 'int',
                        default: 0,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['user_code'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['code'],
                        onDelete: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('daily_points');
    }
}
