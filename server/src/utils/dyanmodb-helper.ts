import { getISODate } from './dates';

const __updateExpressionBuilder = (signature: string, data: object): string => {
  let result = '';
  for (const key in data) {
    result += `${key}=${signature}${key}, `;
  }
  return `set ${result}`;
};

const __expressionAttributeBuilder = (
  signature: string,
  data: object
): object => {
  const result = {};
  for (const key in data) {
    result[`${signature}${key}`] = data[key];
  }
  return result;
};

export const updateInstructions = (
  signature: string,
  data: object
): {
  UpdateExpression: string;
  ExpressionAttributeValues: { [propNames: string]: any };
} => {
  const updateData = {
    ...data,
    updatedAt: getISODate(),
  };
  return {
    UpdateExpression: __updateExpressionBuilder(signature, updateData),
    ExpressionAttributeValues: __expressionAttributeBuilder(
      signature,
      updateData
    ),
  };
};

console.log(
  updateInstructions(':', {
    name: 'Elbert',
    interests: ['snowboard', 'climbing', 'beer'],
  })
);
