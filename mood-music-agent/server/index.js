require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { randomUUID } = require('crypto');
const { analyzeMood, generateReply, createOpenAIClient } = require('./moodAgent');
const { pickTracksByMood } = require('./musicEngine');
const path = require('path');

const app = express();
const port = process.env.PORT || 8787;
const sessionQueues = new Map();
const openaiClient = createOpenAIClient(process.env.OPENAI_API_KEY);

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use('/music', express.static(process.env.LOCAL_MUSIC_DIR || '../music'));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, hasOpenAI: Boolean(openaiClient) });
});

app.get('/api/debug/music-root', async (req, res) => {
  const queue = await pickTracksByMood('calm');
  res.json({
    musicRoot: path.resolve(__dirname, process.env.LOCAL_MUSIC_DIR || '../music'),
    queue
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const text = String(req.body?.text || '').trim();
    const history = Array.isArray(req.body?.history) ? req.body.history : [];
    const sessionId = String(req.body?.sessionId || randomUUID());

    if (!text) return res.status(400).json({ error: 'text is required' });

    const moodResult = await analyzeMood(text, openaiClient);
    const reply = await generateReply({ text, mood: moodResult.mood, history, openaiClient });
    const musicQueue = await pickTracksByMood(moodResult.mood);

    sessionQueues.set(sessionId, { queue: musicQueue, index: 0 });
    res.json({ sessionId, reply, mood: moodResult.mood, confidence: moodResult.confidence, reasons: moodResult.reasons, musicQueue });
  } catch (error) {
    res.status(500).json({ error: 'internal_error', message: error.message });
  }
});

app.get('/api/music/next', (req, res) => {
  const sessionId = String(req.query.sessionId || '');
  const session = sessionQueues.get(sessionId);

  if (!session || session.queue.length === 0) return res.status(404).json({ error: 'no_queue' });

  session.index = (session.index + 1) % session.queue.length;
  sessionQueues.set(sessionId, session);
  res.json({ track: session.queue[session.index] });
});

app.listen(port, () => {
  console.log(`Mood Agent server running at http://localhost:${port}`);
});
