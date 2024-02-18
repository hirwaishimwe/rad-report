import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: "1.0.1",
        title: "Radiology Report API",
        description: "Built and maintained by S.W.I.F.T Team 6",
    },
    servers: [
        {
            url: "http://localhost:8000",
            description: "API endpoint",
        },
    ],
};

const outputFile = "./swagger-output.json";
const routes = ["./*.js"];

swaggerAutogen({openapi: "3.0.0"})(outputFile, routes, doc).then(async () => {
    await import("../server.js");
});
