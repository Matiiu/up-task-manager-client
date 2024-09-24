import AuthLayout from '@/layouts/AuthLayout';
import { Navigate, Route, Routes } from 'react-router-dom';
import ConfirmAccountView from '@/views/auth/ConfirmAccountView';
import LoginView from '@/views/auth/LoginView';
import RegisterView from '@/views/auth/RegisterView';
import RequestNewTokenView from '@/views/auth/RequestNewTokenView';
import RestorePasswordView from '@/views/auth/RestorePasswordView';
import CreateNewPasswordView from '@/views/auth/CreateNewPasswordView';

function LoginRoutes() {
	return (
		<Routes>
			<Route element={<AuthLayout />}>
				<Route index path='/login' element={<LoginView />} />
				<Route path='/register' element={<RegisterView />} />
				<Route path='confirm-account' element={<ConfirmAccountView />} />
				<Route path='restore-password' element={<RequestNewTokenView />} />
				<Route path='restore-password' element={<RestorePasswordView />} />
				<Route path='new-password' element={<CreateNewPasswordView />} />
				<Route path='/*' element={<Navigate to='/auth/login' />} />
			</Route>
		</Routes>
	);
}

export default LoginRoutes;
