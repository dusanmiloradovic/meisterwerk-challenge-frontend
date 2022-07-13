import React from "react";
import { Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ViewMode } from "../../interfaces/pageviews";
import { pageviewSelector } from "../../redux/pageview/selectors";
import { setPageViewOption } from "../../redux/pageview/actions";

export default function ViewSwitch() {
  const dispatch = useDispatch();
  const viewmode: ViewMode = useSelector(pageviewSelector);
  return (
    <Radio.Group
      value={viewmode}
      onChange={(ev) => dispatch(setPageViewOption(ev.target.value))}
    >
      <Radio.Button value="calendar">Calendar View</Radio.Button>
      <Radio.Button value="list">List View</Radio.Button>
    </Radio.Group>
  );
}
