import { Route, Routes } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import DashboardView from '@/views/DashboardView';
import CreateProjectView from '@/views/projects/CreateProjectView';
import DetailsProjectView from '@/views/projects/DetailsProjectView';
import EditProjectView from '@/views/projects/EditProjectView';

export default function ProjectRoutes() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route
					index
					path='/'
					element={<DashboardView />}
				/>

				<Route
					path='/projects/create'
					element={<CreateProjectView />}
				/>

				<Route
					path='/projects/:projectId'
					element={<DetailsProjectView />}
				/>

				<Route
					path='/projects/:projectId/edit'
					element={<EditProjectView />}
				/>
			</Route>
		</Routes>
	);
}
