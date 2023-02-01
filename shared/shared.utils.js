import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "instaclone-uploads-hmchung",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};

// AWS S3 버킷에서 사진을 삭제하는 함수
export const handleDeletePhotoFromAWS = async (fileUrl, folderName) => {
  const decodedUrl = decodeURI(fileUrl);
  const filePath = decodedUrl.split("/" + folderName + "/")[1];
  const fileName = `${folderName}/${filePath}`;

  await new AWS.S3()
    .deleteObject({
      Bucket: "instaclone-uploads-hmchung", // 본인 버킷 이름
      Key: fileName,
    })
    .promise();
};
