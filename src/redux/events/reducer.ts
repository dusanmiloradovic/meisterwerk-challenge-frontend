import * as actions from "./actions";
import { Event, EventFilter } from "../../interfaces/events";

export interface EventsState {
  events: Event[];
  currentEvent?: Event;
  isLoading: boolean;
  error: undefined;
  eventsFilter?: EventFilter;
}

const initialState: EventsState = {
  events: [],
  isLoading: false,
  error: undefined,
};

const reducer = (state = initialState, action: actions.EventsAction<any>) => {
  switch (action.type) {
    case actions.GET_EVENTS_REQUESTED:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case actions.GET_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: action.payload,
        error: null,
      };
    case actions.GET_EVENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actions.SET_CURRENT_EVENT: {
      return {
        ...state,
        currentEvent: action.payload,
      };
    }
    case actions.ADD_EVENT: {
      const newEvent: Event = action.payload;
      newEvent.pendingSave = true;
      return {
        ...state,
        events: [...state.events, newEvent],
        currentEvent: newEvent,
      };
    }
    case actions.POST_EVENTS_CHANGES_REQUESTED:
      return { ...state, isLoading: true };
    case actions.POST_EVENTS_CHANGES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case actions.POST_EVENTS_CHANGES_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case actions.SET_EVENTS_FILTER:
      return { ...state, eventsFilter: action.payload };
    default:
      return state;
  }
};

export default reducer;
