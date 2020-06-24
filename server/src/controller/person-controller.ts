import { isEmpty } from 'lodash';
import { createPerson, queryAll, queryOne, updateOne } from './helpers/persons';
import { PersonType } from '../types/data-model';

const createNewPerson = async (req, res, next) => {
  const { name, interests, description } = <PersonType>req.body;
  const { userId } = req.user;

  try {
    const person = await createPerson({
      userId,
      name,
      interests,
      description,
    });

    res.status(200).json({
      success: true,
      data: person,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error:
        'There was an error creating a new person entry. Please try again later.',
    });
  }
};

const getAll = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const list = await queryAll(userId);

    res.status(200).json({
      success: true,
      data: list || [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'There was an error fetching your list. Please try again later.',
    });
  }
};

const getOne = async (req, res, next) => {
  const { personId } = req.params;
  const { userId } = req.user;

  try {
    const person = await queryOne(personId, userId);

    res.status(200).json({
      success: true,
      data: person,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error:
        'There was an error fetching your individual query. Please try again later.',
    });
  }
};

const updatePerson = async (req, res, next) => {
  const { personId } = req.params;
  const { userId } = req.user;
  const body = req.body;

  if (isEmpty(body)) {
    res.status(400).status({
      error: 'No data received to update person entry',
    });
  }

  try {
    await updateOne(personId, userId, body);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `There was an error updating a person entry with ID ${personId}`,
    });
  }
};

export default { createNewPerson, getAll, getOne, updatePerson };
