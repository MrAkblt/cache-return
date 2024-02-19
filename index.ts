export const cacheReturn = ({ cacheTTL }: { cacheTTL: number}) => (target: any, name: string, descriptor: any) => {
  const fn = descriptor.value;
  const cache: { [key:string]: { returnValue: any, cacheDate: number } } = {};
  // This interval is only for the memory leak, not related logic
	setInterval(() => {
		for (const key in cache) {
			if(cache[key].cacheDate + cacheTTL < Date.now()) {
				delete cache[key];
			}
		}
	}, 300000)
  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args)
    if (cache[key] && cache[key].cacheDate + cacheTTL > Date.now()) {
      return cache[key].returnValue;
    } else {
      const returnValue = fn.apply(this, args);
      cache[key] = {
	      returnValue,
	      cacheDate: Date.now(),
      }
      return returnValue;
    }
  };
  return descriptor;
}
