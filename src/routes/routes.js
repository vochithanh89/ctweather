import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';

export const publicRoutes = [
    {
        path: '/',
        page: Home,
        layout: MainLayout,
    },
];
