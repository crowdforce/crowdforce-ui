function auth(req, res) {
  const url = req.url.replace('/api', process.env.API_PATH);
  console.log(url);

  // fetch(url, options)
  //   .then((response) => {
  //     const cookie = response.headers.get('set-cookie');
  //     if (cookie) {
  //       res.setHeader('set-cookie', cookie);
  //       res.status(200).send('OK');
  //     } else {
  //       res.status(400).json({ error: 'Bad request' });
  //     }
  //   })
  //   .catch((error) => res.status(502).json(error));
}

export default auth;
