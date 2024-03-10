'use client';

import { useEffect } from 'react';
import DeleteIcon from '@/assets/delete-icon';
import { useViewStore } from '@/store/view';
import cls from 'classnames';

const TabBar = () => {
	const { closeView, switchView, onInit, active, views } = useViewStore();
	useEffect(() => {
		onInit();
	}, []);
	return (
		<div className='ml-20 toolbar flex flex-row items-center justify-between px-3'>
			<div className='flex flex-row gap-2'>
				{views &&
					views.map((view, index) => {
						return (
							<div
								key={index}
								className={cls(
									{ outline: active === view.id },
									'px-3',
									'cursor-pointer',
									'px-2',
									'rounded',
									'text-sm',
									'flex',
									'flex-row',
									'gap-2',
									'items-center'
								)}
								onClick={(e) => {
									switchView(view.id);
									e.stopPropagation();
								}}>
								<div>{view.title}</div>
								{view.title !== 'home' && (
									<div
										onClick={(e) => {
											closeView(view.id);
											e.stopPropagation();
										}}>
										<DeleteIcon />
									</div>
								)}
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default TabBar;
