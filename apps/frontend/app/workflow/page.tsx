'use client';

import React, { useCallback, useEffect } from 'react';
import { useSystemStore } from '@/store/system';
import ReactFlow, {
	MiniMap,
	Controls,
	Background,
	useNodesState,
	useEdgesState,
	addEdge,
	BackgroundVariant,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
	{ id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
	{ id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
	const { tabBarHeight, onInit } = useSystemStore();
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback(
		(params: any) => setEdges((eds) => addEdge(params, eds)),
		[setEdges]
	);

	const onGetViewQuery = async () => {
		const a = await window.electronApi.windowManager.getViewQuery();
		console.log(a);
	};

	useEffect(() => {
		onInit();
		onGetViewQuery();
	}, []);

	return (
		<div
			style={{
				height: `calc( 100vh - ${tabBarHeight}px )`,
			}}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}>
				<Controls />
				<MiniMap />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}
