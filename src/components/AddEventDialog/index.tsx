import React, { useState, useEffect, useRef } from "react";
import { Modal, DatePicker, Input, Radio, Button } from "antd";
import { Event } from "../../interfaces/events";
import styled from "styled-components";
import { addEvent } from "../../redux/events/events";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
  margin: 7px;
`;

type DialogProps = { open: boolean; close: () => void };
const { RangePicker } = DatePicker;

function ModalAddEventDialog({ open, close }: DialogProps) {
  const dispatch = useDispatch();
  let ref = useRef<Event>();
  useEffect(() => {
    ref.current = {};
  }, [open]);
  const handleOk = () => {
    console.log(ref.current);
    dispatch(addEvent(ref.current));
    close();
  };
  const changeRange = (fromDate: Date, toDate: Date) => {
    ref.current.startTime = fromDate;
    ref.current.endTime = toDate;
  };
  return open ? (
    <Modal
      title="Add New Event"
      visible={open}
      onOk={handleOk}
      onCancel={(_) => close()}
    >
      <>
        <Wrapper>
          <Input
            placeholder="Enter Event Title"
            onChange={(ev) => (ref.current.title = ev.target.value)}
          />
        </Wrapper>
        <Wrapper>
          <Input
            placeholder="Enter Event Address"
            onChange={(ev) => (ref.current.address = ev.target.value)}
          />
        </Wrapper>
        <Wrapper>
          <Radio.Group
            onChange={(ev) => (ref.current.status = ev.target.value)}
          >
            <Radio.Button value="in-progress">In Progress</Radio.Button>
            <Radio.Button value="pending">Pending</Radio.Button>
            <Radio.Button value="done">Done</Radio.Button>
          </Radio.Group>
        </Wrapper>
        <Wrapper>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            onChange={(ev: [moment.Moment, moment.Moment] | null) =>
              changeRange(
                ev ? ev[0].startOf("day").toDate() : null,
                ev ? ev[1].endOf("day").toDate() : null
              )
            }
          />
        </Wrapper>
      </>
    </Modal>
  ) : null;
}

export function AddEventDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Event
      </Button>
      <ModalAddEventDialog open={open} close={() => setOpen(false)} />
    </>
  );
}
