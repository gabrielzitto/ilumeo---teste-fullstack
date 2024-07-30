import { getRepository } from 'typeorm';
import User from '../../entities/User';

interface IRequest {
    code: string;
    email: string;
    password: string;
}

export async function createUser({ code, email, password }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const user = userRepository.create({ code, email, password });

    await userRepository.save(user);

    return user;
}
