const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/mov",
];

const uploadToCloudinary = (fieldName, maxFiles = 5, fileSize = 5) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      let resourceType = "image";

      if (file.mimetype.startsWith("video")) {
        resourceType = "video";
      }

      return {
        folder: "pixora_uploads",
        resource_type: resourceType,
      };
    },
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: fileSize * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only images and videos are allowed"), false);
      }
    },
  });

  const uploader =
    maxFiles === 1
      ? upload.single(fieldName)
      : upload.array(fieldName, maxFiles);

  // middleware wrapper for error handling
  return (req, res, next) => {
    uploader(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: `File size should not exceed ${fileSize}MB`,
          });
        }

        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      next();
    });
  };
};

module.exports = uploadToCloudinary;