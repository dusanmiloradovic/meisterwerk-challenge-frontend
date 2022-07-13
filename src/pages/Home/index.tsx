import React, { useEffect } from "react";
import {
  CalendarContainer,
  EventListContainer,
  HomeContainer,
  HeaderContainer,
} from "./styles";
import EventList from "../../components/EventList";
import Calendar from "../../components/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { filteredEventsSelector } from "../../redux/events/selectors";
import { pageviewSelector } from "../../redux/pageview/selectors";
import { ViewMode } from "../../interfaces/pageviews";
import { getEvents } from "../../redux/events/events";
import ViewSwitch from "../../components/ViewSwitch";
import "antd/dist/antd.css";
import FilterComponent from "../../components/FilterComponent";
import { AddEventDialog } from "../../components/AddEventDialog";

export interface Props {}

export function HomePage(props: Props) {
  const events = useSelector(filteredEventsSelector);
  const viewmode: ViewMode = useSelector(pageviewSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  if (!events) {
    return <p>Loading...</p>;
  }

  return (
    <HomeContainer>
      <HeaderContainer>
        <ViewSwitch />
        <FilterComponent />
        <AddEventDialog />
      </HeaderContainer>

      {viewmode === "list" ? (
        <EventListContainer>
          <EventList events={events} />
        </EventListContainer>
      ) : (
        <CalendarContainer>
          <Calendar events={events} />
        </CalendarContainer>
      )}
    </HomeContainer>
  );
}
