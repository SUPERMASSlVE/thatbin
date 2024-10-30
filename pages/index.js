import { useState, useRef } from 'react';
import {
  Button,
  Input,
  Spinner,
  Alert,
  Select,
  Option,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/ui';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [voiceType, setVoiceType] = useState('NEUTRAL');
  const [languageCode, setLanguageCode] = useState('en-US');
  const [speakingRate, setSpeakingRate] = useState(1.0);
  const [textInput, setTextInput] = useState('');
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const reader = new FileReader();
        
        reader.onload = async () => {
          const base64Audio = reader.result.split(',')[1];
          await processVoiceInput(base64Audio);
        };
        
        reader.readAsDataURL(audioBlob);
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      setError('Error starting recording: ' + error.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processVoiceInput = async (audioData) => {
    setIsProcessing(true);
    try {
      const sttResponse = await fetch('/api/speech-to-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioData, languageCode }),
      });
      const { text } = await sttResponse.json();

      const userMessage = { role: 'user', content: text };
      setMessages(prev => [...prev, userMessage]);

      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const { reply } = await chatResponse.json();

      const aiMessage = { role: 'assistant', content: reply };
      setMessages(prev => [...prev, aiMessage]);

      const ttsResponse = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: reply, voiceType, languageCode, speakingRate }),
      });
      const { audioContent } = await ttsResponse.json();

      const audioBlob = new Blob([audioContent], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      await audioRef.current.play();
    } catch (error) {
      setError('Error processing voice input: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextInput = async () => {
    if (textInput.trim() !== '') {
      try {
        const userMessage = { role: 'user', content: textInput };
        setMessages(prev => [...prev, userMessage]);

        const chatResponse = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: textInput }),
        });
        const { reply } = await chatResponse.json();

        const aiMessage = { role: 'assistant', content: reply };
        setMessages(prev => [...prev, aiMessage]);

        const ttsResponse = await fetch('/api/text-to-speech', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: reply, voiceType, languageCode, speakingRate }),
        });
        const { audioContent } = await ttsResponse.json();

        const audioBlob = new Blob([audioContent], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioRef.current.src = audioUrl;
        await audioRef.current.play();

        setTextInput('');
      } catch (error) {
        setError('Error processing text input: ' + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI Voice Assistant</h1>

        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        <Card className="mb-4">
          <CardHeader>
            <h2 className="text-lg font-bold">Chat</h2>
          </CardHeader>
          <CardBody className="h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <h2 className="text-lg font-bold">Controls</h2>
          </CardHeader>
          <CardBody>
            <div className="flex items-center space-x-2 mb-4">
              <Select value={voiceType} onChange={setVoiceType}>
                <Option value="NEUTRAL">Neutral</Option>
                <Option value="MALE">Male</Option>
                <Option value="FEMALE">Female</Option>
              </Select>
              <Select value={languageCode} onChange={setLanguageCode}>
                <Option value="en-US">English (US)</Option>
                <Option value="fr-FR">French (France)</Option>
                <Option value="es-ES">Spanish (Spain)</Option>
              </Select>
              <Input
                type="number"
                min="0.5"
                max="2"
                step="0.1"
                value={speakingRate}
                onChange={e => setSpeakingRate(parseFloat(e.target.value))}
                className="w-20"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={isRecording ? stopRecording : startRecording} disabled={isProcessing}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
              <Input
                type="text"
                placeholder="Type a message"
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleTextInput()}
                className="flex-1"
              />
              <Button onClick={handleTextInput} disabled={isProcessing}>
                Send
              </Button>
            </div>
          </CardBody>
          {isProcessing && (
            <CardFooter>
              <div className="flex justify-center">
                <Spinner />
              </div>
            </CardFooter>
          )}
        </Card>

        <audio ref={audioRef} className="hidden" />
      </div>
    </div>
  );
}