import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "E-Pharmacy API",
    description: "API documentation for E-Pharmacy backend",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./index.js",
  "./user/user.controller.js",
  "./lab-test/labtest.controller.js",
  "./bookings/booking.controller.js",
  "./report/report.controller.js",
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
