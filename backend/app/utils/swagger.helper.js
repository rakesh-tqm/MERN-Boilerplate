const port = process.env.PORT || 5000;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for Backend",
    version: "1.0.0",
    description:
      "This is a REST API application made for Backend. It retrieves data from Project.",
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/routes/**/*.js"],
};

module.exports = options;
