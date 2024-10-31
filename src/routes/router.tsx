import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectRoutes from '@/routes/ProjectRoutes';
import LoginRoutes from '@/routes/LoginRoutes';
import AuthLayout from '@/layouts/AuthLayout';
import NotFound from '@/views/404/NotFound';

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/*' element={<ProjectRoutes />} />
				<Route path='/auth/*' element={<LoginRoutes />} />
				<Route element={<AuthLayout />}>
					<Route path='/404' element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
