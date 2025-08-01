const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
const stream = require("stream");
const sharp = require("sharp");

const MAX_SIZE_KB = 5 * 1024;

const compressImage = async (inputBuffer, fileExtension) => {
    const sharpInstance = sharp(inputBuffer).resize({
        width: 1200,
        withoutEnlargement: true,
    });

    switch (fileExtension) {
        case ".jpg":
        case ".jpeg":
            return await sharpInstance
                .jpeg({
                    quality: 90, // Great balance between quality and size
                    mozjpeg: true, // More efficient compression
                    chromaSubsampling: "4:4:4",
                })
                .toBuffer();

        case ".png":
            return await sharpInstance
                .png({
                    quality: 90, // quality parameter works indirectly in PNG
                    compressionLevel: 9, // max compression
                    adaptiveFiltering: true,
                })
                .toBuffer();

        case ".webp":
            return await sharpInstance
                .webp({
                    quality: 90,
                    effort: 4, // slightly slower but sharper
                })
                .toBuffer();

        default:
            return inputBuffer; // fallback (e.g., SVG or unsupported)
    }
};

const saveAndGetFile = async (file) => {
    try {
        const inputBuffer = await fs.readFile(file.filepath);
        const fileExtension = path.extname(file.originalFilename).toLowerCase();
        const baseName = path.basename(file.originalFilename, fileExtension);

        let finalBuffer = inputBuffer;

        if (fileExtension !== ".svg") {
            finalBuffer = await compressImage(inputBuffer, fileExtension);
            const sizeKB = finalBuffer.length / 1024;
            if (sizeKB > MAX_SIZE_KB) {
                console.warn(`Compression failed to meet size limit: ${Math.round(sizeKB)} KB`);
                return null;
            }
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const uploadOptions = {
            folder: "uploads",
            public_id: baseName,
            resource_type: "image",
            overwrite: true,
            invalidate: true,
            use_filename: true,
            unique_filename: false,
            transformation: [],
        };

        // Apply Cloudinary transformations only if not SVG
        if (fileExtension !== ".svg") {
            uploadOptions.transformation.push({
                width: 1200,
                crop: "limit",
                quality: "auto:best",
                fetch_format: "auto",
            });
        }

        return await new Promise((resolve) => {
            const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
                if (error) {
                    console.error("Upload failed:", error);
                    return resolve(null);
                }

                const sizeKB = result.bytes / 1024;
                if (fileExtension !== ".svg" && sizeKB > MAX_SIZE_KB) {
                    console.warn(`Skipped ${file.originalFilename} — size too large after upload: ${Math.round(sizeKB)} KB`);
                    return resolve(null);
                }

                return resolve({
                    ...result,
                    name: file.originalFilename,
                    contentType: file.mimetype,
                });
            });

            const bufferStream = new stream.PassThrough();
            bufferStream.end(finalBuffer);
            bufferStream.pipe(uploadStream);
        });
    } catch (err) {
        console.error("Upload error:", err);
        return null;
    }
};

module.exports.saveAndGetFile = saveAndGetFile;

// This is for local upload

// const fs = require("fs").promises;
// const path = require("path");
// const sharp = require("sharp");

// const MAX_SIZE_KB = 400;

// const compressToTargetSize = async (inputBuffer, fileExtension) => {
//     let quality = 90;
//     let compressedBuffer;
//     let sharpInstance = sharp(inputBuffer);

//     // Resize if too large (optional but helpful)
//     const metadata = await sharpInstance.metadata();
//     if (metadata.width > 1500) {
//         sharpInstance = sharpInstance.resize({ width: 1500 });
//     }

//     while (quality >= 30) {
//         if (fileExtension === ".jpg" || fileExtension === ".jpeg") {
//             compressedBuffer = await sharpInstance.clone().jpeg({ quality }).toBuffer();
//         } else if (fileExtension === ".png") {
//             compressedBuffer = await sharpInstance.clone().png({ compressionLevel: 9 }).toBuffer();
//         } else if (fileExtension === ".webp") {
//             compressedBuffer = await sharpInstance.clone().webp({ quality }).toBuffer();
//         } else {
//             return null; // Unsupported
//         }

//         if (compressedBuffer.length / 1024 <= MAX_SIZE_KB) {
//             return compressedBuffer;
//         }

//         quality -= 10;
//     }

//     // Return lowest quality attempt even if not under threshold
//     return compressedBuffer;
// };

// const saveAndGetFile = async (file) => {
//     const oldPath = file.filepath;
//     const originalFileName = file.originalFilename;
//     const fileExtension = path.extname(originalFileName).toLowerCase();
//     const baseName = path.basename(originalFileName, fileExtension);
//     const newFileName = baseName + fileExtension;
//     const newPath = path.join(process.cwd(), "uploads", newFileName);

//     try {
//         const inputBuffer = await fs.readFile(oldPath);
//         //console.log("Original size:", (inputBuffer.length / 1024).toFixed(2), "KB");

//         let compressedBuffer = await compressToTargetSize(inputBuffer, fileExtension);

//         if (!compressedBuffer) {
//             //console.log("Unsupported format or compression failed, copying original.");
//             await fs.copyFile(oldPath, newPath);
//             return {
//                 name: newFileName,
//                 contentType: file.mimetype,
//             };
//         }

//         //console.log("Compressed size:", (compressedBuffer.length / 1024).toFixed(2), "KB");

//         await fs.writeFile(newPath, compressedBuffer);
//         //console.log("=======> ", newFileName);

//         return {
//             name: newFileName,
//             contentType: file.mimetype,
//         };
//     } catch (err) {
//         console.error("Image compression failed:", err);
//         return null;
//     }
// };

// module.exports.saveAndGetFile = saveAndGetFile;
