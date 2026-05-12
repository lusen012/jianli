const fs = require('fs');
const path = require('path');

const musicLibrary = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'config', 'music-library.json'), 'utf8')
);

const moodSearchTerms = {
  happy: ['happy pop', 'feel good', 'upbeat'],
  sad: ['sad piano', 'melancholy', 'emotional'],
  anxious: ['calm meditation', 'ambient relax', 'focus breathe'],
  calm: ['lofi chill', 'ambient calm', 'soft acoustic'],
  angry: ['rock energy', 'intense instrumental', 'drum and bass']
};

function resolveMusicRoot() {
  const configured = process.env.LOCAL_MUSIC_DIR || '../music';
  return path.resolve(__dirname, configured);
}

function localUrlExists(track) {
  if (!track?.url || !track.url.startsWith('/music/')) return false;
  const fileName = track.url.replace('/music/', '');
  const fullPath = path.join(resolveMusicRoot(), fileName);
  return fs.existsSync(fullPath);
}

async function fetchItunesTracks(mood, limit = 3) {
  const terms = moodSearchTerms[mood] || moodSearchTerms.calm;
  const collected = [];

  for (const term of terms) {
    if (collected.length >= limit) break;

    try {
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=6`;
      const response = await fetch(url);
      if (!response.ok) continue;

      const data = await response.json();
      const mapped = (data.results || [])
        .filter((item) => item.previewUrl)
        .map((item) => ({
          id: `it-${item.trackId}`,
          title: item.trackName,
          artist: item.artistName,
          url: item.previewUrl,
          cover: item.artworkUrl100 || '',
          moods: [mood],
          source: 'online'
        }));

      mapped.forEach((track) => {
        if (collected.length < limit && !collected.find((t) => t.id === track.id)) {
          collected.push(track);
        }
      });
    } catch {
      // ignore fetch failures and keep fallback chain running
    }
  }

  return collected;
}

async function pickTracksByMood(mood) {
  const localTracks = musicLibrary.local
    .filter((t) => t.moods.includes(mood) && localUrlExists(t))
    .map((track) => ({ ...track, source: 'local' }));

  const staticOnlineTracks = musicLibrary.online
    .filter((t) => t.moods.includes(mood))
    .map((track) => ({ ...track, source: 'online' }));

  const queue = [];
  localTracks.slice(0, 3).forEach((track) => queue.push(track));

  if (queue.length < 3) {
    staticOnlineTracks.slice(0, 3 - queue.length).forEach((track) => queue.push(track));
  }

  if (queue.length < 3) {
    const dynamicOnline = await fetchItunesTracks(mood, 3 - queue.length);
    dynamicOnline.forEach((track) => queue.push(track));
  }

  if (queue.length === 0) {
    const fallback = await fetchItunesTracks('calm', 2);
    fallback.forEach((track) => queue.push(track));
  }

  return queue;
}

module.exports = { pickTracksByMood, fetchItunesTracks };
