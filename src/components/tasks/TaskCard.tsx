import { Task } from '@/types/index';

type TaskCardProps = {
	task: Task;
};

function TaskCard({ task }: TaskCardProps) {
	console.log(task);
	return <div>TaskCard</div>;
}

export default TaskCard;
