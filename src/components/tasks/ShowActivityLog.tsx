import { statusTranslations } from '@/locales/es';
import type { ActivityLog } from '@/types/index';

type ShowActivityLogProps = {
	activityLog: ActivityLog;
};

export default function ShowActivityLog({ activityLog }: ShowActivityLogProps) {
	const user = typeof activityLog.user === 'object' ? activityLog.user : null;

	return (
		<li className='text-sm text-slate-600'>
			{statusTranslations[activityLog.status]} cambiado por {user?.name}
		</li>
	);
}
