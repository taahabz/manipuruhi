# Manipulation Guide - Research Tool

A chat application powered by Google's Gemini API that provides insights into manipulation techniques for research purposes. The app maintains chat context, uses browser localStorage for persistence, and features a modern UI with bright colors.

## Features

- Chat interface with context maintenance
- Local storage for chat history persistence
- Responsive design with mobile support
- Dark/light mode toggle
- Powered by Google's Gemini API

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- A Google Gemini API key (get one at [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd manipuruhi
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Gemini API key:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Start a new chat by clicking the "New Chat" button
2. Type your query about manipulation techniques for a specific task
3. The AI will respond with guidance on manipulation tactics, language patterns, and persuasion techniques
4. Your chat history is saved in your browser's localStorage

## Ethical Disclaimer

This tool is designed for research and educational purposes only. The information provided should not be used to harm, deceive, or exploit others. Always respect consent, autonomy, and ethical boundaries in all interactions.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Google Gemini API
- LocalStorage for data persistence

## License

This project is for educational purposes only.
