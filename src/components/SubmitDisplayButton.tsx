function SubmitDisplayButton({ label }: { label: string }) {
	return (
		<button
			type='submit'
			className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors duration-300 ease-in-out'
		>
			{label}
		</button>
	);
}

export default SubmitDisplayButton;
