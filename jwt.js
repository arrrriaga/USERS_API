const jwt = require("jsonwebtoken");
const secret = "micadenaultramegasecretaquenodebetenernadie";

const generarToken = (payload) => {
  return jwt.sign(payload, secret);
};

const verificarToken = (token) => {
  return jwt.verify(token, secret);
};

console.log(
  generarToken({
    userType: "admin",
    userId: "5",
  })
);

console.log(
  verificarToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6ImFkbWluIiwidXNlcklkIjoiNSIsImlhdCI6MTY2NDYzNjQzOH0.fDQ2OR8J4aGYzRaSUA2L4M6DvmRnZdobWs_QNSm0P7w"
  )
);
