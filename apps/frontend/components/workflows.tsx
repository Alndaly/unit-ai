import { useViewStore } from '@/store/view';

interface View {
	title: string;
	id: string;
	query?: string;
}

const WorkFlows = () => {
	const { addView } = useViewStore();
	const workFlows = [
		{
			id: 'dasd',
			name: 'WorkFlow1',
			images: [
				'https://oss.kinda.info/image/202402112217353.jpg',
				'https://oss.kinda.info/image/202402082229353.jpg',
			],
			createTime: '2023-04-01',
			updateTime: '2023-04-01',
		},
		{
			id: 'dasddas',
			name: 'WorkFlow2',
			images: [
				'https://oss.kinda.info/image/202402082229353.jpg',
				'https://oss.kinda.info/image/202402112217353.jpg',
			],
			createTime: '2023-04-01',
			updateTime: '2023-04-01',
		},
	];
	return (
		<div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3'>
			{workFlows.map((workFlow, index) => {
				return (
					<div
						onClick={() => {
							addView({
								title: workFlow.name,
								path: `/workflow`,
								query: {
									id: workFlow.id,
								},
							});
						}}
						key={index}
						className='flex flex-col rounded overflow-hidden hover:border cursor-pointer'>
						<img
							className='w-full aspect-video object-cover'
							src={workFlow.images[0]}
							alt={workFlow.name}
						/>
						<div className='p-3'>
							<p>{workFlow.name}</p>
							<p className='text-slate-600 text-sm'>
								Create on {workFlow.createTime}
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default WorkFlows;
