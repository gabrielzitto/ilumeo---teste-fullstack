import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
class User {
    @PrimaryColumn()
    code: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}

export default User;
