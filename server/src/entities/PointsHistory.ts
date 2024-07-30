import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity('points_history')
class PointsHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_code: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_code' })
    user: User;

    @Column()
    date: Date;

    @Column()
    hours: number;

    @Column()
    minutes: number; 
}

export default PointsHistory;
