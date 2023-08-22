const setStatusReadBaseOrigin = (req, res, next) => {
  const browsers = ["Chrome", "Edge", "Safari", "Firefox", "Opera", "Vivaldi", "Yandex", "Maxthon"]
  console.log(req.headers);
  if (req.headers["user-agent"].includes(browsers)) {
    req.body.statusRead="sent";
  } else {
    delete req.body.statusRead;
  }
  next();
};

module.exports = setStatusReadBaseOrigin;
