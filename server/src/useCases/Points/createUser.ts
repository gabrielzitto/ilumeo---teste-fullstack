import { getRepository } from 'typeorm';
import User from '../../entities/User';

interface IRequest {
    code: string;
}

export async function createUser({ code }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const user = userRepository.create({ code });

    await userRepository.save(user);

    return user;
}
