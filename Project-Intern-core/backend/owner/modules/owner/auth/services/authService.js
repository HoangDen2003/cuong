const { sign, signRefreshToken } = require("utils/jwtUtils");
const bcrypt = require("bcrypt");
const db = require("models/index");
const nodemailer = require("nodemailer");

const authService = {
  login: async (email, password) => {
    const user = await db.User.findOne({ where: { email } });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");
    const role = await db.Role.findOne({ where: { id: user.role_id } });
    const access_token = sign(user.id, role.name);
    const refresh_token = signRefreshToken(user.id, role);
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role_id: role.name,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
      access_token: access_token,
      refresh_token: refresh_token,
    };
  },

  createUser: async (body) => {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await db.User.create({
      username: body.username,
      email: body.email,
      birthday: body.birthday,
      password: hashedPassword,
      phone: body.phone,
      address: body.address,
      role_id: body.role_id ? body.role_id : 1,
    });
    return newUser;
  },

  resetPassword: async (email, password) => {
    const user = await db.User.findOne({ where: { email } });
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return { message: "Password reset successfully" };
  },

  forgotPassword: async (email) => {
    const user = await db.User.findOne({ where: { email } });
    if (!user) return { message: "User not found" };
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "lequan18042001@gmail.com",
        pass: "skxa cccp rslw iulg"
      },
    });

    const mailOptions = {
      from: "lequan18042001@gmail.com",
      to: email,
      subject: "Password reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) throw new Error("Email send failed!,", error);
      else { return email; }
    });
  },

  checkOtpMail: async (email, otp) => {
    const user = await db.User.findOne({ where: { email } });
    if (user.otp === otp) {
      return { message: "OTP verified successfully" };
    } else {
      throw new Error("Invalid OTP");
    }
  },
};

module.exports = authService;
