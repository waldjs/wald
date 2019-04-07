export declare type PromiseAllFromObject<O extends Object> = Promise<{
    [K in keyof O]: O[K] extends Promise<infer Result> ? Result : O[K];
}>;
export declare const promiseAllObject: <P extends PromiseConstructor, PO extends Object>(PromiseConstructor: P, objectWithPromises: PO) => Promise<{ [K in keyof PO]: PO[K] extends Promise<infer Result> ? Result : PO[K]; }>;
//# sourceMappingURL=utils.d.ts.map