import { Link } from 'react-router-dom';

export default function MenuLink({ label = '', link = '' }) {
	return (
		<Link to={link} className='block p-2 hover:text-purple-950'>
			{label}
		</Link>
	);
}
