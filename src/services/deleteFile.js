const aws = require("aws-sdk")

const endpoint = new aws.Endpoint('s3.us-east-005.backblazeb2.com')

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

const deleteFile = async (path) => {
    const arquivo = await s3.deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: path
    }).promise()
    return {
        menssagem: "Arquivo excluido com sucesso!"
    }
}

module.exports = deleteFile;