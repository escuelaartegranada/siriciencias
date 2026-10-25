import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory cache for generated TTS audio (key: voice:cleanText)
const audioCache = new Map<string, string>();

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Preload friendly child affirmations
const COMMON_PHRASES: Record<string, string> = {
  '¡Bien hecho!': '¡Bien hecho!',
  '¡Genial!': '¡Genial!',
  '¡Excelente deducción científica!': '¡Excelente deducción científica!',
  '¡Has ganado una estrella!': '¡Has ganado una estrella!',
};

// TTS API Endpoint using gemini-3.8-flash-lite-tts
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice = 'Puck', style = 'child' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'El texto es obligatorio' });
    }

    const cleanText = text.replace(/[*_#`~[\]]/g, '').trim();
    if (!cleanText) {
      return res.status(400).json({ error: 'Texto vacío' });
    }

    const cacheKey = `${voice}:${style}:${cleanText}`;
    if (audioCache.has(cacheKey)) {
      return res.json({ audio: audioCache.get(cacheKey), cached: true, format: 'audio/wav' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ error: 'GEMINI_API_KEY no disponible, usar fallback local' });
    }

    const ai = getGenAI();

    // Persona prompt for natural, expressive, sweet child/tutor voice
    let styleDescription = 'Habla como Tina, una niña alegre, dulce, risueña y entusiasta de 8 años en español, con voz tierna, humana y expresiva para una amiga de 7 años.';
    if (style === 'cheerful_kid') {
      styleDescription = 'Voz muy infantil, risueña, cariñosa y juguetona de una niña pequeña en español de España.';
    } else if (style === 'tutor') {
      styleDescription = 'Voz cálida, dulce y motivadora de una joven maestra de ciencias de primaria, clara y alegre.';
    }

    // Call Gemini 3.8 Flash Lite TTS
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                style: styleDescription,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            // 'Puck' is lively & youthful; 'Kore' is sweet & clear; 'Zephyr' is soft
            prebuiltVoiceConfig: { voiceName: voice || 'Puck' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'No se generó audio' });
    }

    // Cache management (max 250 items)
    if (audioCache.size > 250) {
      const oldestKey = audioCache.keys().next().value;
      if (oldestKey) audioCache.delete(oldestKey);
    }
    audioCache.set(cacheKey, base64Audio);

    return res.json({ audio: base64Audio, format: 'audio/wav', cached: false });
  } catch (error: any) {
    console.error('Error en /api/tts:', error?.message || error);
    return res.status(500).json({ error: error?.message || 'Error generando voz con IA' });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Servidor de Ciencias escuchando en http://0.0.0.0:${PORT}`);
  });
}

startServer();
