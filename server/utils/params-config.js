const { v4: uuidv4 } = require("uuid");

const params = (fileName) => {
  const myFile = fileName.originalname.split(".");
  const fileType = myFile[myFile.length - 1];
  const imageParams = {
    Bucket: "user-images-555aca02-2081-4de2-a45a-cfb597ed0d15",
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
  };

  return imageParams;
};
module.exports = params;
