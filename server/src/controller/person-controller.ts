import { isEmpty } from 'lodash';
import { createPerson, queryAll, queryOne, updateOne } from './helpers/persons';
import { PersonType } from '../types/data-model';

const createNewPerson = async (req, res, next) => {
  const { userId, name, interests, description } = <PersonType>req.body;

  try {
    const person = await createPerson({
      userId,
      name,
      interests,
      description,
    });

    res.status(200).send({
      success: true,
      data: person,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error:
        'There was an error creating a new person entry. Please try again later.',
    });
  }
};

const getAll = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const list = await queryAll(userId);

    res.status(200).send({
      success: true,
      data: list || [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: 'There was an error fetching your list. Please try again later.',
    });
  }
};

const getOne = async (req, res, next) => {
  const { personId } = req.params;

  try {
    const person = await queryOne(personId);

    res.status(200).send({
      success: true,
      data: person,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error:
        'There was an error fetching your individual query. Please try again later.',
    });
  }
};

const updatePerson = async (req, res, next) => {
  const { personId } = req.params;
  const body = req.body;

  if (isEmpty(body)) {
    res.status(400).status({
      error: 'No data received to update person entry',
    });
  }

  try {
    await updateOne(personId, body);

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: `There was an error updating a person entry with ID ${personId}`,
    });
  }
};

export default { createNewPerson, getAll, getOne, updatePerson };
