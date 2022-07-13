import {
  getEventsFailure,
  getEventsRequest,
  getEventsSuccess,
  setEventsFilter,
} from "./actions";
import { EventFilter, Event } from "../../interfaces/events";
import { EventsState } from "./reducer";
import { message } from "antd";

export const getEvents = () => {
  return async (dispatch) => {
    try {
      dispatch(getEventsRequest());
      const json = await getAllEvents();
      return dispatch(getEventsSuccess(json));
    } catch (e) {
      dispatch(getEventsFailure(e));
    }
  };
};

export const getAllEvents = async (): Promise<Event[]> => {
  //because of the limitiation of fetching large number of records from SQLite (very bad performance)
  //by default this returns only the july records
  //getFilteredEvents doesn't have this limitation
  const result = await fetch("/all-events");
  //  return fixJsonData(await result.json());
  return await result.json();
};

function getStartTime(startTime?: Date): Date {
  return startTime ?? new Date(1970, 1, 1);
}

function getEndTime(endTime?: Date): Date {
  return endTime ?? new Date(2100, 12, 31);
}

export function fixJsonData(data: any[]): Event[] {
  //this will not be used when the API is called, remove
  return data.map((d) => {
    const e: Event = d;
    e.startTime = new Date(d.start_time);
    e.endTime = new Date(d.end_time);
    return e;
  });
}

export const getFilteredEvents = async (
  startTime: Date,
  endTime: Date
): Promise<Event[]> => {
  //TODO use the API, this will call dedicated API with filtering
  const _startTime = getStartTime(startTime);
  const _endTime = getEndTime(endTime);
  const result = await fetch(
    `/get-events/${_startTime.toISOString()}/${_endTime.toISOString()}`
  );

  return await result.json();
};

export const setFilter = (_eventsFilter: EventFilter) => {
  return async (dispatch, getState) => {
    const state: EventsState = getState().events;
    const { eventsFilter } = state;
    if (
      eventsFilter &&
      (!_eventsFilter || (!_eventsFilter.startTime && !_eventsFilter.endTime))
    ) {
      dispatch(getEvents());
    } else {
      if (
        (!eventsFilter &&
          (!_eventsFilter.startTime || _eventsFilter.endTime)) ||
        getStartTime(eventsFilter.startTime) !==
          getStartTime(_eventsFilter.startTime) ||
        getEndTime(eventsFilter.endTime) !== getEndTime(_eventsFilter.endTime)
      ) {
        try {
          dispatch(getEventsRequest());
          const events = await getFilteredEvents(
            getStartTime(_eventsFilter.startTime),
            getEndTime(_eventsFilter.endTime)
          );
          dispatch(getEventsSuccess(events));
        } catch (e) {
          dispatch(getEventsFailure(e));
        }
      }
    }
    return dispatch(setEventsFilter(_eventsFilter));
  };
};

export const addEvent = (event: Event) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch("add-event", {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (!response.ok) {
        message.error(response.text());
        return;
      } else {
        message.info("Event added");
      }
    } catch (e) {
      //becuase of the time limitation, directly reporting error from here, not with reducers
      message.error("Network error");
      return;
    }
    const state: EventsState = getState().events;
    const { eventsFilter } = state;
    if (!eventsFilter || (!eventsFilter.startTime && !eventsFilter.endTime)) {
      return dispatch(getEvents());
    }
    try {
      dispatch(getEventsRequest());
      const events = await getFilteredEvents(
        getStartTime(eventsFilter.startTime),
        getEndTime(eventsFilter.endTime)
      );
      dispatch(getEventsSuccess(events));
    } catch (e) {
      dispatch(getEventsFailure(e));
    }
  };
};
