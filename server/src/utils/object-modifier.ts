export const omitKeys = (data: object | void, omit: Array<string>): object => {
  const dataSet: object = data || {};
  omit.forEach((key) => {
    delete dataSet[key];
  });

  return dataSet;
};
