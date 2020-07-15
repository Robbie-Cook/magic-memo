/**
 * A default hash function to use for memoization.
 *
 * @param args The arguments which would be passed to the expensive function
 *
 * @returns A hash of the function inputs
 */
const defaultHashFunction = (...args: any[]): string => {

  let hash = '';
  args.forEach((arg) => {
    hash = `${hash}-${JSON.stringify(arg)}`;
  });

  return hash;
};

export default class Memoize {
  /**
   * A function to memoize another function.
   * Inspiration taken from underscore.js.
   *
   * Careful: returns an awaitable
   *
   * @param expensiveFunction The function to memoize
   * @param hashFunction A hash function to use i.e. the key of the result.
   * If none is provided, a default is used.
   *
   * @returns The result of the expensive function, or the cached result of the expensive function
   */
  static memo<A extends Array<any>, R = any>(
    expensiveFunction: (...args: A) => R,
    hashFunction?: ((...args: A) => string) | ((...args: A) => Promise<string>)
  ): (...args: A) => Promise<R> {
    // 'Casts' expensive function as async
    const asyncifyExpensiveFunction = async (...myArgs: A) => {
      const returnValue = await expensiveFunction(...myArgs);
      return returnValue;
    };

    const memoized = async (...args: A): Promise<R> => {
      const hash = await memoized.hashFunction(...args);
      if (memoized.cache.get(hash)) {
        return memoized.cache.get(hash);
      } else {
        // purposefully doesn't await async function
        memoized.cache.set(hash, asyncifyExpensiveFunction(...args));
        return memoized.cache.get(hash);
      }
    };
    memoized.cache = new Cache();
    memoized.hashFunction = hashFunction ? hashFunction : defaultHashFunction;

    return memoized;
  }
}

/**
 * A simple object cache.
 */
class Cache {
  private _cache: Record<string, any> = {};

  set(key: string, item: any): void {
    this._cache[key] = item;
  }

  get(key: string): any {
    return this._cache[key];
  }
}
