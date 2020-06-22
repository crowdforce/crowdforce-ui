import request from 'request';

export default function (req, res) {
  const options = {
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_API_PATH}/auth/send-code`,
    headers: { 'content-type': 'application/json' },
    body: req.body,
    json: true,
  };

  request(options).pipe(res);
}
