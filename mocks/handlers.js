import { rest } from 'msw';

export const handlers = [
  rest.get('/api/projects', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      {
        description: 'string',
        id: 'abc',
        lat: 59.987868,
        lng: 30.371842,
        name: 'string',
        subscribed: true,
      },
    ]),
  )),
  rest.get('/api/projects/:projectId', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      description: 'Project description',
      id: req.params.projectId,
      lat: 59.987868,
      lng: 30.371842,
      name: 'Project name',
      subscribed: true,
    }),
  )),
  rest.get('/api/projects/:projectId/activities', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      {
        description: 'Activity description',
        endDate: '2021-05-25T20:25:47.389Z',
        id: 0,
        name: 'Activity name',
        participate: true,
        startDate: '2021-05-25T20:25:47.389Z',
      },
      {
        description: 'Activity description',
        endDate: '2021-05-25T20:25:47.389Z',
        id: 1,
        name: 'Activity name',
        participate: true,
        startDate: '2021-05-25T20:25:47.389Z',
      },
      {
        description: 'Activity description',
        endDate: '2021-05-25T20:25:47.389Z',
        id: 2,
        name: 'Activity name',
        participate: true,
        startDate: '2021-05-25T20:25:47.389Z',
      },
    ]),
  )),
  rest.get('/api/projects/:projectId/activities/:activityId', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      description: 'Activity description',
      endDate: '2021-05-25T20:25:47.389Z',
      id: req.params.projectId,
      name: 'Activity name',
      participate: true,
      startDate: '2021-05-25T20:25:47.389Z',
    }),
  )),
  rest.get('/api/projects/:projectId/activities/:activityId/items', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      {
        activityId: req.params.activityId,
        id: 0,
        name: 'Activity Item name',
        status: 'RED',
      },
      {
        activityId: req.params.activityId,
        id: 0,
        name: 'Activity Item name',
        status: 'GREED',
      },
      {
        activityId: req.params.activityId,
        id: 0,
        name: 'Activity Item name',
        status: 'YELLOW',
      },
    ]),
  )),
];

export default handlers;
