import { Router } from 'express';
import { PointController } from './controllers/PointController';

const routes = Router();

const pointController = new PointController();

routes.post('/users', pointController.createUser);
routes.post('/points', pointController.registerPoint);
routes.get('/points/history/:user_code', pointController.getPointsHistory);
routes.get('/points/today/:user_code', pointController.getTodayHours);
routes.get('/users', pointController.getAllUsers);
routes.get('/users/exists/:user_code', pointController.checkUserExists);
routes.get('/points/history/:user_code/paginated', pointController.getPaginatedHistory); // Nova rota

routes.get("/teste", (req, res) => {
    return res.json("testando servidor");
});

export default routes;
