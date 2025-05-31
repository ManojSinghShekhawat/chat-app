const sendToken = (user, statusCode, res) => {
  const token = user.getjwt();
  const options = {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: "Lax", // Use "None" + "secure: true" if you're doing cross-origin on HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
module.exports = sendToken;
