export type PromiseAllFromObject<O extends Object> = Promise<
  { [K in keyof O]: O[K] extends Promise<infer Result> ? Result : O[K] }
>;
export const promiseAllObject = function<
  P extends PromiseConstructor,
  PO extends Object
>(PromiseConstructor: P, objectWithPromises: PO): PromiseAllFromObject<PO> {
  const promises: Promise<any>[] = [];
  const keys: any[] = [];

  for (const [key, value] of Object.entries(objectWithPromises)) {
    promises.push(value);
    keys.push(key);
  }

  return PromiseConstructor.all(promises).then(values => {
    let result: any = {};

    const valuesLength = values.length;
    for (var idx = 0; idx < valuesLength; idx++) {
      result[keys[idx]] = values[idx];
    }

    return result;
  });
};
