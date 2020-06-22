import request from 'request';

export default function (req, res) {
  const options = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_API_PATH}/projects`,
  };

  request(options).pipe(res);
}
