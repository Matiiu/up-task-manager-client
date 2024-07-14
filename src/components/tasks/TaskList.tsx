import { Task } from '@/types/index';
import TaskCard from './TaskCard';

type TaskListProps = {
	tasks: Task[];
};

type GroupTask = {
	[key: string]: Task[];
};

const initialStatusGroup: GroupTask = {
	pending: [],
	onHold: [],
	inProgress: [],
	underReview: [],
	completed: [],
};

function groupTasks(tasks: Task[]) {
	return tasks.reduce((acc, task) => {
		let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
		currentGroup = [...currentGroup, task];
		return {
			...acc,
			[task.status]: currentGroup,
		};
	}, initialStatusGroup);
}

function TaskList({ tasks }: TaskListProps) {
	return (
		<>
			<h2 className='text-5xl font-black my-10'>Tareas</h2>

			<section className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
				{Object.entries(groupTasks(tasks)).map(([status, tasks]) => (
					<div
						key={status}
						className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'
					>
						<ul className='mt-5 space-y-5'>
							{tasks.length === 0 ? (
								<li className='text-gray-500 text-center pt-3'>
									No Hay tareas
								</li>
							) : (
								tasks.map((task) => (
									<TaskCard
										key={task._id}
										task={task}
									/>
								))
							)}
						</ul>
					</div>
				))}
			</section>
		</>
	);
}

export default TaskList;
