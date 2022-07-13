import { Event } from "../../interfaces/events";
import { createSelector } from "reselect";

export const baseSelector = ({ events }) => events;

export const eventsSelector = createSelector(
  baseSelector,
  ({ events }) => events
);

export const getPendingEvents = ({ events }): Event[] => {
  const _events: Event[] = events;
  return _events.filter(({ pendingSave }) => pendingSave);
};

export const pendingEventsSelector = createSelector(
  baseSelector,
  getPendingEvents
);

export const filteredEvents = ({ events, eventsFilter }): Event[] => {
  if (!eventsFilter) {
    return events;
  }
  let filteredEvents: Event[] = events;
  if (eventsFilter.text) {
    filteredEvents = filteredEvents.filter((e) => {
      return (
        e.title?.toLowerCase().indexOf(eventsFilter.text.toLowerCase()) !==
          -1 ||
        e.address?.toLowerCase().indexOf(eventsFilter.text.toLowerCase()) !== -1
      );
    });
  }
  if (eventsFilter.status && eventsFilter.status.length !== 0) {
    //filter by one or multiple statuses
    filteredEvents = filteredEvents.filter((e) => {
      return eventsFilter.status.indexOf(e.status) !== -1;
    });
  }
  return filteredEvents;
};

export const filteredEventsSelector = createSelector(
  baseSelector,
  filteredEvents
);

export const filterSelector = createSelector(
  baseSelector,
  ({ eventsFilter }) => eventsFilter ?? {}
);
