let response = (
  response,
  statusCode = 200,
  message = "Empty Message",
  payload = "Nothing"
) => {
  response.status(statusCode).send({
    message,
    payload,
  });
};
module.exports = { response };
