import { isEmpty } from 'lodash';
import { getISODate } from './dates';

interface HashMap {
  [propName: string]: any;
}
interface UpdateInstructions {
  UpdateExpression: string;
  ExpressionAttributeValues: HashMap;
}

const __updateExpressionBuilder = (
  signature: string,
  data: HashMap
): string => {
  let result = [];
  for (const key in data) {
    if (result) {
      result.push(`${key}=${signature}${key}`);
    }
  }
  return `set ${result.join(', ')}`;
};

const __expressionAttributeBuilder = (
  signature: string,
  data: HashMap
): HashMap => {
  const result = {};
  for (const key in data) {
    result[`${signature}${key}`] = data[key];
  }
  return result;
};

export const updateInstructions = (
  signature: string,
  data: HashMap
): UpdateInstructions => {
  if (isEmpty(data) || !signature) {
    return null;
  }

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
