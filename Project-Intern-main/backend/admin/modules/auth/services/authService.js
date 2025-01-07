const db = require("models/index");
const { sign, signRefreshToken } = require("utils/jwtUtils");
const bcrypt = require("bcryptjs");
const { sendMail } = require("modules/kernels/nodemailer");

module.exports = {
  login: async (email, password) => {
    const user = await db.User.findOne({ where: { email } });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new Error("Invalid password");

    const role = await db.Role.findOne({ where: { id: user.role_id } });

    const access_token = sign(user.id, role.name);
    const refresh_token = signRefreshToken(user.id, role.name);

    return {
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        role: role.name,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
      access_token: access_token,
      refresh_token: refresh_token,
    };
  },
  forgotPassword: async (email) => {
    const user = await db.User.findOne({ where: email });
    return user;
  },
  sendMail: async (code) => {
    const user = await db.User.findOne({ where: { email: code.email } });
    const verification = {
      user_id: user.id,
      code: code.text,
    };
    await db.Verification.create(verification);
    code.text = `Your verification code is: ${code.text}`;
    const result = sendMail(code);
    return result;
  },
  verifyEmail: async (otp) => {
    const result = await db.Verification.findOne({ where: { code: otp } });
    return result;
  },
  deleteOtp: async (otp) => {
    await db.Verification.destroy({ where: { code: otp } });
  },
  newPassword: async (body) => {
    const password = await bcrypt.hash(body.password, 10);
    const result = await db.User.update(
      { password: password },
      { where: { email: body.email } }
    );
    return result;
  },
};
