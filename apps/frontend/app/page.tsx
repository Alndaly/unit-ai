'use client';

import React from "react";

export default function Page(): JSX.Element {
	const getData = async () => {
		fetch('http://localhost:4000/api').then(
			async (response) => await response.text().then((value) => alert(value))
		);
	};
	return (
		<main className="w-full flex justify-center items-center h-screen">
			<button onClick={getData}>Click me!</button>
		</main>
	);
}
