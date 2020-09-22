import ajax from './ajax';

function proxyRequest(req, res) {
  const {
    method, body,
  } = req;
  const url = req.url.replace('/api', process.env.API_PATH);
  const { cookie = '' } = req.headers;

  const options = {
    method,
    data: body,
    headers: {
      cookie,
      'content-type': 'application/json',
    },
    responseType: 'stream',
  };

  console.log(`PROXY ${url} ${JSON.stringify(options, null, 2)}`);

  ajax(url, options)
    .then((response) => response.data.pipe(res))
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        res.status(error.response.status).json(error.response.data);
      } else {
        // Something happened in setting up the request that triggered an Error
        res.status(502).json({ error, message: error.message });
      }
    });
}

export default proxyRequest;
