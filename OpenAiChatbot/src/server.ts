import express from 'express';
import 'dotenv/config';
import chatbotroutes from './routes/chatbot.routes'
const app=express();
import cors from 'cors'

app.use(express.json())
app.use(cors())

app.use('/api',chatbotroutes);

const port=4000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port} `)
})
