import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddStartTimeToDailyPoints1627908466521 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('daily_points', new TableColumn({
            name: 'start_time',
            type: 'timestamp',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('daily_points', 'start_time');
    }
}
