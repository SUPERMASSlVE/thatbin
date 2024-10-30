import { VertexAI } from '@google-cloud/vertexai';

const vertex = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: 'us-central1',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    const model = vertex.preview.getGenerativeModel({
      model: 'gemini-pro',
    });

    const result = await model.generateContent(message);
    const response = result.response;

    res.status(200).json({ reply: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}