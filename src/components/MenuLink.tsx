import { Link } from 'react-router-dom';

type LinkMenuDisplayProps = {
	label: string;
	link: string;
};

function MenuLink({ label, link }: LinkMenuDisplayProps) {
	return (
		<Link to={link} className='block p-2 hover:text-purple-950'>
			{label}
		</Link>
	);
}

export default MenuLink;
