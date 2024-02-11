const getApiStatus = async (req, res) => {
  const htmlResponse = `
    <html>
    <head>
        <title>Rad-Report-API</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                text-align: center;
                font-family: Arial, sans-serif;
            }
            h1 {
                margin-bottom: 10px;
            }
h4{
  margin-top: 30px;
}
            p {
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div>
            <h1>Rad-Report-API</h1>
            <p>Developed and maintained by <b>S.W.I.F.T Team 6. </b> </p>
            <p>REST API built based on OPENAPI Specifications.</p>
            <h4>Supported specifications</h4>
            <p>OpenAPI 3.x</p>
            <p>Swagger 2</p>
            <p>AsyncAPI 2.0</p>
        </div>
    </body>
    </html>
  `;
  res.status(200).send(htmlResponse);
};

export default getApiStatus;
