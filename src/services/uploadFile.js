const aws = require("aws-sdk")

const endpoint = new aws.Endpoint('s3.us-east-005.backblazeb2.com')

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

const uploadFile = async (path, buffer, mimetype) => {

    const arquivo = await s3.upload({
        Bucket: process.env.BUCKET_NAME,
        Key: path,
        Body: buffer,
        ContentType: mimetype
    }).promise()
    return {
        url: arquivo.Location,
        path: arquivo.Key
    }
}

module.exports = uploadFile