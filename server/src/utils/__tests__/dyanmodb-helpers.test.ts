import { updateInstructions } from '../dyanmodb-helper';

describe('UpdateInstructions generator for DynamoDB', () => {
  describe('valid input', () => {
    const signature = '$';
    const updateData = {
      firstName: 'Gollum',
      lastName: 'Smeagol',
      verified: true,
    };

    const expressions = updateInstructions(signature, updateData);

    it('should have UpdateExpression match the expected string value', () => {
      const expectedUpdateExpression =
        'set firstName=$firstName, lastName=$lastName, verified=$verified, updatedAt=$updatedAt';
      expect(expressions.UpdateExpression).toBe(expectedUpdateExpression);
    });

    it('should have ExpressionAttributeValues match expected object value', () => {
      const expectedExpAttrValues = {
        $firstName: 'Gollum',
        $lastName: 'Smeagol',
        $verified: true,
      };
      expect(expressions.ExpressionAttributeValues).toMatchObject(
        expectedExpAttrValues
      );
    });
  });

  describe('invalid input', () => {
    it('should return null if signature is an empty string', () => {
      const expressions = updateInstructions('', {
        someData: 1,
      });
      expect(expressions).toBe(null);
    });

    it('should return null if data is an empty object', () => {
      const expressions = updateInstructions('$', {});
      expect(expressions).toBe(null);
    });
  });
});
