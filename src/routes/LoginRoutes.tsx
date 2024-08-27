import AuthLayout from '@/layouts/AuthLayout';
import { Route, Routes } from 'react-router-dom';
import ConfirmAccountView from '@/views/auth/ConfirmAccountView';
import LoginView from '@/views/auth/LoginView';
import RegisterView from '@/views/auth/RegisterView';
import RequestNewTokenView from '@/views/auth/RequestNewTokenView';

function LoginRoutes() {
	return (
		<Routes>
			<Route element={<AuthLayout />}>
				<Route
					path='/login'
					element={<LoginView />}
				/>
				<Route
					path='/register'
					element={<RegisterView />}
				/>
				<Route
					path='confirm-account'
					element={<ConfirmAccountView />}
				/>
				<Route
					path='request-token'
					element={<RequestNewTokenView />}
				/>
			</Route>
		</Routes>
	);
}

export default LoginRoutes;
