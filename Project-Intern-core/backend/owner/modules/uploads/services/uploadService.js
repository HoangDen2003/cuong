const uploadService = {
  getFileUrl: (filename) => {
    return `http://localhost:3000/owner/public/uploads/${filename}`;
  }
};

module.exports = uploadService;
