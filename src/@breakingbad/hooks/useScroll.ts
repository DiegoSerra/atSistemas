import { MutableRefObject, useEffect } from 'react';

function useScroll(component: MutableRefObject<HTMLElement | null>, customClassName?: string) {

	const sticky = () => {
		if (component?.current) {
			const { classList, offsetTop } = component.current;
			if (window.pageYOffset > offsetTop) {
				classList.add('fixed')
				customClassName && classList.add(customClassName)
			} else {
				classList.remove('fixed');
				customClassName && classList.remove(customClassName);
			}
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', sticky);

		return () => {
			window.removeEventListener('scroll', sticky);
		};
	});
}

export default useScroll;
