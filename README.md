# Thatbin

Thatbin is an AI-powered voice assistant application built with Next.js. It leverages Google Cloud services for speech-to-text, text-to-speech, and AI chat functionalities.

## Features

- **Speech-to-Text**: Convert spoken language into text using Google Cloud Speech-to-Text.
- **Text-to-Speech**: Generate natural-sounding speech from text using Google Cloud Text-to-Speech.
- **AI Chat**: Engage in conversations with an AI model using Google Cloud Vertex AI.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Google Cloud account with access to Speech-to-Text, Text-to-Speech, and Vertex AI APIs.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/supermasslve/thatbin.git
   cd thatbin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory and add your Google Cloud project ID:

   ```plaintext
   GOOGLE_CLOUD_PROJECT=your-google-cloud-project-id
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- **Voice Input**: Click the "Start Recording" button to begin capturing audio. Click "Stop Recording" to process the input.
- **Text Input**: Type a message in the input field and press "Enter" or click "Send" to interact with the AI.

## Deployment

To deploy the application, you can use platforms like Vercel or Netlify. Ensure that your environment variables are correctly set in the deployment settings.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Google Cloud](https://cloud.google.com/) for providing the APIs used in this project.
- [Next.js](https://nextjs.org/) for the framework.
- [Tailwind CSS](https://tailwindcss.com/) for styling.