import { useEffect } from 'react';

type UseInfiniteScrollProps = {
  root?: Element | null;
  target: Element | null;
  handleIntersect: IntersectionObserverCallback;
  threshold?: number;
  rootMargin?: string;
};

function useInfiniteScroll({
  root = null,
  target,
  handleIntersect,
  threshold = 1.0,
  rootMargin = '0px',
}: UseInfiniteScrollProps): void {
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold,
    });
    if (!target) {
      return;
    }
    observer.observe(target);
    // eslint-disable-next-line consistent-return
    return () => {
      observer.unobserve(target);
    };
  }, [target, root, rootMargin, handleIntersect, threshold]);
}
export default useInfiniteScroll;
