import ajax from './ajax';

function proxyRequest(req, res) {
  const {
    method, body,
  } = req;
  const url = req.url.replace('/api', process.env.API_PATH);
  const { cookie = '' } = req.headers;

  const options = {
    method,
    body,
    headers: {
      cookie,
    },
    responseType: 'stream',
  };

  ajax(url, options)
    .then((response) => response.data.pipe(res))
    .catch((error) => res.status(502).json({ error, message: error.message }));
}

export default proxyRequest;
