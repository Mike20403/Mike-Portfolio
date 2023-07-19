
import * as functions from "firebase-functions";
import * as jwt from "jsonwebtoken";

export const generateAdminToken = functions.https.onCall(() => {
  const secretKey = "0929145474"; // Replace with your secret key

  // Generate the admin JWT
  const adminToken = jwt.sign({role: "admin"}, secretKey, {expiresIn: "1h"});


  return {adminToken};
});
