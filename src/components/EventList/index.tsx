import React from "react";
import { Event } from "../../interfaces/events";
import { List } from "antd";

type Props = {
  events?: Event[] | undefined;
};

function formatDate(date: Date): string {
  const _date = new Date(date);
  return _date.toLocaleString();
}

function descendingDateComparator(a: Event, b: Event): number {
  if (new Date(a.startTime) < new Date(b.startTime)) {
    return 1;
  }
  return -1;
}

export default function EventList({ events }: Props) {
  if (!events) {
    return <p>No events.</p>;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={events.sort(descendingDateComparator)}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={item.title}
            description={`${item.address} ${formatDate(
              item.startTime
            )} - ${formatDate(item.endTime)}`}
          ></List.Item.Meta>
        </List.Item>
      )}
    ></List>
  );
}
