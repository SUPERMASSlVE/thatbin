import { SpeechClient } from '@google-cloud/speech';

const speechClient = new SpeechClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { audioData, languageCode = 'en-US', sampleRateHertz = 16000 } = req.body;
    
    const request = {
      audio: {
        content: audioData,
      },
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz,
        languageCode,
      },
    };

    const [response] = await speechClient.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    res.status(200).json({ text: transcription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}