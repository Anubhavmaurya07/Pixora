const encode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64');
const decode = (token) => {
  if (!token) return null;
  try {
    return JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
  } catch (e) {
    return null;
  }
};
module.exports = { encode, decode };