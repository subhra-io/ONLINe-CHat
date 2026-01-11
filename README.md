# Real-Time Chat App

A modern real-time chat application built with Next.js and Socket.IO.

## Features

- ✨ Real-time messaging
- 👥 Multiple users support
- 🎨 Modern, responsive UI
- 🚀 Easy deployment to Vercel
- 📱 Mobile-friendly design

## Getting Started

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deployment to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy with one click!

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## How to Use

1. Enter your username
2. Start chatting with friends by sharing the deployed URL
3. Messages appear in real-time for all connected users

## Tech Stack

- **Frontend**: Next.js, React
- **Real-time**: Socket.IO
- **Styling**: CSS3 with modern gradients
- **Deployment**: Vercel

## Project Structure

```
├── components/
│   ├── Chat.js          # Main chat component
│   └── MessageInput.js  # Message input component
├── pages/
│   ├── _app.js         # Next.js app wrapper
│   └── index.js        # Home page
├── styles/
│   └── globals.css     # Global styles
├── server.js           # Custom server with Socket.IO
└── package.json        # Dependencies
```