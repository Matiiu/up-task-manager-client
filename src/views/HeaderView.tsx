import Logo from '@/components/Logo';
import NavMenu from '@/components/NavMenu';
import { User } from '@/types/authTypes';
import { Link } from 'react-router-dom';

type HeaderViewProps = {
	user: User;
};
function HeaderView({ user }: HeaderViewProps) {
	return (
		<header className='bg-gray-800 py-5'>
			<div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
				<figure className='w-64'>
					<Link to={'/'}>
						<Logo />
					</Link>
				</figure>

				<NavMenu user={user} />
			</div>
		</header>
	);
}

export default HeaderView;
