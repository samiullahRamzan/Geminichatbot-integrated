import { GoogleGenAI } from "@google/genai";
import { Request, Response } from "express";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});


export const AskQuestion = async (req: Request, res: Response) => {
    console.log('jdksjkdjsk')

    try {

        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [
                {
                    role: "user",
                    parts: [{ text: content }],
                },
            ],
        });

        res.status(200).json({ message: true, response: response.text })
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

}
export const AskQuestionStreaming = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: content,
    });

    for await (const chunk of stream) {
      const text = chunk.text || "";
      res.write(text);
    }

    res.end();
  } catch (error: any) {
    res.status(500).end(error.message);
  }
};