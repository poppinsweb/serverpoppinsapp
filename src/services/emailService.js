const { sendTokenEmail } = require("../utils/mailer");

async function sendTokenEmailWrapper(email, token) {
  const result = await sendTokenEmail(email, token);
  if (!result.success) {
    throw new Error("Error sending email: " + result.error);
  }
  return result;
}

module.exports = { sendTokenEmail: sendTokenEmailWrapper };