# Chatbot Integration Setup Guide

## Overview
A Gemini AI-powered chatbot has been integrated into your Disaster Learning Hub website. The chatbot is accessible from every page via a floating chat widget.

## Setup Instructions

### 1. Add Your Gemini API Key

You need to get a free Gemini API key from Google:

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key
4. Open the `.env` file in your project root folder
5. Replace `your_gemini_api_key_here` with your actual API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   NODE_ENV=development
   ```
6. Save the file

**Important:** The `.env` file is already added to `.gitignore`, so your API key will NOT be committed to GitHub.

## Files Created

### Backend
- **app.js** - Added `/api/chat` POST endpoint to handle chatbot requests

### Frontend
- **views/chatbot-widget.ejs** - HTML structure for the chatbot widget
- **public/css/chatbot.css** - Complete styling for the floating chat widget
- **public/js/chatbot.js** - JavaScript logic for chatbot interaction

### Configuration
- **.env** - Environment variables file (add your API key here)
- **.gitignore** - Already configured to ignore .env file

## Pages with Chatbot Integration
The chatbot has been added to:
- ✅ home.ejs
- ✅ report.ejs
- ✅ ar-tools.ejs
- ✅ Fire.ejs
- ✅ Flood.ejs
- ✅ earthquake.ejs

You can add the chatbot to other pages by including these two lines before the closing `</body>` tag:

```html
<%- include('chatbot-widget') %>
<script src="/js/chatbot.js"></script>
```

And add this line to the `<head>` section:
```html
<link rel="stylesheet" href="/css/chatbot.css" />
```

## Features

✨ **Floating Chat Widget**
- Fixed position on bottom-right of the screen
- Minimizable toggle button
- Auto-scrolling message history
- Loading indicator while waiting for response
- Mobile responsive design

🤖 **AI Capabilities**
- Uses Google Gemini 2.5 Flash model
- Contextual disaster safety responses
- Max 2048 token responses
- Temperature set to 0.7 for balanced creativity

📱 **User Experience**
- Click the chat button to open/close
- Send messages with Enter key or Send button
- Beautiful message bubbles (user vs bot)
- Smooth animations
- Error handling with user-friendly messages

## How It Works

1. User types a message and clicks Send
2. Message is sent to `/api/chat` endpoint
3. Backend forwards request to Gemini API
4. AI generates a response about disaster safety
5. Response is displayed in the chat widget
6. User can continue the conversation

## Troubleshooting

### "API key not configured" Error
- Make sure your `.env` file has `GEMINI_API_KEY=your_key`
- Restart your Node server after adding the key

### Chatbot not appearing on page
- Ensure the page includes: `<%- include('chatbot-widget') %>`
- Check that chatbot.css is linked in the `<head>`
- Check browser console for JavaScript errors

### API requests failing
- Verify your Gemini API key is valid
- Check that the API is enabled in Google Cloud Console
- Ensure you have quota remaining on your API key

## API Model Used
- **Model:** `gemini-2.5-flash`
- **Temperature:** 0.7 (balanced between creative and deterministic)
- **Max Tokens:** 2048
- **Endpoint:** https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent

## Security Notes
- API key is stored in `.env` file (server-side only)
- `.env` is in `.gitignore` and will not be pushed to GitHub
- All API requests go through your Node backend
- Never expose your API key in client-side code

## Customization

### Change Bot Greeting
Edit **public/js/chatbot.js**, line ~80:
```javascript
addMessage('Hi! 👋 I\'m your Disaster Safety Bot. Ask me anything about disaster preparedness and safety!', 'bot');
```

### Change Bot Colors
Edit **public/css/chatbot.css** and modify the gradient colors:
```css
background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
```

### Change AI Personality
Edit **app.js** in the `/api/chat` endpoint and modify the system message or temperature.

## Next Steps

1. ✅ Get your Gemini API key from Google AI Studio
2. ✅ Add the key to `.env` file
3. ✅ Restart your Node server
4. ✅ Test the chatbot on any page

---

**Need Help?**
- Gemini API Docs: https://ai.google.dev/tutorials
- Express.js Docs: https://expressjs.com/
- Contact your development team

