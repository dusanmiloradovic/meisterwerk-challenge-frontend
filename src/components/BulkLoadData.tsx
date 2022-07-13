import React from "react";
import { Button } from "antd";
import { Event } from "../interfaces/events";
import { fixJsonData } from "../redux/events/events";

//this is the component to load the json data into the database.When its loaded, remove the button from application

async function loadPartofData(dataPart: Event[]) {
  return await fetch("/bulk-load-events", {
    method: "POST",
    body: JSON.stringify(dataPart),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

const BATCH_SIZE = 50;

export default function BulkLoadData() {
  const loadData = async () => {
    const body = await fetch("events.json");
    const json: Event[] = fixJsonData(await body.json());

    const counterLen = json.length;
    let countIx = 0;
    let chunk: Event[] = [];
    for (let j = 0; j < counterLen; j++) {
      chunk.push(json[j]);
      if (countIx++ === BATCH_SIZE) {
        await loadPartofData(chunk);
        countIx = 0;
        chunk = [];
      }
    }
  };

  return (
    <Button type="primary" onClick={loadData}>
      Load Data to DB
    </Button>
  );
}
