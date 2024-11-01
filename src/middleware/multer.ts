import multer from "multer";
import path from "path";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename based on timestamp
  },
});

// File filter to accept only specific image formats
const fileFilter = (req: any, file: Express.Multer.File, cb: Function) => {
  const validTypes = /jpeg|jpg|png|webp/;
  console.log("file", file);

  const extname = validTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  console.log("ext", extname);
  const mimetype = validTypes.test(file.mimetype);
  console.log("mim", mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error("Error: File type not supported!"), false);
};

export const upload = multer({
  storage,
  fileFilter,
});
