import { useEffect, useRef } from 'react';

function useTimeout(callback: Function, delay: number = 0) {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		let timer: number;

		if (delay && callback) {
			timer = setTimeout(callbackRef.current, delay);
		}

		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, [callback, delay]);
}

export default useTimeout;
