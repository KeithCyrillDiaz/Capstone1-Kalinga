import { google } from "googleapis";

console.log(process.env.CLIENT_EMAIL)
console.log(process.env.CLIENT_PRIVATE_KEY)
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const JWTClient = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  process.env.CLIENT_PRIVATE_KEY,
  SCOPES
);

JWTClient.authorize(function (err, tokens) {
  if (err) {
    console.log("error")
    console.log(err.message);
  } else {
    console.log("Google Autorization Complete");
  }
});

export default JWTClient;