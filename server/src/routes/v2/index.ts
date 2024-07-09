import express from "express";
import authRoute from "../../routes/v2/auth.route";

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;