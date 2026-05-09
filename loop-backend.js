const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/ask-loop', async (req, res) => {
    try {
        const { prompt } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Contexto para a IA saber que faz parte do Loop Web
        const context = "Você é o assistente inteligente do ecossistema Loop Web. Responda de forma curta, elegante e profissional. ";
        const result = await model.generateContent(context + prompt);
        
        res.json({ response: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: "Erro na conexão neural." });
    }
});

app.listen(3000, () => console.log("Loop AI Server ativo na porta 3000"));