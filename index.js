let express = require("express");
let app = express();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require("twilio")(accountSid, authToken);
const fs = require("fs");
const path = require("path");
const cors = require("cors");
app.use(cors());


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const VoiceResponse = require('twilio').twiml.VoiceResponse;
app.post('/voice', (request, response) => {
    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();

    twiml.say('Hello from your pals at Twilio! Have fun.');

    // Render the response as XML in reply to the webhook request
    response.type('text/xml');
    response.send(twiml.toString());
});













const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://pshychicexcusealpha_db_user:wl1NBOBNGFtUd3Ce@cluster0.bxw9ggf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const clientM = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

























app.get("/makecall", (req, res) => {
    client.calls.create({
        url: "https://sihone.vercel.app/getvoice",
        to: "+918459781390",
        from: "+18156230647",
    }).then(call => {
        res.send("{'status':'success'}")
    }).catch((err) => { res.send(`{'status':'fail', err: ${err}}`) });
})






app.post("/setvoice", async (req, res) => {
    console.log(req.body.data)
    console.log(typeof req.body)


    const xmlContent = `${req.body.data}`;

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await clientM.connect();
        // Send a ping to confirm a successful connection
        // Select database and collection
        const db = clientM.db("farmcult");
        const collection = db.collection("aireview");

        // Fetch all components
        const result = await collection.insertOne({ text: xmlContent });

        console.log("Data inserted with id:", result.insertedId);

        res.send('{"status": "successfull"}')
    }
    catch (err) {


        // inner second try catch
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await clientM.connect();
            // Send a ping to confirm a successful connection
            // Select database and collection
            const db = clientM.db("farmcult");
            const collection = db.collection("aireview");

            // Fetch all components
            const result = await collection.insertOne({ text: xmlContent });

            console.log("Data inserted with id:", result.insertedId);

            res.send('{"status": "successfull"}')
        }
        catch (err) {
            res.send(`{'status': 'failed',err: ${JSON.stringify(err)}}`)

        }
        
        // inner second try catch






    }
    finally {
        // Ensures that the client will close when you finish/error
        await clientM.close();
    }


})


app.post("/getvoice", async (req, res) => {
    // res.sendFile(path.join(__dirname, "tmp", "voice.xml"));


    try {
        // Connect the client to the server	(optional starting in v4.7)
        await clientM.connect();
        // Send a ping to confirm a successful connection
        // Select database and collection
        const db = clientM.db("farmcult");
        const collection = db.collection("aireview");

        // Fetch all components
        const components = await collection.find({}).toArray();

        console.log(components);



        const twiml = new VoiceResponse();

        twiml.say(components[0].text);

        // Render the response as XML in reply to the webhook request
        res.type('text/xml');
        res.send(twiml.toString());

    }
    catch (err) {


        // inner 2nd try catch
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await clientM.connect();
            // Send a ping to confirm a successful connection
            // Select database and collection
            const db = clientM.db("farmcult");
            const collection = db.collection("aireview");

            // Fetch all components
            const components = await collection.find({}).toArray();

            console.log(components);



            const twiml = new VoiceResponse();

            twiml.say(components[0].text);

            // Render the response as XML in reply to the webhook request
            res.type('text/xml');
            res.send(twiml.toString());
        }
        catch (err) {
            res.send(`{"status": "fail", err: '${JSON.stringify(err)}'}`)
        }
        // inner 2nd try catch


    }
    finally {
        // Ensures that the client will close when you finish/error
        await clientM.close();
    }


});




app.post("/login", (req, res) => {
    console.log(req.body)
    if (req.body.password == "314159") {
        res.sendFile(path.join(__dirname, "Main.html"));
    }
    else {
        res.send("<h1>Please Enter Valid Password</h1>")
    }
})



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
})




app.listen(9600)