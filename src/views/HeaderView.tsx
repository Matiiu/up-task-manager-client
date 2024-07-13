import Logo from '@/components/Logo';
import NavMenu from '@/components/NavMenu';
import { Link } from 'react-router-dom';

function HeaderView() {
	return (
		<header className='bg-gray-800 py-5'>
			<div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
				<figure className='w-64'>
					<Link to={'/'}>
						<Logo />
					</Link>
				</figure>

				<NavMenu />
			</div>
		</header>
	);
}

export default HeaderView;
