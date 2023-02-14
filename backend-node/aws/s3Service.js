const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const uuid = require('uuid').v4;

exports.s3Upload = async (file) => {
  const s3client = new S3Client({ region: process.env.AWS_REGION });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `test-uploads/${uuid()}.wav`,
    Body: file,
  };
  return s3client.send(new PutObjectCommand(params));
};
