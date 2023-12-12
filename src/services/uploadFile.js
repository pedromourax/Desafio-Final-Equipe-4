const s3 = require("./aws-s3")

const uploadFile = async (path, buffer, mimetype) => {
    const arquivo = await s3.upload({
        Bucket: process.env.BUCKET_NAME,
        Key: path,
        Body: buffer,
        ContentType: mimetype
    }).promisse()

    return {
        url: arquivo.Location,
        path: arquivo.Key
    }
}

module.exports = uploadFile