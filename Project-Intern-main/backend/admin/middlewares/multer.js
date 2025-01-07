const multer = require("multer");

const storage = multer.diskStorage({
  // chỉ định thư mục để lưu trữ file được upload bởi frontend
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  // xác định tên file khi lưu trữ trên server
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploads = multer({ storage: storage });

module.exports = { uploads };
