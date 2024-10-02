import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AddMemberModal from '@/components/team/AddMember';
import TeamAPI from '@/api/TeamAPI';
import ShowMember from '@/components/team/ShowMember';

export default function ShowTeamView() {
	const navigate = useNavigate();
	const params = useParams();
	const projectId = params?.projectId ?? '';

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['team', projectId],
		queryFn: () => TeamAPI.getTeam(projectId),
		retry: 1,
	});

	if (isLoading) return <p>Cargando...</p>;

	if (isError) return <p>Error: {error.message}</p>;

	if (data) {
		return (
			<>
				<h1 className='text-5xl font-black'>Administrar Equipo</h1>
				<p className='text-2xl font-light text-gray-500 mt-5'>
					Administra el equipo de trabajo para este proyecto
				</p>

				<nav className='my-5 flex gap-3'>
					<button
						className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
						onClick={() => navigate(`?addMember=true`)}
					>
						Agregar Colaborador
					</button>

					<Link
						to={`/projects/${projectId}`}
						className='bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
					>
						Volver al Proyecto
					</Link>
				</nav>

				<h2 className='text-5xl font-black my-10'>Miembros actuales</h2>
				{data.length ? (
					<ul
						role='list'
						className='divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg'
					>
						{data?.map((member) => (
							<ShowMember key={member._id} member={member} />
						))}
					</ul>
				) : (
					<p className='text-center py-20'>No hay miembros en este equipo</p>
				)}

				<AddMemberModal />
			</>
		);
	}
}
