import { Entity,  PrimaryColumn } from 'typeorm';

@Entity('users')
class User {
    @PrimaryColumn()
    code: string;
}

export default User;
