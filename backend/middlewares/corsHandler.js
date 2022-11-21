// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://one-for-study.nomoredomains.icu/',
  'https://one-for-study.nomoredomains.icu/',
  'http://api.one-for-study.nomoredomains.icu/',
  'https://api.one-for-study.nomoredomains.icu/',
  'localhost:3000',
  'localhost:3001',
];

// eslint-disable-next-line consistent-return
module.exports = ((err, req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header(
      'Access-Control-Allow-Methods',
      DEFAULT_ALLOWED_METHODS,
      'Access-Control-Allow-Headers',
      requestHeaders,
    );
    return res.end();
  }

  next();
});
