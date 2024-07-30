import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity('daily_points')
class DailyPoints {
    @PrimaryColumn()
    user_code: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_code' })
    user: User;

    @Column({ default: false })
    working: boolean;

    @Column('float', { default: 0 }) 
    hours_today: number;

    @Column('timestamp', { nullable: true })
    start_time: Date | null;
}

export default DailyPoints;
