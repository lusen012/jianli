const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const moodProfiles = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'config', 'mood-profiles.json'), 'utf8')
);

const moodKeywords = {
  happy: ['开心', '高兴', '兴奋', '幸福', '快乐', '雀跃'],
  sad: ['难过', '伤心', '失落', '沮丧', '崩溃', '低落'],
  anxious: ['焦虑', '紧张', '害怕', '担心', '压力', '不安'],
  calm: ['平静', '放松', '舒缓', '安宁', '淡定', '惬意'],
  angry: ['生气', '愤怒', '烦躁', '火大', '恼火']
};

function fallbackMoodAnalysis(text) {
  const input = String(text || '');
  let best = { mood: 'calm', score: 0 };

  Object.entries(moodKeywords).forEach(([mood, words]) => {
    let score = 0;
    words.forEach((word) => {
      if (input.includes(word)) score += 1;
    });
    if (score > best.score) best = { mood, score };
  });

  const confidence = best.score > 0 ? Math.min(0.55 + best.score * 0.1, 0.92) : 0.5;
  const reasons = best.score > 0 ? [`命中关键词数量: ${best.score}`] : ['未命中明显关键词，使用默认平静心情'];

  return { mood: best.mood, confidence, reasons, source: 'rule-based' };
}

async function analyzeMood(text, openaiClient) {
  if (!openaiClient) return fallbackMoodAnalysis(text);

  try {
    const prompt = `你是情绪识别助手。\n请根据用户文本识别一个主情绪，并返回 JSON。\n可选 mood: happy, sad, anxious, calm, angry。\n返回格式: {"mood":"...","confidence":0-1,"reasons":["..."]}\n\n用户文本: ${text}`;

    const response = await openaiClient.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 220
    });

    const raw = (response.output_text || '').trim();
    const parsed = JSON.parse(raw);
    const mood = moodProfiles[parsed.mood] ? parsed.mood : 'calm';

    return {
      mood,
      confidence: Number(parsed.confidence) || 0.7,
      reasons: Array.isArray(parsed.reasons) ? parsed.reasons : ['模型未提供原因'],
      source: 'openai'
    };
  } catch (error) {
    return fallbackMoodAnalysis(text);
  }
}

async function generateReply({ text, mood, history, openaiClient }) {
  const profile = moodProfiles[mood] || moodProfiles.calm;

  if (!openaiClient) {
    return `${profile.replyPrefix} 我听到你说“${text}”。${profile.microAdvice}`;
  }

  try {
    const historyLines = (history || [])
      .slice(-6)
      .map((item) => `${item.role}: ${item.content}`)
      .join('\n');

    const input = `你是一个温柔、不过度说教的中文陪伴助手。\n当前识别心情: ${mood}\n风格要求: ${profile.style}\n建议方向: ${profile.microAdvice}\n\n最近对话:\n${historyLines}\n\n用户最新输入: ${text}\n\n请输出 1-2 句自然中文回复。`;

    const response = await openaiClient.responses.create({
      model: 'gpt-4.1-mini',
      input,
      temperature: 0.8,
      max_output_tokens: 180
    });

    return (response.output_text || '').trim() || `${profile.replyPrefix} ${profile.microAdvice}`;
  } catch (error) {
    return `${profile.replyPrefix} 我在这里陪你。${profile.microAdvice}`;
  }
}

function createOpenAIClient(apiKey) {
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

module.exports = {
  analyzeMood,
  generateReply,
  createOpenAIClient
};
