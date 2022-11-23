const allowedCors = [
  'https://one-for-study.nomoredomains.icu',
  'http://one-for-study.nomoredomains.icu',
  //'https://one-for-study.nomoredomains.icu/',
  //'http://one-for-study.nomoredomains.icu/',
  //'http://api.one-for-study.nomoredomains.icu/',
  //'https://api.one-for-study.nomoredomains.icu/',
  //'http://localhost:3000',
  'http://localhost:3001',
  //'https://localhost:3000',
  //'https://localhost:3001',
  //'http://localhost',
  //'https://api.one-for-study.nomoredomains.icu/signup',
  //'https://one-for-study.nomoredomains.icu',
];

module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
