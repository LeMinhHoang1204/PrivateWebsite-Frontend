const express = import("express")
const app  = express()

const cors = import("cors");

app.use(
    cors({
        origin: "http://localhost:3000"    })
)

