import express from "express";
import colors from "colors";
require('dotenv').config();
colors.enable()

async function server(){
    const app = express();
    await require('./loaders').default({ expressApp: app})
    app.listen({ port: process.env.PORT || 5000 }, () => {
        console.log(`Listening at port ${process.env.PORT || 5000}`.cyan.underline)
    })
}

server()
