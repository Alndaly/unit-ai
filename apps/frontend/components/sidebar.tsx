const SideBar = () => {
	const menus = [
		{
			label: 'WorkFlows',
		},
		{
			label: 'Explore',
		},
		{
			label: 'Settings',
		},
		{
			label: 'About',
		},
	];
	return (
		<div className='rounded h-full flex flex-col overflow-auto'>
			<h1 className='font-bold text-4xl p-5 flex justify-center items-center'>
				Unit AI
			</h1>
			<div className='p-5 flex flex-col flex-1 overflow-auto gap-3'>
				{menus.map((menu, index) => {
					return (
						<div
							key={index}
							className='font-bold text-xl p-3 flex items-center rounded cursor-pointer'>
							{menu.label}
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default SideBar;
