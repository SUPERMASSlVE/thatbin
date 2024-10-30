import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const ttsClient = new TextToSpeechClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, voiceType = 'NEUTRAL', languageCode = 'en-US', speakingRate = 1.0 } = req.body;

    const request = {
      input: { text },
      voice: { languageCode, ssmlGender: voiceType },
      audioConfig: { audioEncoding: 'MP3', speakingRate },
    };

    const [response] = await ttsClient.synthesizeSpeech(request);
    res.status(200).json({ audioContent: response.audioContent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}