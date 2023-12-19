export const tryParseJson = (s: string): Record<string, unknown> | null => {
  try {
    return JSON.parse(s);
  } catch (e) {
    return null;
  }
};

export const fromSnakeToCamel = (s: string): string => {
  return s.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', ''),
  );
};

export function softEval(string, escape: any) {
  if (!string) {
    return escape;
  }

  try {
    return eval(string);
  } catch (e) {
    return escape;
  }
}

export function fromArrayToObject<T>(
  array: T[],
  key: string,
): Record<string, T> {
  return array.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});
}
