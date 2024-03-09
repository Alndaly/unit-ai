'use client';

import { useEffect, useState } from 'react';

const TabBar = () => {
	const [tabs, setTabs] = useState<any[]>([]);
	const getTabBars = async () => {
		const tabBars = await window.electronApi.windowManager.getMainWindowViews();
		setTabs(tabBars);
	};
	useEffect(() => {
		getTabBars();
	}, []);
	return (
		<div className='toolbar flex flex-row items-center ml-20 justify-between px-3'>
			<div className='flex flex-row'>
				{tabs.map((tab, index) => {
					return (
						<div
							key={index}
							className='cursor-pointer px-2 bg-black/20 rounded text-sm'
							onClick={(e) => {
								window.electronApi.windowManager.switchTab(tab.id);
							}}>
							{tab.title}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TabBar;
