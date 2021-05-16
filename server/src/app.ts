import express from "express";
import colors from "colors";
colors.enable()

async function server(){
    const app = express();
    await require('./loaders').default({ expressApp: app})
    app.listen({ port: 4010}, () => {
        console.log(`Listening at port 4010`.cyan.underline)
    })
}

server()
