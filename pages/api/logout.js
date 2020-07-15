function logout(req, res) {
  res.setHeader('set-cookie', 'SESSION=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
  res.status(200).send('OK');
}

export default logout;
