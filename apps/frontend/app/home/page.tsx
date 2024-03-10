'use client';

import React from 'react';
import WorkFlows from '@/components/workflows';

export default function Page(): JSX.Element {
	return (
		<div className='rounded h-full flex-1 overflow-auto'>
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
				<WorkFlows />
			</section>
		</div>
	);
}
