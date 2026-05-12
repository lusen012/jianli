# Mood Music AI Agent

A runnable mood-chat + music-playback AI agent.

## Local run
1. copy `server/.env.example` -> `server/.env`
2. set `OPENAI_API_KEY`
3. run `npm run dev`
4. open `http://localhost:5173`

## Cloud deploy (Render)
1. Push branch to GitHub (done).
2. In Render, create a **Blueprint** deployment from this repo.
3. Render will read `render.yaml` and create service `mood-music-agent`.
4. Set `OPENAI_API_KEY` in Render env vars.
5. After deploy, open Render URL directly.

## Notes
- Local music files are optional.
- If no local mp3 exists, app auto-falls back to online music + iTunes previews.
