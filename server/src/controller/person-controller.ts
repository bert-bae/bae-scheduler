import { createPerson } from './helpers/persons';
import { PersonType } from '../types/data-model';

const createNewPerson = async (req, res, next) => {
  const { userId, name, interests, description } = <PersonType>req.body;

  if (!userId) {
    res.status(403).send({
      error: 'Login to proceed',
    });
    return;
  }

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

export default { createNewPerson };
