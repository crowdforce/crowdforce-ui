function sendCode(req, res) {
  const url = `${process.env.API_PATH}/auth/send-code`;

  const options = {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(req.body),
  };

  fetch(url, options)
    .then((response) => {
      res.status(response.status);
      return response.status === 200 ? Promise.resolve({ status: 200 }) : response.json();
    })
    .then((json) => res.json(json))
    .catch((error) => res.status(502).json(error));
}

export default sendCode;
