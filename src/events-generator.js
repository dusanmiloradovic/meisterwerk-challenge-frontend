const moment = require("moment");
const { faker } = require("@faker-js/faker");

const statuses = ["pending", "in-progress", "done"];

const events = [];

for (let i = 1; i < 1000; i++) {
  const momentStart = moment()
    .startOf("year")
    .add(
      faker.datatype.number({
        min: 0,
        max: 365,
      }),
      "days"
    )
    .add(
      faker.datatype.number({
        min: 0,
        max: 22,
      }),
      "hours"
    );

  events.push({
    id: i,
    title: faker.lorem.sentence(5),
    start_time: momentStart.toISOString(),
    end_time: momentStart
      .add(
        faker.datatype.number({
          min: 30,
          max: 180,
        }),
        "minutes"
      )
      .toISOString(),
    address: faker.address.streetAddress(),
    status: faker.random.arrayElement(statuses),
  });
}

console.dir(events, { maxArrayLength: null });
