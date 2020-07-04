// import request from 'request';

export default function (req, res) {
  // const options = {
  //   method: 'GET',
  //   url: `${process.env.NEXT_PUBLIC_API_PATH}/projects/${req.query.projectId}`,
  // };

  // request(options).pipe(res);
  setTimeout(() => res.send({
    id: 1,
    name: 'Project name',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    lat: 59.984943,
    lng: 30.343946,
    isSubscribed: false,
    imageUrl: 'https://sun9-46.userapi.com/q2BA_ilv28LqPHr-ogC11vRhC0vgwJHXfI4YDA/OsPkwLZ2ZlQ.jpg',
    activities: [
      {
        endTime: '2020-06-13T12:00:00Z',
        id: 0,
        isSubscribed: false,
        lat: 55.173693,
        lng: 61.392991,
        name: 'Активность 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        startTime: '2020-06-13T11:00:00Z',
      },
      {
        endTime: '2020-06-13T12:00:00Z',
        id: 0,
        isSubscribed: false,
        lat: 55.173693,
        lng: 61.392991,
        name: 'Активность 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        startTime: '2020-06-13T11:00:00Z',
      },
      {
        endTime: '2020-06-13T12:00:00Z',
        id: 0,
        isSubscribed: false,
        lat: 55.173693,
        lng: 61.392991,
        name: 'Активность 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        startTime: '2020-06-13T11:00:00Z',
      },
    ],
  }), 2000);
}
