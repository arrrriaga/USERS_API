const jwt = require("jsonwebtoken");
const secret = "mysecret";

const generarToken = () => {
  return jwt.sign(
    {
      userType: "admin",
      userID: "5",
    },
    secret
  );
};

const verificarToken = (token) => {
  return jwt.verify(token, secret);
};

// console.log(
//   generarToken({
//     userType: "admin",
//     userID: 5,
//   })
// );

console.log(
  verificarToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6ImFkbWluIiwidXNlcklEIjoiNSIsImlhdCI6MTY2Nzc2NjU1MH0.gHLIbxY5FYTd51OPeUGBcUvZfNAUflV-2-PFHfxgIXU"
  )
);
