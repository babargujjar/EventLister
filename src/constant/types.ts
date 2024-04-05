export type Event = {
  EventAdminName: string;
  EventAdminPhoto: string;
  EventAdminUid: string;
  EventDate: string;
  EventImage: string;
  EventLocation: string;
  EventMapURL: string;
  EventName: string;
  EventParticipates: number;
  EventPrice: string;
  EventType: string;
  id: string;
};

export type ItemEvent = {
  item:Event
}

export type EventsArray = Event[];

export type CardProps = {
  param: Event;
};
export type CardProp = {
  route: { params: {param:Event}};
};

