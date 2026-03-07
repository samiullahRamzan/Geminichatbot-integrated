import express from "express";
import { AskQuestion, AskQuestionStreaming } from "../controllers/chatbot.controller";
const router=express.Router();

router.post('/askquestion',AskQuestion)
router.post('/askquestion-streaming',AskQuestionStreaming)

export default router;