const aws=require('aws-sdk')
const key=require('../util/keys')




aws.config.update({
    accessKeyId:  key.aws_key,
    secretAccessKey: key.aws_secret_key,
  });

  const S3 = new aws.S3();

async function checkS3Connection() {
  try {
    const headBucketResponse = await S3.headBucket({ Bucket: 'bucketshrey1' }).promise(); // Replace with your bucket name
    console.log('S3 connection successful:', headBucketResponse); // Optional: log bucket size
  } catch (error) {
    console.error('S3 connection error:', error);
  }
}

console.log(key.aws_key ,'\n',key.aws_secret_key);


checkS3Connection();
