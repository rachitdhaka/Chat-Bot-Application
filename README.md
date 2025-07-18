# AI Chat Application with Google Gemini

A modern, interactive chat application built with React and Vite, powered by Google Gemini AI.

## Features

- 🤖 AI-powered conversations using Google Gemini API
- 💬 Real-time chat interface
- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Fast development with Vite
- 🔄 Loading states and error handling

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy your API key

### 3. Configure Environment Variables

The API key is already configured in the `.env` file:

```env
VITE_GEMINI_API_KEY=AIzaSyB-ZvX-1AhUDHEmK_mZzmsaXR65XXduTLc
```

### 4. Run the Application

```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`

## Usage

1. Type your message in the input field at the bottom
2. Press Enter or click the Send button
3. Wait for the AI to respond
4. Continue the conversation!

## Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Application styles
├── main.jsx         # Application entry point
└── index.css        # Global styles
```

## Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Google Generative AI** - Official Google Gemini API client
- **Google Gemini Pro** - Advanced AI model for chat completions

## API Integration

The application uses the Google Generative AI SDK which provides access to Google's Gemini Pro model. The API calls are made using the official Google Generative AI client library.

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your API key is correctly set in the `.env` file
2. **Rate Limiting**: Check your API usage if you encounter rate limit errors
3. **Content Policy**: Gemini has content policies - some messages might be blocked

### Environment Variables Not Working

If environment variables aren't loading:
1. Restart your development server after modifying `.env`
2. Ensure the variable name starts with `VITE_`
3. Check that the `.env` file is in the root directory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning and development.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
