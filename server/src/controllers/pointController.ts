import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { createUser } from '../useCases/Points/createUser';
import { registerPoint } from '../useCases/Points/registerPoint';
import PointsHistory from '../entities/PointsHistory';
import DailyPoints from '../entities/DailyPoints';
import User from '../entities/User';

export class PointController {
    async createUser(request: Request, response: Response): Promise<Response> {
        try {
            const { code } = request.body;

            const user = await createUser({ code });

            return response.json(user);
        } catch (error) {
            console.error('Error creating user:', error);
            return response.status(500).json({ status: 'error', message: 'Internal server error' });
        }
    }

    async registerPoint(request: Request, response: Response): Promise<Response> {
        try {
            const { user_code, timestamp } = request.body; // Adicionado timestamp

            const dailyPoints = await registerPoint({ user_code, timestamp });

            // Calculando e formatando hours_today
            const totalMinutes = dailyPoints.hours_today;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = Math.floor(totalMinutes % 60);
            const formattedHoursToday = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

            return response.json({
                user_code: dailyPoints.user_code,
                working: dailyPoints.working,
                hours_today: formattedHoursToday
            });
        } catch (error) {
            console.error('Error registering point:', error);
            return response.status(500).json({ status: 'error', message: 'Internal server error' });
        }
    }

    async getPointsHistory(request: Request, response: Response): Promise<Response> {
        try {
            const { user_code } = request.params;
            const pointsHistoryRepository = getRepository(PointsHistory);

            const history = await pointsHistoryRepository.find({
                where: { user_code },
                order: { date: 'DESC' }, // Ordenando da data mais recente para a mais antiga
            });

            const formattedHistory = history.map(entry => ({
                ...entry,
                date: new Date(entry.date).toLocaleDateString('pt-BR'),
                time: `${String(entry.hours).padStart(2, '0')}:${String(entry.minutes).padStart(2, '0')}`
            }));

            return response.json(formattedHistory);
        } catch (error) {
            console.error('Error getting points history:', error);
            return response.status(500).json({ status: 'error', message: 'Internal server error' });
        }
    }

    async getTodayHours(request: Request, response: Response): Promise<Response> {
        try {
            const { user_code } = request.params;
            const dailyPointsRepository = getRepository(DailyPoints);
            const pointsHistoryRepository = getRepository(PointsHistory);

            const dailyPoints = await dailyPointsRepository.findOne({ user_code });

            if (!dailyPoints) {
                return response.status(404).json({ error: 'User not found' });
            }

            let hoursWorkedToday = dailyPoints.hours_today;
            const isWorking = dailyPoints.working;

            if (dailyPoints.working && dailyPoints.start_time) {
                const now = new Date();
                const minutesWorked = (now.getTime() - new Date(dailyPoints.start_time).getTime()) / 60000;
                hoursWorkedToday += minutesWorked;
            }

            const hours = Math.floor(hoursWorkedToday / 60);
            const minutes = Math.floor(hoursWorkedToday % 60);

            return response.json({
                hours: String(hours).padStart(2, '0'),
                minutes: String(minutes).padStart(2, '0'),
                trabalhando: isWorking
            });
        } catch (error) {
            console.error('Error getting today hours:', error);
            return response.status(500).json({ status: 'error', message: 'Internal server error' });
        }
    }

    async getAllUsers(request: Request, response: Response): Promise<Response> {
        try {
            const userRepository = getRepository(User);

            const users = await userRepository.find();

            return response.json(users);
        } catch (error) {
            console.error('Error getting all users:', error);
            return response.status(500).json({ status: 'error', message: 'Internal server error' });
        }
    }

    async checkUserExists(request: Request, response: Response): Promise<Response> {
        try {
            const { user_code } = request.params;
            const userRepository = getRepository(User);

            const user = await userRepository.findOne({ code: user_code });

            return response.json({ exists: !!user });
        } catch (error) {
            console.error('Error checking user existence:', error);
            return response.status(500).json({ status: 'error', message: 'Internal server error' });
        }
    }

    async calculateBankHours(request: Request, response: Response): Promise<Response> {
        try {
            const { user_code, daily_hours } = request.query;
            const pointsHistoryRepository = getRepository(PointsHistory);

            const history = await pointsHistoryRepository.find({
                where: { user_code },
                order: { date: 'ASC' },
            });

            const [dailyHours, dailyMinutes] = daily_hours.split(':').map(Number);
            const totalDailyMinutes = dailyHours * 60 + dailyMinutes;

            let totalWorkedMinutes = 0;
            history.forEach(entry => {
                totalWorkedMinutes += entry.hours * 60 + entry.minutes;
            });

            const totalExpectedMinutes = totalDailyMinutes * history.length;
            const balanceMinutes = totalWorkedMinutes - totalExpectedMinutes;

            const balanceHours = Math.floor(Math.abs(balanceMinutes) / 60);
            const balanceRemainingMinutes = Math.abs(balanceMinutes) % 60;
            const balanceSign = balanceMinutes < 0 ? '-' : '';

            const formattedBalance = `${balanceSign}${String(balanceHours).padStart(2, '0')}:${String(balanceRemainingMinutes).padStart(2, '0')}`;

            return response.json({ balance: formattedBalance });
        } catch (error) {
            console.error('Error calculating bank hours:', error);
            return response.status(500).json({ status: 'error', message: 'Internal server error' });
        }
    }

    async getPaginatedHistory(request: Request, response: Response): Promise<Response> {
        try {
            const { user_code } = request.params;
            const { page = 1, per_page = 10 } = request.query;

            const pointsHistoryRepository = getRepository(PointsHistory);

            const [result, total] = await pointsHistoryRepository.findAndCount({
                where: { user_code },
                order: { date: 'DESC' },
                skip: (Number(page) - 1) * Number(per_page),
                take: Number(per_page)
            });

            const formattedHistory = result.map(entry => ({
                ...entry,
                date: new Date(entry.date).toLocaleDateString('pt-BR'),
                time: `${String(entry.hours).padStart(2, '0')}:${String(entry.minutes).padStart(2, '0')}`
            }));

            return response.json({
                data: formattedHistory,
                total,
                page: Number(page),
                per_page: Number(per_page),
                total_pages: Math.ceil(total / Number(per_page))
            });
        } catch (error) {
            console.error('Error getting paginated points history:', error);
            return response.status(500).json({ status: 'error', message: 'Internal server error' });
        }
    }
}
