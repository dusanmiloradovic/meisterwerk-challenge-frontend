import React from "react";
import { DatePicker, Input } from "antd";
import styled from "styled-components";
import { setEventsFilter } from "../../redux/events/actions";
import { setFilter } from "../../redux/events/events";
import { filterSelector } from "../../redux/events/selectors";
import { useSelector, useDispatch } from "react-redux";
import { EventFilter } from "../../interfaces/events";
import moment from "moment";

const { RangePicker } = DatePicker;

const FilterContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
`;

const ItemContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

export default function FilterComponent() {
  const dispatch = useDispatch();
  const eventsFilter: EventFilter = useSelector(filterSelector);
  const changeEventFilterForTextSearch = (value: string) => {
    const newEventsFilter: EventFilter = { ...eventsFilter };
    newEventsFilter.text = value;
    dispatch(setEventsFilter(newEventsFilter));
  };

  const changeRangeInFilter = (fromDate: Date, toDate: Date) => {
    const newEventsFilter: EventFilter = { ...eventsFilter };
    newEventsFilter.startTime = fromDate;
    newEventsFilter.endTime = toDate;
    dispatch(setFilter(newEventsFilter));
  };
  return (
    <FilterContainer>
      <ItemContainer>
        <Input
          placeholder="Search"
          onChange={(ev) => changeEventFilterForTextSearch(ev.target.value)}
        />
      </ItemContainer>
      <ItemContainer>
        <RangePicker
          onChange={(ev: [moment.Moment, moment.Moment] | null) =>
            changeRangeInFilter(
              ev ? ev[0].startOf("day").toDate() : null,
              ev ? ev[1].endOf("day").toDate() : null
            )
          }
        />
      </ItemContainer>
    </FilterContainer>
  );
}
