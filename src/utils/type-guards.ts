export const isDefined = <T>(p: T): p is Exclude<T, undefined> =>
  p !== undefined;
export const isNotNil = <T>(p: T): p is Exclude<T, undefined | null> =>
  p !== undefined && p !== null;
export const isTruthy = <T>(
  p: T,
): p is Exclude<T, undefined | null | 0 | false | ''> => Boolean(p);
