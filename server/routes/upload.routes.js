import express from "express";
import multer from "multer";
import path from "path";
import { unlink } from "node:fs/promises";
import sharp from "sharp";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

function checkFileTypes(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only");
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: function (req, file, cb) {
    checkFileTypes(file, cb);
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  const sourcePath = req.file.path;
  const optimizedName = `${path.parse(req.file.filename).name}.webp`;
  const optimizedPath = path.join("uploads", optimizedName);

  await sharp(sourcePath)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(optimizedPath);
  await unlink(sourcePath);

  res.json({
    message: "Image uploaded and optimized",
    image: `/uploads/${optimizedName}`,
  });
});

export default router;
