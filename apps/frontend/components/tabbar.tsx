'use client';

import { useEffect, useState } from 'react';
import DeleteIcon from '@/assets/delete-icon';

const TabBar = () => {
	const [tabs, setTabs] = useState<any[]>([]);
	const getTabBars = async () => {
		const tabBars = await window.electronApi.windowManager.getMainWindowViews();
		console.log(tabBars)
		setTabs(tabBars);
	};
	useEffect(() => {
		getTabBars();
	}, []);
	return (
		<div className='toolbar flex flex-row items-center ml-20 justify-between px-3'>
			<div className='flex flex-row gap-5'>
				{tabs.map((tab, index) => {
					return (
						<div
							key={index}
							className='px-3 py-1 cursor-pointer px-2 bg-black/20 rounded text-sm flex flex-row gap-2 items-center'
							onClick={(e) => {
								window.electronApi.windowManager.switchTab(tab.id);
								e.stopPropagation();
							}}>
							<div>{tab.title}</div>
							<div
								onClick={(e) => {
									window.electronApi.windowManager.deleteTab(tab.id);
									e.stopPropagation();
								}}>
								<DeleteIcon />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TabBar;
