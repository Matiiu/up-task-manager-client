import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import TeamAPI from '@/api/TeamAPI';
import type { TeamMember } from '@/types/teamTypes';

type ShowMemberProps = {
	member: TeamMember;
};

export default function ShowMember({ member }: ShowMemberProps) {
	const params = useParams();
	const projectId = params?.projectId ?? '';
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: TeamAPI.removeMemberFromProject,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['team', projectId] });
			toast.success(data);
		},
	});

	const handleRemoveMember = () => {
		mutate({ userId: member._id, projectId });
	};

	return (
		<li className='flex justify-between gap-x-6 px-5 py-10'>
			<div className='flex min-w-0 gap-x-4'>
				<div className='min-w-0 flex-auto space-y-2'>
					<p className='text-2xl font-black text-gray-600'>{member.name}</p>
					<p className='text-sm text-gray-400'>{member.email}</p>
				</div>
			</div>
			<div className='flex shrink-0 items-center gap-x-6'>
				<Menu as='div' className='relative flex-none'>
					<Menu.Button className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900'>
						<span className='sr-only'>opciones</span>
						<EllipsisVerticalIcon className='h-9 w-9' aria-hidden='true' />
					</Menu.Button>
					<Transition
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
							<Menu.Item>
								<button
									type='button'
									className='block px-3 py-1 text-sm leading-6 text-red-500'
									onClick={handleRemoveMember}
								>
									Eliminar del Proyecto
								</button>
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</li>
	);
}
