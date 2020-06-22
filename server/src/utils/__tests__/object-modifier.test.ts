import { omitKeys, deepCopy } from '../object-modifier';

const originalData = {
  dataOne: 1,
  dataTwo: 2,
  dataThree: 3,
  dataFour: 4,
};

describe('Util object modifier', () => {
  describe('omitKeys', () => {
    it('Should correctly remove one key if [] of one valid key name is provided', () => {
      const newData = omitKeys(deepCopy(originalData), ['dataOne']);
      expect(newData.dataOne).toBe(undefined);
      expect(newData).toMatchObject({
        dataTwo: 2,
        dataThree: 3,
        dataFour: 4,
      });
    });

    it('Should correctly remove multiple keys if [] of more than one valid key name is provided', () => {
      const newData = omitKeys(deepCopy(originalData), ['dataOne', 'dataFour']);
      expect(newData.dataOne).toBe(undefined);
      expect(newData.dataFour).toBe(undefined);
      expect(newData).toMatchObject({
        dataTwo: 2,
        dataThree: 3,
      });
    });

    it('Should remove no keys if [] of key name is not in the original object provided', () => {
      const newData = omitKeys(deepCopy(originalData), ['notProvided']);
      expect(newData).toMatchObject(originalData);
    });
  });
});
