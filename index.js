const express = require("express");

const app = express();

const { Configuration, OpenAIApi } = require("openai");

const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.render("index.ejs", { data: '' });
});


app.post("/data", async (req, res) => {
    const prompt = req.body.prompt;
    const apiRes = await callChatgptApi(prompt)
    res.render("index.ejs", { data: apiRes })
});


async function callChatgptApi(text) {
    const apiKey = ""
    const configuration = new Configuration({
        apiKey
    });

    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 3000

        });
        return completion.data.choices[0].text
    } catch (error) {
        console.log(error);
    }
}



app.listen("4000", () => {
    console.log("server is running on port 4000");
})
