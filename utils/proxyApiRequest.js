import ajax from './ajax';

async function proxyRequest(req, res) {
  const {
    method, body,
  } = req;
  const url = req.url.replace('/api', process.env.API_PATH);
  const { cookie = '' } = req.headers;

  const options = {
    url,
    method,
    data: body,
    headers: {
      cookie,
      'content-type': 'application/json',
    },
  };

  console.log(`PROXY ${JSON.stringify(options, null, 2)}`);

  try {
    const response = await ajax(options);
    console.log(`PROXY RESPONSE ${response.status} ${method} ${url} ${JSON.stringify(response.data, null, 2)}`);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.log(`PROXY ERROR ${url} ${JSON.stringify(error.response?.data ?? { message: error.message }, null, 2)}`);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(error.response.status).send(error.response.data);
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(502).send({ error, message: error.message });
    }
  }
}

export default proxyRequest;
