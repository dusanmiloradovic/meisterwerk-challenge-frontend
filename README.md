# Frontend Code Challenge

Welcome Candidate!

The purpose of this challenge is primarily to demonstrate your ability to understand requirements and build a sample frontend application using React, Redux, Styled Components and (optionally) Typescript.

In this code challenge, we would like you to build a simple frontend application presenting Events. This events are objects that have the following data:

- `title`: text              
- `start_time`: timestamp
- `end_time`: timestamp
- `address`: text
- `status`: text / enum (pending, in progress, done)

__The source of this events is provided in the file located at `public/events.json`.__

You should be able to create an event CRUD and display them in two different ways: A list view and a Calendar view using any calendar/scheduling library.

We have prepared a boilerplate code that includes basic create react app, redux integration, styled components and sample calendar library. It's your choice to either use the boilerpate code provided, or just build it from scratch. Also, feel free to add/replace/remove any library you want.

The Candidate **MUST** submit their solution into a git repository (github, gitlab, etc), and invite the reviewers as contributors. 

Once the challange is done, we would like you to prepare a short demo (10 to 15 minutes) and then we will be asking some questions related to technical decisions you have made in your solution, and about how you structured your code and files (other 10 to 15 minutes).

This challenge is designed to take about 3 hours, there's no need to complete all the bonus requirements but feel free to spend more time if you find it interesting. Pick the ones you find most important, and try to have a complete solution for us that works.

## Minimum Requirements
- Create a react 16+ app
- Use redux 
- Use style components
- Use any scheduler library like (https://fullcalendar.io/docs)
- Implement calendar schedule view
- Read the data of events from ( use the provided file events.json) Or use API in case you implement backend (full stack challenge)
- Remember to use loading states if the file takes longer to load
- Implement event Creation
- Implement event Update
- Implement event Delete

## Bonus Requirements
- Use typescript 
- Add an input text to filter events by keyword 
- Confirm modal before removing an event 
- Persist in browser cache (or localstorage) the changes made during session 
create a simple hardcoded login page and secure the calendar
- Use any UI library from your choice: Chakra UI, Material Design, Ant Design, etc.
- Change the color of the event based on the status


Best of luck!
