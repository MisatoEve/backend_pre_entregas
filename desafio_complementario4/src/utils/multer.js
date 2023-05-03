import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const dir = `./src/public/${file.fieldname}`;

    switch (file.fieldname) {
      case "profiles":
        callback(null, dir);
        break;
      case "products":
        callback(null, dir);
        break;
      case "documents":
        callback(null, dir);
        break;
      default:
        break;
    }
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;