import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePointsHistoryTable1627908466517 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'points_history',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'user_code',
                        type: 'varchar',
                    },
                    {
                        name: 'date',
                        type: 'date',
                    },
                    {
                        name: 'hours',
                        type: 'int',
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
        await queryRunner.dropTable('points_history');
    }
}
