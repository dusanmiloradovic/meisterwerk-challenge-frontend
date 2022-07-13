import { Event, EventFilter } from "../../interfaces/events";

export const GET_EVENTS_REQUESTED = "events/GET_EVENTS_REQUESTED";
export const GET_EVENTS_SUCCESS = "events/GET_EVENTS_SUCCESS";
export const GET_EVENTS_FAILURE = "events/GET_EVENTS_FAILURE";

export const ADD_EVENT = "events/ADD_EVENT";
export const DELETE_EVENT = "events/DELETE_EVENT";
//both add and delete affect only local state

export const POST_EVENTS_CHANGES_REQUESTED =
  "events/POST_EVENT_CHANGES_REQUESTED";
export const POST_EVENTS_CHANGES_SUCCESS = "events/POST_EVENT_CHANGES_SUCCESS";
export const POST_EVENTS_CHANGES_FAILURE = "events/POST_EVENT_CHANGES_FAILURE";
export const SET_CURRENT_EVENT = "events/SET_CURRENT_EVENT";

export const SET_EVENTS_FILTER = "events/SET_EVENTS_FILTER";

export interface EventsAction<T> {
  type: string;
  payload?: T;
}

export const getEventsRequest = (): EventsAction<null> => ({
  type: GET_EVENTS_REQUESTED,
});

export const getEventsSuccess = (data: Event[]): EventsAction<Event[]> => ({
  type: GET_EVENTS_SUCCESS,
  payload: data,
});

export const getEventsFailure = (error: string): EventsAction<string> => {
  return {
    type: GET_EVENTS_FAILURE,
    payload: error,
  };
};

export const addNewEvent = (event: Event): EventsAction<Event> => {
  return {
    type: ADD_EVENT,
    payload: event,
  };
};

export const deleteEvent = (event: Event): EventsAction<Event> => {
  return {
    type: DELETE_EVENT,
    payload: event,
  };
};

export const sendPendingEventsRequest = (): EventsAction<null> => {
  return {
    type: POST_EVENTS_CHANGES_REQUESTED,
  };
};

export const sendPendingEventsResponse = (): EventsAction<null> => {
  return {
    type: POST_EVENTS_CHANGES_SUCCESS,
  };
};

export const setPendingEventsFailure = (): EventsAction<null> => {
  return {
    type: POST_EVENTS_CHANGES_FAILURE,
  };
};

export const setEventsFilter = (
  eventsFilter: EventFilter | null
): EventsAction<EventFilter | null> => {
  return {
    type: SET_EVENTS_FILTER,
    payload: eventsFilter,
  };
};
