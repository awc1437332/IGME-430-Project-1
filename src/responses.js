const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);
const scheduleCard = fs.readFileSync(`${__dirname}/../client/Schedule-Card.js`);
const scheduleEvent = fs.readFileSync(`${__dirname}/../client/Schedule-Event.js`);

// Holds all the user objects.
const events = {};

// Respond Function
const respond = (request, response, content, status, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// HTML responses
const getIndex = (request, response) => {
  respond(request, response, index, 200, 'text/html');
};

const getStyle = (request, response) => {
  respond(request, response, style, 200, 'text/css');
};

const getScheduleCard = (request, response) => {
  respond(request, response, scheduleCard, 200, 'application/javascript');
};

const getScheduleEvent = (request, response) => {
  respond(request, response, scheduleEvent, 200, 'application/javascript');
};

// GET
const jsonGetData = (request, response, status, jsonObj) => {
  respond(request, response, JSON.stringify(jsonObj), status, 'application/json');
};

const jsonGetEvents = (request, response) => {
  const responseJSON = {
    events,
  };
  console.log(events);

  return jsonGetData(request, response, 200, responseJSON);
};

const notFoundGet = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  jsonGetData(request, response, 404, responseJSON);
};

// HEAD
const jsonHeadData = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const jsonHeadEvents = (request, response) => jsonHeadData(request, response, 200);

const notFoundHead = (request, response) => jsonHeadData(request, response, 404);

// Post

const jsonPostEvent = (request, response, body) => {
  // We assume that the user has not passed the correct parameters
  const responseObj = {
    message: 'Missing required params.',
  };

  // If this is true return out of the method with a bad request response
  if (!body.event || !body.date || !body.time) {
    responseObj.id = 'missingParams';
    return jsonGetData(request, response, 400, responseObj);
  }

  // If we get this far user has passed proper parameters in
  let status = 204;

  // If user does not exist, create a new one
  if (!events[body.event]) {
    status = 201;
    events[body.event] = {};
  }

  // assign data to the object
  events[body.event].event = body.event;
  events[body.event].date = body.date;
  events[body.event].time = body.time;

  // add a message if the user was just added
  if (status === 201) {
    responseObj.message = 'Created Successfully';
    return jsonGetData(request, response, status, responseObj);
  }

  console.log(events);
  console.log('reached end of post request, sending response...');
  return jsonHeadData(request, response, status);
};

module.exports = {
  getIndex,
  getStyle,
  getScheduleCard,
  getScheduleEvent,
  jsonGetEvents,
  jsonHeadEvents,
  notFoundGet,
  notFoundHead,
  jsonPostEvent,
};
