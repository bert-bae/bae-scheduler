// datetime, updatedAt, createdAt = use ISOString()

interface CreateUpdateDate {
  updatedAt?: string;
  createdAt?: string;
}

interface UserModel {
  userId: string;
  email: string;
  password: string;
  verified: boolean;
  firstName?: string;
  lastName?: string;
}

interface PersonModel {
  personId: string;
  userId: string;
  name: string;
  interests?: Array<string>;
  description?: string;
}

interface ReminderModel {
  datetime: string;
  description?: string;
}

interface EventModel {
  eventId: string;
  personId: string;
  title: string;
  datetime: string;
  category?: string;
  description?: string;
  reminders?: Array<ReminderModel> | null;
}

export type UserType = UserModel & CreateUpdateDate;
export type PersonType = PersonModel & CreateUpdateDate;
export type EventType = EventModel & CreateUpdateDate;
export type ReminderType = ReminderModel & CreateUpdateDate;
