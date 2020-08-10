export interface IGeneratedEvent {
  category: string;
  datetime: string;
  id?: string;
  title?: string;
  description?: string;
}

export interface IMapGeneratedEvent {
  [propName: string]: IGeneratedEvent;
}
