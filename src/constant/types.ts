export type Event = {
  
  participate: number;
  adminPhoto: string;
  adminName: string;
  adminUid: any;
  eventImageURL: string;
  eventMapURL: string;
  eventDate: any;
  price: number;
  eventName: string;
  eventLocation:any;
  eventType:string;
  EventAdminName: string;
  EventAdminPhoto: string;
  EventAdminUid: string;
  EventDate: string;
  EventImage: string;
  EventLocation: string;
  EventMapURL: string;
  EventName: string;
  EventParticipate: number;
  EventPrice: string;
  EventType: string;
  id: any;
  imageURI:string;
  error:any
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


export type Eventslice = {
  eventName: string;
  price: string;
  eventDate: string;
  eventLocation: string;
  eventMapURL: string;
  imageURI: string;
  createdBy: {
    uid: any;
    adminPhoto: URL;
    adminName: string;
  };
}

export type CreateEventState = {
  event: Eventslice | null;
  loading: boolean;
  error: string | null;
}

export type  EventData ={
  id: string;
  EventName: string;
  EventPrice: number;
  EventDate: Date;
  EventLocation: string;
  EventMapURL: string;
  EventImage: string;
  EventAdminUid: string;
  EventAdminName: string;
  EventAdminPhoto: string;
  EventImageURL?: string; // Optional field for storing download URL
}
