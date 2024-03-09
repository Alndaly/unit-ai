'use client';

import React from 'react';

export default function Page(): JSX.Element {
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
	];
	const workFlows = [
		{
			name: 'WorkFlow1',
			images: [
				'https://oss.kinda.info/image/202402112217353.jpg',
				'https://oss.kinda.info/image/202402082229353.jpg',
			],
			createTime: '2023-04-01',
			updateTime: '2023-04-01',
		},
		{
			name: 'WorkFlow2',
			images: [
				'https://oss.kinda.info/image/202402082229353.jpg',
				'https://oss.kinda.info/image/202402112217353.jpg',
			],
			createTime: '2023-04-01',
			updateTime: '2023-04-01',
		},
	];
	const getData = async () => {
		fetch('http://localhost:4000/api').then(
			async (response) => await response.text().then((value) => alert(value))
		);
	};
	return (
		<main className='w-full h-full flex flex-row box-border p-3 gap-3'>
			<div className='rounded h-full w-1/4 flex flex-col'>
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
			<div className='rounded h-full flex-1'>
				<section className='mb-3 flex flex-col gap-3'>
					<h2 className='font-bold text-xl'>Try to create</h2>
					<div className='text-slate-600 text-sm'>
						Choose the method for creating your flow
					</div>
					<div className='flex flex-row gap-3'>
						<div className='p-3 rounded min-w-fit cursor-pointer'>
							<div>New WorkFlow</div>
							<div className='text-slate-600 text-sm'>Create from blank</div>
						</div>
						<div className='p-3 rounded min-w-fit cursor-pointer'>
							<div>Import</div>
							<div className='text-slate-600 text-sm'>Create from a image</div>
						</div>
					</div>
				</section>
				<section className='mb-3 flex flex-col gap-3'>
					<h2 className='font-bold text-xl'>My WorkFlow</h2>
					<div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3'>
						{workFlows.map((workFlow, index) => {
							return (
								<div
									key={index}
									className='flex flex-col rounded overflow-hidden hover:outline cursor-pointer'>
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
				</section>
			</div>
		</main>
	);
}
