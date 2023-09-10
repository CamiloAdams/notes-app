import swaggerjsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Notes app", version: "1.0.0" },
  },
  apis: ["./routes/auth.routes.js"],
};

const swaggerSpec = swaggerjsdoc(options)


const swaggerDocs = (app, port) => {
  app.use('/api/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
