export const omitKeys = (
  data: object | void,
  omit: Array<string>
): { [propNames: string]: any } => {
  const dataSet: object = data || {};
  omit.forEach((key) => {
    delete dataSet[key];
  });

  return dataSet;
};

export const pickKeys = (data: object | void, pick: Array<string>): object => {
  if (!data) {
    return {};
  }

  const dataSet: object = {};
  pick.forEach((key) => {
    dataSet[key] = data[key];
  });

  return dataSet;
};

export const deepCopy = (data: object): object => {
  return JSON.parse(JSON.stringify(data));
};
