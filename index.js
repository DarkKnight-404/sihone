let express = require("express");
let app = express();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require("twilio")(accountSid, authToken);
const fs = require("fs");
const path = require("path");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.get("/makecall", (req, res) => {
    client.calls.create({
        url: process.env.GET_XML_URL,
        to: "+918459781390",
        from: "+18156230647",
    }).then(call => {
        res.send("{'status':'success'}")
    }).catch(() => { res.send("{'status':'fail'}") });
})






app.post("/setvoice", async (req, res) => {
    console.log(req.body.data)
    console.log(typeof req.body)


    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">${req.body.data}</Say>
</Response>`;

    fs.promises.writeFile("voice.xml", xmlContent, "utf8").then(val => {
        console.log(val)
        res.send("{status: 'success'}")

    }).catch(err => {
        res.send(`{status: "fail", err: ${JSON.stringify(err)}}`)
    })


})


app.get("/getvoice", (req, res) => {
    res.sendFile(path.join(__dirname, "tmp", "voice.xml"));
});




app.post("/login", (req, res) => {
    console.log(req.body)
    if (req.body.password == "314159") {
        res.sendFile(path.join(__dirname, "tmp", "Main.html"));
    }
    else {
        res.send("<h1>Please Enter Valid Password</h1>")
    }
})



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
})




app.listen(9600)