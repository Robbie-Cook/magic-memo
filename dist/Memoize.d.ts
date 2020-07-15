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
    static memo<A extends Array<any>, R = any>(expensiveFunction: (...args: A) => R, hashFunction?: ((...args: A) => string) | ((...args: A) => Promise<string>)): (...args: A) => Promise<R>;
}
