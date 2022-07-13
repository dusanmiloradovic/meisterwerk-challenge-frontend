export type EventStatus = "pending" | "in-progress" | "done";

export interface Event {
  id?: number;
  title?: string;
  startTime?: Date;
  endTime?: Date;
  address?: string;
  status?: EventStatus;
  pendingSave?: boolean; //is it saved to the database
}

export interface EventFilter {
  startTime?: Date;
  endTime?: Date;
  text?: string;
  status?: EventStatus[];
}
