import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddMinutesToPointsHistory1627908466519 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('points_history', new TableColumn({
            name: 'minutes',
            type: 'int',
            isNullable: false,
            default: 0
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('points_history', 'minutes');
    }
}
