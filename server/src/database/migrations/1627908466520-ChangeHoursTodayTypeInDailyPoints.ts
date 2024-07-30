import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeHoursTodayTypeInDailyPoints1627908466520 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('daily_points', 'hours_today', new TableColumn({
            name: 'hours_today',
            type: 'float',
            isNullable: false,
            default: 0
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('daily_points', 'hours_today', new TableColumn({
            name: 'hours_today',
            type: 'int',
            isNullable: false,
            default: 0
        }));
    }
}
