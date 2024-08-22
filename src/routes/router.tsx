import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectRoutes from '@/routes/ProjectRoutes';
import LoginRoutes from '@/routes/LoginRoutes';

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/*'
					element={<ProjectRoutes />}
				/>
				<Route
					path='/auth/*'
					element={<LoginRoutes />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
