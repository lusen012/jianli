# Mood Music AI Agent

A runnable mood-chat + music-playback AI agent.

## Features
- Text + voice mood chat (Web Speech API)
- OpenAI-based response generation (rule-based fallback)
- Music queue strategy:
  - local files first (`/music/*.mp3`)
  - configured online tracks second (`config/music-library.json`)
  - dynamic online search fallback via iTunes Search API
- Immersive mood-themed UI + player controls

## Run
1. Configure API key:
   - copy `server/.env.example` -> `server/.env`
   - set `OPENAI_API_KEY=...`
2. Install dependencies (already done in this workspace):
   - root: `npm install`
   - client/server: already installed
3. Start app:
   - `npm run dev`
4. Open:
   - `http://localhost:5173`

## Notes
- If `music/` has no mp3 files, the app still works using online tracks.
- Backend health check: `http://localhost:8787/api/health`
- Debug music queue: `http://localhost:8787/api/debug/music-root`
