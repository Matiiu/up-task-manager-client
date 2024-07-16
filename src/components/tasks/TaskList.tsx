import { Task } from '@/types/index';
import TaskCard from './TaskCard';
import { statusTranslation, statusStyle } from '@/utils/index';

type TaskListProps = {
	tasks: Task[];
};

type GroupTask = {
	[key: string]: Task[];
};

const initialStateGroup: GroupTask = {
	pending: [],
	onHold: [],
	inProgress: [],
	underReview: [],
	completed: [],
};

function groupTasks(tasks: Task[]) {
	function validateGroup(accumulatedTasks: GroupTask, currentTask: Task) {
		let currentGroup = accumulatedTasks[currentTask.status]
			? [...accumulatedTasks[currentTask.status]]
			: [];
		currentGroup = [...currentGroup, currentTask];
		return {
			...accumulatedTasks,
			[currentTask.status]: currentGroup,
		};
	}

	return tasks.reduce(validateGroup, initialStateGroup);
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
						<h3
							className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyle[status]}`}
						>
							{statusTranslation[status]}
						</h3>
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
