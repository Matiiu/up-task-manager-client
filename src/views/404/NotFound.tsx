import { Link } from 'react-router-dom';

export default function NotFound({ message = '' }) {
	console.error('Error: ' + message);

	return (
		<>
			<h1 className='font-black text-center text-4xl text-white'>
				Pagina No Encontrada
			</h1>
			<p className='mt-10 text-center text-white'>
				{' '}
				Tal vez quieras volver a{' '}
				<Link to='/' className='text-fuchsia-500'>
					Proyectos
				</Link>
			</p>
		</>
	);
}