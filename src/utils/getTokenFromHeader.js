

const getTokenFromHeader = async (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    let token = req.headers.authorization.split(" ")[1];
    return token;
  }
  return null
};

export default getTokenFromHeader;
