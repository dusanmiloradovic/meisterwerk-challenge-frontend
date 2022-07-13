import FullCalendar, { EventSourceInput } from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Event, EventStatus } from "../../interfaces/events";

type Props = {
  events: Event[] | undefined;
};

function getColorFromEventStatus(eventStatus: EventStatus): string {
  if (eventStatus === "in-progress") {
    return "red";
  }
  if (eventStatus === "pending") {
    return "blue";
  }
  if (eventStatus === "done") {
    return "grey";
  }
  return "white"; //should not happen
}

export default function Calendar({ events }: Props) {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    setCalendarEvents(
      events.map((event) => {
        return {
          id: event.id,
          title: event.title,
          start: event.startTime,
          end: event.endTime,
          color: getColorFromEventStatus(event.status),
        };
      })
    );
  }, [events]);

  return (
    <div>
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents as EventSourceInput}
      />
    </div>
  );
}
