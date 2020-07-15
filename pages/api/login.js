function login(req, res) {
  const apiUrl = new URL(process.env.API_PATH);
  const url = `${apiUrl.origin}/login`;

  const formData = new URLSearchParams();

  formData.set('username', req.body.username);
  formData.set('password', req.body.password);

  const options = {
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: formData,
    redirect: 'manual',
  };

  fetch(url, options)
    .then((response) => {
      const cookie = response.headers.get('set-cookie');
      if (cookie) {
        res.setHeader('set-cookie', cookie);
        res.status(200).send('OK');
      } else {
        res.status(400).json({ error: 'Bad request' });
      }
    })
    .catch((error) => res.status(502).json(error));
}

export default login;
