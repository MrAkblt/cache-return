export const cacheReturn = (cacheTTL: number) => (target: any, name: string, descriptor: any) => {
  const fn = descriptor.value;
	const cache: { [key:string]: { returnValue: any, cacheDate: number } } = {};
  descriptor.value = function (...args: any[]) {
		const key = JSON.stringify(args)
    console.log(cache)
    if(cache[key]) {
      console.log(cache[key].cacheDate, cacheTTL, Date.now());
    }
		if (cache[key] && cache[key].cacheDate + cacheTTL > Date.now()) {
      console.log("cacheden: ", cache[key].returnValue)
			return cache[key].returnValue;
		} else {
			const returnValue = fn.apply(this, args);
			cache[key] = {
				returnValue,
				cacheDate: Date.now(),
			}
      console.log("real: ", returnValue)
			return returnValue;
		}
  };
  return descriptor;
}
