import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

const moodLabel = {
  happy: '开心',
  sad: '难过',
  anxious: '焦虑',
  calm: '平静',
  angry: '生气'
};

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '今天想聊聊什么？你也可以按住麦克风说。' }
  ]);
  const [text, setText] = useState('');
  const [mood, setMood] = useState('calm');
  const [confidence, setConfidence] = useState(0.5);
  const [sessionId, setSessionId] = useState('');
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [busy, setBusy] = useState(false);
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  const currentTrack = queue[currentIndex] || null;

  const theme = useMemo(() => {
    const palette = {
      happy: ['#ff8a3d', '#ffd166', '#fff0d9'],
      sad: ['#4f6f8f', '#88c0d0', '#e6edf5'],
      anxious: ['#d97706', '#f59e0b', '#fff2d8'],
      calm: ['#2a9d8f', '#8ecae6', '#e3f5f2'],
      angry: ['#d62e3a', '#ff6b6b', '#ffe5e8']
    };
    return palette[mood] || palette.calm;
  }, [mood]);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    audioRef.current.src = currentTrack.url;
    audioRef.current.play().catch(() => {});
  }, [currentTrack]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText((prev) => `${prev} ${transcript}`.trim());
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  const playNext = async () => {
    if (!sessionId) return;
    try {
      const resp = await fetch(`/api/music/next?sessionId=${encodeURIComponent(sessionId)}`);
      if (!resp.ok) return;
      const data = await resp.json();
      const next = data.track;
      const index = queue.findIndex((item) => item.id === next.id);
      if (index >= 0) setCurrentIndex(index);
    } catch {
      // ignore
    }
  };

  const sendMessage = async () => {
    if (!text.trim() || busy) return;
    const userMsg = { role: 'user', content: text.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setText('');
    setBusy(true);

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userMsg.content, history, sessionId })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || '请求失败');

      setSessionId(data.sessionId);
      setMood(data.mood);
      setConfidence(data.confidence);
      setQueue(data.musicQueue || []);
      setCurrentIndex(0);
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `我这边短暂卡住了：${error.message}` }
      ]);
    } finally {
      setBusy(false);
    }
  };

  const toggleMic = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      alert('当前浏览器不支持语音识别，请使用 Chrome/Edge。');
      return;
    }

    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  };

  const onTrackError = () => {
    playNext();
  };

  return (
    <div className="app" style={{ '--c1': theme[0], '--c2': theme[1], '--c3': theme[2] }}>
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <main className="panel">
        <header>
          <h1>Mood Music Agent</h1>
          <p>当前情绪：{moodLabel[mood] || '平静'} · 置信度 {(confidence * 100).toFixed(0)}%</p>
        </header>

        <section className="chatbox">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              {m.content}
            </div>
          ))}
        </section>

        <section className="input-area">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="说说你现在的心情..."
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={toggleMic} className={listening ? 'active' : ''}>{listening ? '停止' : '麦克风'}</button>
          <button onClick={sendMessage} disabled={busy}>{busy ? '思考中...' : '发送'}</button>
        </section>

        <section className="player">
          <div className="cover" style={{ backgroundImage: `url(${currentTrack?.cover || ''})` }} />
          <div className="meta">
            <strong>{currentTrack?.title || '还没有歌曲'}</strong>
            <span>{currentTrack ? `${currentTrack.artist} · ${currentTrack.source}` : '发送一条消息后将自动推荐'}</span>
          </div>
          <div className="controls">
            <button onClick={() => audioRef.current?.pause()}>暂停</button>
            <button onClick={() => audioRef.current?.play()}>播放</button>
            <button onClick={playNext}>下一首</button>
          </div>
          <audio ref={audioRef} onEnded={playNext} onError={onTrackError} controls />
        </section>
      </main>
    </div>
  );
}

export default App;
