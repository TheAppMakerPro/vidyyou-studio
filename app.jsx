const { useState, useRef, useCallback, useEffect } = React;
const { Upload, Wand2, Image, User, Camera, Layers, Play, Download, Settings, Sparkles, X, ChevronRight, Loader2, Check, AlertCircle, Film, Palette, ImagePlus, RotateCcw, Pause, SkipForward, SkipBack, Zap, Eye, RefreshCw, ArrowRight, Lock, Unlock, MonitorPlay, SlidersHorizontal, Music, Mic, FileText, PlusCircle, Trash2, ChevronDown, ChevronUp, Volume2, VolumeX, Clapperboard } = (typeof LucideReact !== 'undefined' ? LucideReact : lucideReact);

/* ============================================================
   VIDYYOU STUDIO — AI Video + Music Video Suite
   ============================================================
   Beautiful dark-mode glassmorphism redesign.
   All original functionality preserved.
   ============================================================ */

// ── Constants ────────────────────────────────────────────────
const APP_ICON = "data:image/png;base64,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";

const HF_MODELS = {
  style: "timbrooks/instruct-pix2pix",
  bgRemove: "briaai/RMBG-2.0",
  imgGen: "black-forest-labs/FLUX.1-schnell",
};

const STYLE_PRESETS = [
  { id: "anime", label: "Anime", prompt: "transform into anime style, vibrant colors, cel shading", icon: "\u{1F38C}", color: "#E879F9" },
  { id: "pixar", label: "Pixar 3D", prompt: "transform into Pixar 3D animated style, smooth rendering, cinematic", icon: "\u{1F3AC}", color: "#60A5FA" },
  { id: "watercolor", label: "Watercolor", prompt: "transform into watercolor painting, soft brushstrokes", icon: "\u{1F3A8}", color: "#34D399" },
  { id: "comic", label: "Comic Book", prompt: "transform into comic book style, bold outlines, halftone", icon: "\u{1F4A5}", color: "#F97316" },
  { id: "cyberpunk", label: "Cyberpunk", prompt: "transform into cyberpunk, neon lights, futuristic, dark", icon: "\u{1F303}", color: "#A78BFA" },
  { id: "oilpaint", label: "Oil Painting", prompt: "transform into oil painting, thick brushstrokes, classical", icon: "\u{1F5BC}\uFE0F", color: "#FBBF24" },
  { id: "sketch", label: "Pencil Sketch", prompt: "transform into detailed pencil sketch, graphite, black and white", icon: "\u270F\uFE0F", color: "#94A3B8" },
  { id: "vintage", label: "Vintage Film", prompt: "transform into vintage 1970s film, warm tones, grain, retro", icon: "\u{1F4FD}\uFE0F", color: "#D97706" },
  { id: "lego", label: "LEGO", prompt: "transform into LEGO brick style, blocky, colorful plastic", icon: "\u{1F9F1}", color: "#EF4444" },
  { id: "ghibli", label: "Studio Ghibli", prompt: "transform into Ghibli anime, soft pastel, dreamy, whimsical", icon: "\u{1F338}", color: "#F472B6" },
  { id: "popart", label: "Pop Art", prompt: "transform into pop art, bold colors, screen print effect", icon: "\u{1F3AA}", color: "#F43F5E" },
  { id: "chibi", label: "3D Chibi", prompt: "transform into cute chibi 3D, big head, small body, adorable", icon: "\u{1F9F8}", color: "#FB923C" },
];

const MV_STYLES = [
  { id: "cinematic", label: "Cinematic", desc: "Dark, moody, film grain" },
  { id: "anime_mv", label: "Anime", desc: "Japanese animation aesthetic" },
  { id: "abstract", label: "Abstract", desc: "Mood textures & shapes" },
  { id: "retro", label: "Retro Wave", desc: "80s neon synthwave" },
  { id: "nature", label: "Nature", desc: "Landscapes & organic" },
  { id: "urban", label: "Urban", desc: "City streets & nightlife" },
  { id: "fantasy", label: "Fantasy", desc: "Magical & ethereal" },
  { id: "minimal", label: "Minimal", desc: "Clean, simple, elegant" },
];

const TRANSITIONS = ["crossfade", "wipe_left", "zoom_in", "zoom_out", "slide_up", "blur"];

// ── API Helpers ──────────────────────────────────────────────
const hfAPI = async (model, body, token, isJSON = false, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      if (isJSON) headers["Content-Type"] = "application/json";
      const res = await fetch(
        `https://api-inference.huggingface.co/models/${model}`,
        { method: "POST", headers, body: isJSON ? JSON.stringify(body) : body }
      );
      if (res.status === 503) {
        const data = await res.json();
        await new Promise(r => setTimeout(r, Math.min((data.estimated_time || 20) * 1000, 60000)));
        continue;
      }
      if (res.status === 429) { await new Promise(r => setTimeout(r, 5000 * (i + 1))); continue; }
      if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
      return await res.blob();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 3000));
    }
  }
};

const claudeAPI = async (systemPrompt, userPrompt) => {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "";
};

// ── Image Helpers ────────────────────────────────────────────
const blobToDataURL = (blob) => new Promise(res => {
  const r = new FileReader(); r.onloadend = () => res(r.result); r.readAsDataURL(blob);
});
const dataURLToBlob = async (url) => (await fetch(url)).blob();
const loadImage = (src) => new Promise((res, rej) => {
  const img = new window.Image(); img.crossOrigin = "anonymous";
  img.onload = () => res(img); img.onerror = rej; img.src = src;
});
const resizeFrame = async (dataURL, maxDim = 512) => {
  const img = await loadImage(dataURL);
  let w = img.width, h = img.height;
  if (w > maxDim || h > maxDim) { const s = maxDim / Math.max(w, h); w = Math.round(w * s); h = Math.round(h * s); }
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  c.getContext("2d").drawImage(img, 0, 0, w, h);
  return { dataURL: c.toDataURL("image/jpeg", 0.85), w, h };
};
const compositeImages = async (fg, bg, w, h) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const ctx = c.getContext("2d");
  ctx.drawImage(await loadImage(bg), 0, 0, w, h);
  ctx.drawImage(await loadImage(fg), 0, 0, w, h);
  return c.toDataURL("image/png");
};

// ── Audio Analysis (Web Audio API) ───────────────────────────
const analyzeAudio = async (audioFile) => {
  const actx = new (window.AudioContext || window.webkitAudioContext)();
  const arrayBuffer = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read audio file"));
    reader.readAsArrayBuffer(audioFile);
  });
  const buf = await actx.decodeAudioData(arrayBuffer);
  const data = buf.getChannelData(0);
  const sr = buf.sampleRate;
  const duration = buf.duration;
  const windowSize = Math.floor(sr * 0.05);
  const energies = [];
  for (let i = 0; i < data.length - windowSize; i += windowSize) {
    let e = 0;
    for (let j = 0; j < windowSize; j++) e += data[i + j] ** 2;
    energies.push(e / windowSize);
  }
  const avgE = energies.reduce((a, b) => a + b, 0) / energies.length;
  const beats = [];
  let lastBeat = -10;
  energies.forEach((e, i) => {
    if (e > avgE * 1.4 && i - lastBeat > 6) {
      beats.push((i * windowSize) / sr);
      lastBeat = i;
    }
  });
  const intervals = [];
  for (let i = 1; i < Math.min(beats.length, 40); i++) intervals.push(beats[i] - beats[i - 1]);
  const avgInterval = intervals.length ? intervals.reduce((a, b) => a + b) / intervals.length : 0.5;
  const bpm = avgInterval > 0 ? Math.round(60 / avgInterval) : 120;
  actx.close();
  return { duration, bpm, beats, sampleRate: sr };
};

// ── Ken Burns Animation Engine ───────────────────────────────
const renderMusicVideo = async (scenes, audioUrl, fps, onProgress) => {
  const W = 1280, H = 720;
  const canvas = document.createElement("canvas"); canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  const imgs = await Promise.all(scenes.map(s => loadImage(s.imageUrl)));
  const audio = document.createElement("audio");
  audio.src = audioUrl;
  audio.crossOrigin = "anonymous";
  await new Promise(r => { audio.oncanplaythrough = r; audio.load(); });
  const totalDuration = scenes.reduce((a, s) => a + s.duration, 0);
  const totalFrames = Math.floor(totalDuration * fps);
  const stream = canvas.captureStream(fps);
  const actx = new AudioContext();
  const source = actx.createMediaStreamDestination();
  const audioSource = actx.createMediaElementSource(audio);
  audioSource.connect(source);
  audioSource.connect(actx.destination);
  source.stream.getAudioTracks().forEach(t => stream.addTrack(t));
  const recorder = new MediaRecorder(stream, {
    mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
      ? "video/webm;codecs=vp9,opus" : "video/webm",
    videoBitsPerSecond: 4000000,
  });
  const chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  return new Promise((resolve) => {
    recorder.onstop = () => {
      audio.pause();
      actx.close();
      resolve(new Blob(chunks, { type: "video/webm" }));
    };
    recorder.start();
    audio.play();
    let frame = 0;
    const renderFrame = () => {
      if (frame >= totalFrames) { recorder.stop(); return; }
      const currentTime = frame / fps;
      let elapsed = 0;
      let sceneIdx = 0;
      for (let i = 0; i < scenes.length; i++) {
        if (currentTime < elapsed + scenes[i].duration) { sceneIdx = i; break; }
        elapsed += scenes[i].duration;
      }
      const scene = scenes[sceneIdx];
      const img = imgs[sceneIdx];
      const sceneProgress = (currentTime - elapsed) / scene.duration;
      const transitionDur = 0.15;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      const kb = scene.kenBurns || { startScale: 1.0, endScale: 1.15, panX: 0.02, panY: 0.01 };
      const scale = kb.startScale + (kb.endScale - kb.startScale) * sceneProgress;
      const panX = kb.panX * sceneProgress * W;
      const panY = kb.panY * sceneProgress * H;
      const drawW = W * scale;
      const drawH = H * scale;
      const drawX = (W - drawW) / 2 + panX;
      const drawY = (H - drawH) / 2 + panY;
      let alpha = 1;
      if (sceneProgress < transitionDur) alpha = sceneProgress / transitionDur;
      if (sceneProgress > 1 - transitionDur) alpha = (1 - sceneProgress) / transitionDur;
      alpha = Math.max(0, Math.min(1, alpha));
      ctx.globalAlpha = alpha;
      const imgAspect = img.width / img.height;
      const canvasAspect = W / H;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (imgAspect > canvasAspect) {
        sw = img.height * canvasAspect;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / canvasAspect;
        sy = (img.height - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, drawX, drawY, drawW, drawH);
      if (scene.lyrics) {
        ctx.globalAlpha = alpha * 0.95;
        const fontSize = 36;
        ctx.font = `600 ${fontSize}px 'Segoe UI', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const text = scene.lyrics;
        const textY = H * 0.82;
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillText(text, W / 2 + 2, textY + 2);
        ctx.fillStyle = "#fff";
        ctx.fillText(text, W / 2, textY);
      }
      ctx.globalAlpha = 1;
      frame++;
      onProgress(Math.round((frame / totalFrames) * 100));
      if (frame < totalFrames) {
        setTimeout(renderFrame, 1000 / fps);
      } else {
        setTimeout(() => recorder.stop(), 200);
      }
    };
    renderFrame();
  });
};


// ── Main App Component ───────────────────────────────────────
function VidyyouStudio() {
  // ── Global State ──
  const [hfToken, setHfToken] = useState(() => localStorage.getItem("vy_hf") || "");
  const [tokenLocked, setTokenLocked] = useState(() => !!(localStorage.getItem("vy_hf") || "").startsWith("hf_"));
  const [activeMode, setActiveMode] = useState("musicvideo");
  const [error, setError] = useState("");
  const [showSetup, setShowSetup] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // ── ReStyle / ReBackground State ──
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [frames, setFrames] = useState([]);
  const [processedFrames, setProcessedFrames] = useState([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [bgPrompt, setBgPrompt] = useState("");
  const [bgImageUrl, setBgImageUrl] = useState("");
  const [reVideoTab, setReVideoTab] = useState("restyle");
  const [vFps, setVFps] = useState(3);
  const [playback, setPlayback] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [videoDims, setVideoDims] = useState({ w: 512, h: 512 });

  // ── MusicVideo State ──
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioData, setAudioData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mvStyle, setMvStyle] = useState("cinematic");
  const [lyrics, setLyrics] = useState("");
  const [scenes, setScenes] = useState([]);
  const [isGeneratingStoryboard, setIsGeneratingStoryboard] = useState(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [mvProgress, setMvProgress] = useState(0);
  const [mvStatus, setMvStatus] = useState("");
  const [resultBlob, setResultBlob] = useState(null);
  const [resultUrl, setResultUrl] = useState("");
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [previewScene, setPreviewScene] = useState(0);
  const [aspectRatio, setAspectRatio] = useState("16:9");

  // ── LipSync State ──
  const [lsProvider, setLsProvider] = useState("synclabs");
  const [lsApiKeys, setLsApiKeys] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vy_ls") || "{}"); } catch { return {}; }
  });
  const [lsFaceImage, setLsFaceImage] = useState(null);
  const [lsFaceUrl, setLsFaceUrl] = useState("");
  const [lsAudioFile, setLsAudioFile] = useState(null);
  const [lsAudioUrl, setLsAudioUrl] = useState("");
  const [lsText, setLsText] = useState("");
  const [lsIsProcessing, setLsIsProcessing] = useState(false);
  const [lsResultUrl, setLsResultUrl] = useState("");
  const [lsStatus, setLsStatus] = useState("");
  const [lsJobId, setLsJobId] = useState("");

  const playIntervalRef = useRef(null);
  const audioRef = useRef(null);
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const bgInputRef = useRef(null);
  const lsFaceInputRef = useRef(null);
  const lsAudioInputRef = useRef(null);

  // ── LipSync Providers Config ──
  const LS_PROVIDERS = [
    { id: "synclabs", name: "Sync Labs", url: "https://sync.so", signupUrl: "https://sync.so/pricing", docsUrl: "https://docs.synclabs.so", pricing: "$5/mo free tier", desc: "Best quality zero-shot lip sync. YC-backed." },
    { id: "kling", name: "Kling AI", url: "https://fal.ai", signupUrl: "https://fal.ai/dashboard/keys", docsUrl: "https://fal.ai/models/fal-ai/kling-video/lipsync/audio-to-video/api", pricing: "$0.014/sec", desc: "Kling 3.0 lip sync via fal.ai. Best motion." },
    { id: "hedra", name: "Hedra", url: "https://www.hedra.com", signupUrl: "https://www.hedra.com", docsUrl: "https://docs.hedra.com", pricing: "Free tier", desc: "Character-3 model. Talking + singing avatars." },
    { id: "did", name: "D-ID", url: "https://www.d-id.com", signupUrl: "https://studio.d-id.com/sign-up", docsUrl: "https://docs.d-id.com/reference/get-started", pricing: "20 free credits", desc: "Talks API. 140+ languages. Enterprise grade." },
  ];

  // ── Save keys to localStorage ──
  const saveKeys = () => {
    localStorage.setItem("vy_hf", hfToken);
    localStorage.setItem("vy_ls", JSON.stringify(lsApiKeys));
    if (hfToken.startsWith("hf_")) { setTokenLocked(true); setShowSetup(false); setError(""); }
    setShowSettings(false);
  };

  // ── LipSync: Submit Job ──
  const submitLipSync = useCallback(async () => {
    const key = lsApiKeys[lsProvider];
    if (!key) { setError(`Enter your ${LS_PROVIDERS.find(p=>p.id===lsProvider).name} API key.`); return; }
    if (!lsFaceUrl && lsProvider !== "synclabs") { setError("Upload a face image."); return; }
    if (!lsAudioUrl && !lsText) { setError("Upload audio or enter text."); return; }
    setLsIsProcessing(true); setError(""); setLsResultUrl(""); setLsStatus("Submitting...");
    try {
      if (lsProvider === "synclabs") {
        const body = { model: "lipsync-2" };
        if (lsAudioUrl) body.audio_url = lsAudioUrl;
        if (lsFaceUrl) body.video_url = lsFaceUrl;
        const res = await fetch("https://api.synclabs.so/lipsync", {
          method: "POST",
          headers: { "x-api-key": key, "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`Sync Labs: ${res.status} ${await res.text()}`);
        const data = await res.json();
        setLsJobId(data.id);
        setLsStatus(`Job submitted! Polling...`);
        const pollResult = async (jobId) => {
          for (let i = 0; i < 60; i++) {
            await new Promise(r => setTimeout(r, 5000));
            const pr = await fetch(`https://api.synclabs.so/lipsync/${jobId}`, { headers: { "x-api-key": key } });
            const pd = await pr.json();
            if (pd.status === "COMPLETED") { setLsResultUrl(pd.video_url); setLsStatus("Done!"); return; }
            if (pd.status === "FAILED") throw new Error("Job failed.");
            setLsStatus(`Processing... (${pd.status})`);
          }
          throw new Error("Timed out after 5 minutes.");
        };
        await pollResult(data.id);
      } else if (lsProvider === "kling") {
        let imageUrl = lsFaceUrl;
        let audioDataUrl = lsAudioUrl;
        if (lsAudioFile) { audioDataUrl = await new Promise((resolve) => { const reader = new FileReader(); reader.onloadend = () => resolve(reader.result); reader.readAsDataURL(lsAudioFile); }); }
        if (lsFaceImage) { imageUrl = await new Promise((resolve) => { const reader = new FileReader(); reader.onloadend = () => resolve(reader.result); reader.readAsDataURL(lsFaceImage); }); }
        const res = await fetch("https://queue.fal.run/fal-ai/kling-video/lipsync/audio-to-video", {
          method: "POST",
          headers: { "Authorization": `Key ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: "Natural talking head, cinematic lighting", image_url: imageUrl, audio_url: audioDataUrl, duration: 5, aspect_ratio: "1:1" }),
        });
        if (!res.ok) throw new Error(`Kling/fal.ai: ${res.status} ${await res.text()}`);
        const data = await res.json();
        const requestId = data.request_id;
        if (requestId) {
          setLsStatus(`Job queued! Polling...`);
          for (let i = 0; i < 120; i++) {
            await new Promise(r => setTimeout(r, 5000));
            const pr = await fetch(`https://queue.fal.run/fal-ai/kling-video/lipsync/audio-to-video/requests/${requestId}/status`, { headers: { "Authorization": `Key ${key}` } });
            const pd = await pr.json();
            if (pd.status === "COMPLETED") {
              const rr = await fetch(`https://queue.fal.run/fal-ai/kling-video/lipsync/audio-to-video/requests/${requestId}`, { headers: { "Authorization": `Key ${key}` } });
              const rd = await rr.json();
              setLsResultUrl(rd.video?.url || rd.output?.video_url || "");
              setLsStatus("Done!"); break;
            }
            if (pd.status === "FAILED") throw new Error("Kling job failed: " + (pd.error || "Unknown error"));
            setLsStatus(`Processing... (${pd.status})`);
          }
        } else if (data.video?.url) {
          setLsResultUrl(data.video.url); setLsStatus("Done!");
        } else { throw new Error("Unexpected response format."); }
      } else if (lsProvider === "hedra") {
        const formData = new FormData();
        if (lsFaceImage) formData.append("image", lsFaceImage);
        if (lsAudioFile) formData.append("audio", lsAudioFile);
        if (lsText) formData.append("text", lsText);
        const res = await fetch("https://api.hedra.com/v1/characters", { method: "POST", headers: { "Authorization": `Bearer ${key}` }, body: formData });
        if (!res.ok) throw new Error(`Hedra: ${res.status} ${await res.text()}`);
        const data = await res.json();
        setLsStatus(`Job submitted! Polling...`);
        for (let i = 0; i < 60; i++) {
          await new Promise(r => setTimeout(r, 5000));
          const pr = await fetch(`https://api.hedra.com/v1/characters/${data.id}`, { headers: { "Authorization": `Bearer ${key}` } });
          const pd = await pr.json();
          if (pd.status === "completed") { setLsResultUrl(pd.video_url); setLsStatus("Done!"); break; }
          if (pd.status === "failed") throw new Error("Job failed.");
          setLsStatus(`Processing... (${pd.status})`);
        }
      } else if (lsProvider === "did") {
        const body = { source_url: lsFaceUrl, script: {} };
        if (lsAudioUrl) { body.script = { type: "audio", audio_url: lsAudioUrl }; } else { body.script = { type: "text", input: lsText }; }
        const res = await fetch("https://api.d-id.com/talks", { method: "POST", headers: { "Authorization": `Basic ${btoa(key + ":")}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
        if (!res.ok) throw new Error(`D-ID: ${res.status} ${await res.text()}`);
        const data = await res.json();
        setLsStatus(`Job submitted! Polling...`);
        for (let i = 0; i < 60; i++) {
          await new Promise(r => setTimeout(r, 4000));
          const pr = await fetch(`https://api.d-id.com/talks/${data.id}`, { headers: { "Authorization": `Basic ${btoa(key + ":")}` } });
          const pd = await pr.json();
          if (pd.status === "done") { setLsResultUrl(pd.result_url); setLsStatus("Done!"); break; }
          if (pd.status === "error") throw new Error("Job failed.");
          setLsStatus(`Processing... (${pd.status})`);
        }
      }
    } catch (e) { setError(`LipSync: ${e.message}`); setLsStatus("Failed."); }
    finally { setLsIsProcessing(false); }
  }, [lsProvider, lsApiKeys, lsFaceUrl, lsFaceImage, lsAudioUrl, lsAudioFile, lsText]);

  // ── ReVideo: Frame Extraction ──
  const extractFrames = useCallback(async () => {
    if (!videoUrl) return;
    setIsExtracting(true); setError(""); setFrames([]); setProcessedFrames([]);
    try {
      const video = document.createElement("video");
      video.muted = true; video.playsInline = true; video.preload = "auto"; video.crossOrigin = "anonymous"; video.src = videoUrl;
      await new Promise((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = () => reject(new Error("Video could not be loaded."));
        setTimeout(() => reject(new Error("Video load timed out.")), 15000);
      });
      if (video.readyState < 2) {
        await new Promise((resolve, reject) => {
          video.oncanplay = () => resolve();
          video.onerror = () => reject(new Error("Video data could not load."));
          setTimeout(() => resolve(), 5000);
        });
      }
      const w = video.videoWidth || 640, h = video.videoHeight || 360;
      setVideoDims({ w, h });
      const canvas = document.createElement("canvas"); canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d");
      const dur = video.duration, interval = 1 / vFps;
      const extracted = [], maxF = Math.min(Math.floor(dur * vFps), 60);
      for (let i = 0; i < maxF; i++) {
        const t = i * interval; if (t >= dur) break;
        video.currentTime = t;
        await new Promise((resolve) => {
          const onSeeked = () => { video.removeEventListener("seeked", onSeeked); resolve(); };
          video.addEventListener("seeked", onSeeked);
          setTimeout(resolve, 2000);
        });
        await new Promise(r => setTimeout(r, 50));
        ctx.drawImage(video, 0, 0, w, h);
        extracted.push(canvas.toDataURL("image/jpeg", 0.85));
        setProgress(Math.round(((i + 1) / maxF) * 100));
        setStatusMsg(`Extracting frame ${i + 1}/${maxF}...`);
      }
      setFrames(extracted); setProgress(100);
      setStatusMsg(`${extracted.length} frames extracted!`);
    } catch (e) { setError(`Extraction failed: ${e.message}`); }
    finally { setIsExtracting(false); }
  }, [videoUrl, vFps]);

  // ── ReVideo: Process ReStyle ──
  const processReStyle = useCallback(async () => {
    if (!frames.length || !hfToken) return;
    const prompt = selectedStyle ? STYLE_PRESETS.find(s => s.id === selectedStyle)?.prompt : customPrompt;
    if (!prompt) { setError("Select a style or enter a prompt."); return; }
    setIsProcessing(true); setProcessedFrames([]); setError("");
    const results = [];
    for (let i = 0; i < frames.length; i++) {
      try {
        setStatusMsg(`ReStyle: Frame ${i + 1}/${frames.length}...`);
        setProgress(Math.round((i / frames.length) * 100));
        const { dataURL: resized } = await resizeFrame(frames[i], 512);
        const base64 = resized.split(",")[1];
        const blob = await hfAPI(HF_MODELS.style,
          { inputs: { image: base64, prompt }, parameters: { num_inference_steps: 15, image_guidance_scale: 1.2, guidance_scale: 7 } },
          hfToken, true);
        results.push(await blobToDataURL(blob));
        setProcessedFrames([...results]);
        if (i < frames.length - 1) await new Promise(r => setTimeout(r, 1000));
      } catch (e) { setError(`Frame ${i + 1}: ${e.message}`); break; }
    }
    setProgress(100); setStatusMsg(`Done! ${results.length} frames.`); setIsProcessing(false);
  }, [frames, hfToken, selectedStyle, customPrompt]);

  // ── ReVideo: Process ReBackground ──
  const processReBackground = useCallback(async () => {
    if (!frames.length || !hfToken || (!bgImageUrl && !bgPrompt)) return;
    setIsProcessing(true); setProcessedFrames([]); setError("");
    const results = [];
    let genBgUrl = bgImageUrl;
    if (!genBgUrl && bgPrompt) {
      try {
        setStatusMsg("Generating background...");
        const blob = await hfAPI(HF_MODELS.imgGen, { inputs: bgPrompt }, hfToken, true);
        genBgUrl = await blobToDataURL(blob);
      } catch (e) { setError(`BG gen failed: ${e.message}`); setIsProcessing(false); return; }
    }
    for (let i = 0; i < frames.length; i++) {
      try {
        setStatusMsg(`ReBackground: Frame ${i + 1}/${frames.length}...`);
        setProgress(Math.round((i / frames.length) * 100));
        const { dataURL: resized, w, h } = await resizeFrame(frames[i], 512);
        const fgBlob = await hfAPI(HF_MODELS.bgRemove, await dataURLToBlob(resized), hfToken, false);
        const comp = await compositeImages(await blobToDataURL(fgBlob), genBgUrl, w, h);
        results.push(comp); setProcessedFrames([...results]);
        if (i < frames.length - 1) await new Promise(r => setTimeout(r, 800));
      } catch (e) { setError(`Frame ${i + 1}: ${e.message}`); break; }
    }
    setProgress(100); setStatusMsg(`Done! ${results.length} frames.`); setIsProcessing(false);
  }, [frames, hfToken, bgImageUrl, bgPrompt, videoDims]);

  // ── ReVideo: Playback ──
  useEffect(() => {
    if (playback && processedFrames.length > 1) {
      playIntervalRef.current = setInterval(() => setCurrentFrame(p => (p + 1) % processedFrames.length), 1000 / vFps);
    } else clearInterval(playIntervalRef.current);
    return () => clearInterval(playIntervalRef.current);
  }, [playback, processedFrames.length, vFps]);

  // ── ReVideo: Download ──
  const downloadReVideo = useCallback(async () => {
    if (!processedFrames.length) return;
    setStatusMsg("Encoding...");
    const c = document.createElement("canvas");
    const fi = await loadImage(processedFrames[0]); c.width = fi.width; c.height = fi.height;
    const ctx = c.getContext("2d");
    const stream = c.captureStream(vFps);
    const rec = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9", videoBitsPerSecond: 2500000 });
    const ch = []; rec.ondataavailable = e => ch.push(e.data);
    rec.onstop = () => { const b = new Blob(ch, { type: "video/webm" }); const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = `vidyyou_${Date.now()}.webm`; a.click(); setStatusMsg("Downloaded!"); };
    rec.start();
    for (const f of processedFrames) { const img = await loadImage(f); ctx.clearRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0, c.width, c.height); await new Promise(r => setTimeout(r, 1000 / vFps)); }
    await new Promise(r => setTimeout(r, 200)); rec.stop();
  }, [processedFrames, vFps]);

  // ── MusicVideo: Audio Upload + Analysis ──
  const handleAudioUpload = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setAudioFile(file);
    const url = URL.createObjectURL(file);
    setAudioUrl(url); setIsAnalyzing(true); setError("");
    setMvStatus("Analyzing audio...");
    try {
      const data = await analyzeAudio(file);
      setAudioData(data);
      setMvStatus(`${Math.round(data.duration)}s, ~${data.bpm} BPM, ${data.beats.length} beats`);
    } catch (e) { setError(`Audio analysis: ${e.message}`); }
    finally { setIsAnalyzing(false); }
  };

  // ── MusicVideo: Generate Storyboard with Claude ──
  const generateStoryboard = useCallback(async () => {
    if (!audioData) return;
    setIsGeneratingStoryboard(true); setError(""); setMvStatus("AI creating storyboard...");
    try {
      const style = MV_STYLES.find(s => s.id === mvStyle);
      const numScenes = Math.max(3, Math.min(12, Math.floor(audioData.duration / 8)));
      const sceneDur = audioData.duration / numScenes;
      const systemPrompt = `You are a music video director AI. Generate a storyboard as a JSON array. Each scene has: "prompt" (detailed image generation prompt, max 80 words, must include "${style.label}" style), "lyrics" (short lyric line to overlay, max 10 words, or empty string), "kenBurns" object with "startScale" (1.0-1.1), "endScale" (1.1-1.25), "panX" (-0.03 to 0.03), "panY" (-0.02 to 0.02). Respond ONLY with the JSON array, no markdown, no explanation.`;
      const userPrompt = `Create ${numScenes} scenes for a ${style.label} style music video. Duration: ${Math.round(audioData.duration)}s, BPM: ${audioData.bpm}. Each scene is ~${Math.round(sceneDur)}s. ${lyrics ? `Lyrics:\n${lyrics}` : "No lyrics provided."}. Visual style: ${style.desc}. Make each scene distinct but cohesive.`;
      const result = await claudeAPI(systemPrompt, userPrompt);
      let parsed;
      try { const clean = result.replace(/```json|```/g, "").trim(); parsed = JSON.parse(clean); }
      catch { throw new Error("Failed to parse storyboard. Try again."); }
      const newScenes = parsed.map((s, i) => ({
        id: i, prompt: s.prompt, lyrics: s.lyrics || "",
        duration: sceneDur, imageUrl: null, generating: false,
        kenBurns: s.kenBurns || { startScale: 1.0, endScale: 1.15, panX: 0.02, panY: 0.01 },
      }));
      setScenes(newScenes);
      setMvStatus(`${newScenes.length} scenes planned!`);
    } catch (e) { setError(`Storyboard: ${e.message}`); }
    finally { setIsGeneratingStoryboard(false); }
  }, [audioData, mvStyle, lyrics]);

  // ── MusicVideo: Generate Images ──
  const generateSceneImages = useCallback(async () => {
    if (!scenes.length || !hfToken) return;
    setIsGeneratingImages(true); setError("");
    const updated = [...scenes];
    for (let i = 0; i < updated.length; i++) {
      try {
        setMvStatus(`Generating scene ${i + 1}/${updated.length}...`);
        setMvProgress(Math.round((i / updated.length) * 100));
        updated[i].generating = true; setScenes([...updated]);
        const blob = await hfAPI(HF_MODELS.imgGen, { inputs: updated[i].prompt, parameters: { width: 1024, height: 576 } }, hfToken, true);
        updated[i].imageUrl = await blobToDataURL(blob);
        updated[i].generating = false; setScenes([...updated]);
        if (i < updated.length - 1) await new Promise(r => setTimeout(r, 1500));
      } catch (e) { setError(`Scene ${i + 1}: ${e.message}`); updated[i].generating = false; break; }
    }
    setMvProgress(100); setMvStatus("All images generated!");
    setIsGeneratingImages(false);
  }, [scenes, hfToken]);

  // ── MusicVideo: Render Final Video ──
  const renderMV = useCallback(async () => {
    const ready = scenes.filter(s => s.imageUrl);
    if (!ready.length || !audioUrl) return;
    setIsRendering(true); setError(""); setMvStatus("Rendering...");
    try {
      const blob = await renderMusicVideo(ready, audioUrl, 24, setMvProgress);
      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
      setMvStatus("Render complete!");
    } catch (e) { setError(`Render: ${e.message}`); }
    finally { setIsRendering(false); }
  }, [scenes, audioUrl]);

  // ── Scene Editor Helpers ──
  const updateScene = (idx, key, val) => { const u = [...scenes]; u[idx] = { ...u[idx], [key]: val }; setScenes(u); };
  const removeScene = (idx) => setScenes(scenes.filter((_, i) => i !== idx));
  const addScene = () => setScenes([...scenes, { id: scenes.length, prompt: "", lyrics: "", duration: 6, imageUrl: null, generating: false, kenBurns: { startScale: 1.0, endScale: 1.15, panX: 0.02, panY: 0.01 } }]);
  const regenerateSceneImage = async (idx) => {
    if (!hfToken || !scenes[idx].prompt) return;
    const u = [...scenes]; u[idx].generating = true; setScenes([...u]);
    try { const blob = await hfAPI(HF_MODELS.imgGen, { inputs: u[idx].prompt, parameters: { width: 1024, height: 576 } }, hfToken, true); u[idx].imageUrl = await blobToDataURL(blob); }
    catch (e) { setError(`Regen scene ${idx + 1}: ${e.message}`); }
    u[idx].generating = false; setScenes([...u]);
  };

  // ── Preview Playback ──
  useEffect(() => {
    const readyScenes = scenes.filter(s => s.imageUrl);
    if (previewPlaying && readyScenes.length > 1) {
      const dur = readyScenes[previewScene]?.duration || 4;
      playIntervalRef.current = setTimeout(() => setPreviewScene(p => (p + 1) % readyScenes.length), dur * 1000);
    }
    return () => clearTimeout(playIntervalRef.current);
  }, [previewPlaying, previewScene, scenes]);

  // ── Mode Tabs ──
  const modes = [
    { id: "musicvideo", label: "MusicVideo", icon: Music, desc: "AI Music Video" },
    { id: "lipsync", label: "LipSync", icon: Mic, desc: "AI Talking Avatars" },
    { id: "revideo", label: "ReVideo", icon: Film, desc: "ReStyle & ReBackground" },
  ];

  // ── Render ──
  return (
    <div className="vy-app">
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* ── HEADER ── */}
      <header className="vy-header">
        <div className="vy-header-left">
          <div className="vy-logo-wrap">
            <img src={APP_ICON} alt="V" className="vy-logo" />
          </div>
          <div>
            <h1 className="vy-title">VIDYYOU <span className="vy-title-sub">STUDIO</span></h1>
            <p className="vy-tagline">AI VIDEO CREATION SUITE</p>
          </div>
        </div>
        <div className="vy-header-right">
          {tokenLocked && (
            <div className="vy-key-badge">
              <Check size={11} />
              <span>{[hfToken && "HF", lsApiKeys.synclabs && "Sync", lsApiKeys.kling && "Kling", lsApiKeys.hedra && "Hedra", lsApiKeys.did && "D-ID"].filter(Boolean).join(" \u00B7 ") || "Ready"}</span>
            </div>
          )}
          <button onClick={() => setShowSettings(!showSettings)} className={`vy-icon-btn ${showSettings ? "active" : ""}`}>
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* ── SETTINGS PANEL ── */}
      {showSettings && (
        <div className="vy-settings-wrap">
          <div className="vy-card vy-settings-card">
            <div className="vy-settings-header">
              <div className="vy-flex-center" style={{gap:8}}>
                <Settings size={16} style={{color:"#818cf8"}} />
                <span className="vy-heading-sm">API Configuration</span>
              </div>
              <button onClick={saveKeys} className="vy-btn vy-btn-success">
                <Lock size={13} /> Save & Lock
              </button>
            </div>
            <div className="vy-settings-body">
              {/* HuggingFace */}
              <div className="vy-key-row">
                <div className="vy-key-label">
                  <div className={`vy-dot ${hfToken.startsWith("hf_") ? "green" : "red"}`} />
                  <strong>HuggingFace</strong>
                  <span className="vy-badge-required">REQUIRED</span>
                  <span className="vy-text-muted" style={{marginLeft:"auto",fontSize:11}}>Free</span>
                </div>
                <div className="vy-key-input-row">
                  <input type="password" value={hfToken} onChange={e => setHfToken(e.target.value)} placeholder="hf_..." className="vy-input" />
                  <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="vy-btn-outline-sm">Get Key</a>
                </div>
              </div>

              <div className="vy-divider" />
              <p className="vy-text-muted" style={{marginBottom:12,fontSize:12,fontWeight:500}}>LIP SYNC PROVIDERS (optional)</p>

              {[
                { key: "synclabs", label: "Sync Labs", hint: "$5/mo", signupUrl: "https://sync.so/pricing", docsUrl: "https://docs.synclabs.so" },
                { key: "kling", label: "Kling AI", hint: "$0.014/sec via fal.ai", signupUrl: "https://fal.ai/dashboard/keys", docsUrl: "https://fal.ai/models/fal-ai/kling-video/lipsync/audio-to-video/api" },
                { key: "hedra", label: "Hedra", hint: "Free tier", signupUrl: "https://www.hedra.com", docsUrl: "https://docs.hedra.com" },
                { key: "did", label: "D-ID", hint: "20 free credits", signupUrl: "https://studio.d-id.com/sign-up", docsUrl: "https://docs.d-id.com/reference/get-started" },
              ].map(p => (
                <div key={p.key} className="vy-key-row">
                  <div className="vy-key-label">
                    <div className={`vy-dot ${lsApiKeys[p.key] ? "green" : "dim"}`} />
                    <strong>{p.label}</strong>
                    <span className="vy-text-muted" style={{fontSize:11}}>{p.hint}</span>
                  </div>
                  <div className="vy-key-input-row">
                    <input type="password" value={lsApiKeys[p.key] || ""} onChange={e => setLsApiKeys({...lsApiKeys, [p.key]: e.target.value})} placeholder={`${p.label} API key...`} className="vy-input" />
                    <a href={p.signupUrl} target="_blank" rel="noopener noreferrer" className="vy-btn-outline-sm vy-accent">Sign Up</a>
                    <a href={p.docsUrl} target="_blank" rel="noopener noreferrer" className="vy-btn-outline-sm">Docs</a>
                  </div>
                </div>
              ))}

              <div className="vy-divider" />
              <p className="vy-text-muted" style={{textAlign:"center",fontSize:11}}>Keys stay in your browser only. Never sent anywhere except the API provider.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── SETUP GUIDE ── */}
      {showSetup && !tokenLocked && !showSettings && (
        <div className="vy-container" style={{maxWidth:700,marginTop:32}}>
          <div className="vy-card vy-glass">
            <div className="vy-flex-center" style={{gap:10,marginBottom:14}}>
              <Zap size={20} style={{color:"#818cf8"}} />
              <h2 className="vy-heading-sm" style={{margin:0}}>Welcome to Vidyyou Studio</h2>
            </div>
            <p className="vy-text-secondary" style={{lineHeight:1.7}}>
              Click the <strong style={{color:"#e0e7ff"}}>gear icon</strong> above to set up your API keys. A free HuggingFace token is all you need to start. Lip sync providers are optional.
            </p>
          </div>
        </div>
      )}

      {/* ── MAIN WORKSPACE ── */}
      {tokenLocked && (
        <div className="vy-container">
          {error && (
            <div className="vy-error-bar">
              <AlertCircle size={15} />
              <span style={{flex:1}}>{error}</span>
              <button onClick={() => setError("")} className="vy-icon-btn-sm"><X size={13} /></button>
            </div>
          )}

          {/* ── MODE SELECTOR ── */}
          <div className="vy-mode-bar">
            {modes.map(m => {
              const Icon = m.icon; const active = activeMode === m.id;
              return (
                <button key={m.id} onClick={() => setActiveMode(m.id)} className={`vy-mode-tab ${active ? "active" : ""}`}>
                  <Icon size={18} />
                  <span className="vy-mode-label">{m.label}</span>
                  <span className="vy-mode-desc">{m.desc}</span>
                </button>
              );
            })}
          </div>

          {/* ══════ MUSIC VIDEO MODE ══════ */}
          {activeMode === "musicvideo" && (
            <div className="vy-mode-content">
              {/* Step 1: Audio Upload */}
              <div className="vy-card">
                <div className="vy-card-header">
                  <div className="vy-step-badge">1</div>
                  <span className="vy-heading-sm">Upload Music</span>
                  {audioData && <span className="vy-badge-success">{mvStatus}</span>}
                </div>
                <div className="vy-card-body">
                  {!audioUrl ? (
                    <label className="vy-drop-zone">
                      <input ref={audioInputRef} type="file" accept="audio/*" onChange={handleAudioUpload} style={{display:"none"}} />
                      <Music size={36} strokeWidth={1.2} style={{color:"#4b5563"}} />
                      <p className="vy-drop-title">Drop your audio file or click to browse</p>
                      <p className="vy-drop-hint">MP3, WAV, OGG, M4A</p>
                      <button onClick={e => { e.preventDefault(); audioInputRef.current?.click(); }} className="vy-btn vy-btn-accent">Select Audio</button>
                    </label>
                  ) : (
                    <div className="vy-flex-center" style={{gap:12}}>
                      <audio ref={audioRef} src={audioUrl} controls className="vy-audio-player" />
                      <button onClick={() => { setAudioFile(null); setAudioUrl(""); setAudioData(null); setScenes([]); }} className="vy-icon-btn-sm"><X size={15} /></button>
                    </div>
                  )}
                  {isAnalyzing && (
                    <div className="vy-status-line">
                      <Loader2 size={15} className="vy-spin" /> Analyzing beats and rhythm...
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2: Style + Lyrics */}
              {audioData && (
                <div className="vy-card">
                  <div className="vy-card-header">
                    <div className="vy-step-badge">2</div>
                    <span className="vy-heading-sm">Style + Lyrics</span>
                  </div>
                  <div className="vy-card-body">
                    <p className="vy-label">Visual Style</p>
                    <div className="vy-grid-styles">
                      {MV_STYLES.map(s => (
                        <button key={s.id} onClick={() => setMvStyle(s.id)} className={`vy-style-chip ${mvStyle === s.id ? "active" : ""}`}>
                          <div className="vy-style-chip-label">{s.label}</div>
                          <div className="vy-style-chip-desc">{s.desc}</div>
                        </button>
                      ))}
                    </div>
                    <p className="vy-label" style={{marginTop:16}}>Lyrics (optional)</p>
                    <textarea value={lyrics} onChange={e => setLyrics(e.target.value)} placeholder="Paste lyrics here, or leave empty for abstract visuals..." rows={4} className="vy-textarea" />
                    <button onClick={generateStoryboard} disabled={isGeneratingStoryboard} className={`vy-btn vy-btn-accent vy-btn-full ${isGeneratingStoryboard ? "disabled" : ""}`}>
                      {isGeneratingStoryboard ? <><Loader2 size={16} className="vy-spin" />Creating storyboard...</> : <><Sparkles size={16} />Generate AI Storyboard</>}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Storyboard Editor */}
              {scenes.length > 0 && (
                <div className="vy-card">
                  <div className="vy-card-header" style={{justifyContent:"space-between"}}>
                    <div className="vy-flex-center" style={{gap:10}}>
                      <div className="vy-step-badge">3</div>
                      <span className="vy-heading-sm">Storyboard ({scenes.length} scenes)</span>
                    </div>
                    <div className="vy-flex-center" style={{gap:8}}>
                      <button onClick={addScene} className="vy-btn-outline-sm"><PlusCircle size={13} /> Add</button>
                      <button onClick={generateSceneImages} disabled={isGeneratingImages} className="vy-btn vy-btn-success vy-btn-sm">
                        {isGeneratingImages ? <><Loader2 size={13} className="vy-spin" />{Math.round(mvProgress)}%</> : <><Wand2 size={13} />Generate All Images</>}
                      </button>
                    </div>
                  </div>
                  <div className="vy-card-body" style={{maxHeight:480,overflowY:"auto"}}>
                    {scenes.map((scene, i) => (
                      <div key={i} className="vy-scene-row">
                        <div className="vy-scene-thumb">
                          {scene.imageUrl ? (
                            <>
                              <img src={scene.imageUrl} alt={`Scene ${i + 1}`} />
                              <button onClick={() => regenerateSceneImage(i)} className="vy-scene-regen"><RefreshCw size={11} /></button>
                            </>
                          ) : scene.generating ? (
                            <Loader2 size={18} className="vy-spin" style={{color:"#6b7280"}} />
                          ) : (
                            <Image size={18} style={{color:"#374151"}} />
                          )}
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div className="vy-scene-meta">
                            <span className="vy-scene-num">Scene {i + 1}</span>
                            <div className="vy-flex-center" style={{gap:6}}>
                              <span className="vy-text-muted" style={{fontSize:11}}>{scene.duration}s</span>
                              <input type="range" min={3} max={15} value={scene.duration} onChange={e => updateScene(i, "duration", Number(e.target.value))} className="vy-range-sm" />
                              <button onClick={() => removeScene(i)} className="vy-icon-btn-sm vy-danger"><Trash2 size={13} /></button>
                            </div>
                          </div>
                          <textarea value={scene.prompt} onChange={e => updateScene(i, "prompt", e.target.value)} rows={2} className="vy-textarea vy-textarea-sm" placeholder="Scene description..." />
                          <input value={scene.lyrics} onChange={e => updateScene(i, "lyrics", e.target.value)} placeholder="Lyric overlay (optional)" className="vy-input vy-input-sm" style={{marginTop:4}} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Render + Export */}
              {scenes.some(s => s.imageUrl) && (
                <div className="vy-card">
                  <div className="vy-card-header">
                    <div className="vy-step-badge">4</div>
                    <span className="vy-heading-sm">Preview + Render</span>
                  </div>
                  <div className="vy-card-body">
                    <div className="vy-preview-box">
                      {scenes.filter(s => s.imageUrl).length > 0 && (
                        <img src={scenes.filter(s => s.imageUrl)[previewScene % scenes.filter(s => s.imageUrl).length]?.imageUrl} alt="Preview" className="vy-preview-img" />
                      )}
                      {scenes.filter(s => s.imageUrl)[previewScene % scenes.filter(s => s.imageUrl).length]?.lyrics && (
                        <div className="vy-lyrics-overlay">
                          <span>{scenes.filter(s => s.imageUrl)[previewScene % scenes.filter(s => s.imageUrl).length]?.lyrics}</span>
                        </div>
                      )}
                    </div>
                    <div className="vy-playback-controls">
                      <button onClick={() => setPreviewScene(Math.max(0, previewScene - 1))} className="vy-play-btn-sm"><SkipBack size={13} /></button>
                      <button onClick={() => setPreviewPlaying(!previewPlaying)} className="vy-play-btn">
                        {previewPlaying ? <Pause size={16} /> : <Play size={16} style={{marginLeft:2}} />}
                      </button>
                      <button onClick={() => setPreviewScene(Math.min(scenes.filter(s => s.imageUrl).length - 1, previewScene + 1))} className="vy-play-btn-sm"><SkipForward size={13} /></button>
                      <span className="vy-text-muted" style={{fontSize:12}}>Scene {previewScene + 1}/{scenes.filter(s => s.imageUrl).length}</span>
                    </div>
                    <button onClick={renderMV} disabled={isRendering} className={`vy-btn vy-btn-render vy-btn-full ${isRendering ? "disabled" : ""}`}>
                      {isRendering ? <><Loader2 size={16} className="vy-spin" />Rendering ({mvProgress}%)...</> : <><Film size={16} />Render Music Video</>}
                    </button>
                    {isRendering && (
                      <div className="vy-progress-bar"><div className="vy-progress-fill vy-progress-render" style={{width:`${mvProgress}%`}} /></div>
                    )}
                    {resultUrl && (
                      <div style={{marginTop:16}}>
                        <video src={resultUrl} controls className="vy-video-result" />
                        <button onClick={() => { const a = document.createElement("a"); a.href = resultUrl; a.download = `musicvideo_${Date.now()}.webm`; a.click(); }} className="vy-btn vy-btn-accent vy-btn-full" style={{marginTop:10}}>
                          <Download size={15} /> Download .webm
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════ LIPSYNC MODE ══════ */}
          {activeMode === "lipsync" && (
            <div className="vy-mode-content">
              {/* Provider Selection */}
              <div className="vy-card">
                <div className="vy-card-header">
                  <div className="vy-step-badge vy-violet">1</div>
                  <span className="vy-heading-sm">Choose Provider</span>
                </div>
                <div className="vy-card-body">
                  <div className="vy-grid-providers">
                    {LS_PROVIDERS.map(p => (
                      <button key={p.id} onClick={() => setLsProvider(p.id)} className={`vy-provider-card ${lsProvider === p.id ? "active" : ""}`}>
                        <div className="vy-provider-name">{p.name}</div>
                        <div className="vy-provider-price">{p.pricing}</div>
                        <div className="vy-provider-desc">{p.desc}</div>
                        <div className="vy-flex-center" style={{gap:6,marginTop:8}}>
                          <a href={p.signupUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="vy-btn vy-btn-accent vy-btn-xs">Sign Up</a>
                          <a href={p.docsUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="vy-btn-outline-xs">Docs</a>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="vy-key-status-bar">
                    <div className="vy-flex-center" style={{gap:8}}>
                      <div className={`vy-dot ${lsApiKeys[lsProvider] ? "green" : "red"}`} />
                      <span style={{fontSize:12,fontWeight:500,color:lsApiKeys[lsProvider]?"#34d399":"#f87171"}}>
                        {lsApiKeys[lsProvider] ? `${LS_PROVIDERS.find(p=>p.id===lsProvider)?.name} connected` : `Key not set`}
                      </span>
                    </div>
                    <button onClick={() => setShowSettings(true)} className="vy-btn-outline-sm"><Settings size={13} /> Settings</button>
                  </div>
                </div>
              </div>

              {/* Step 2: Face Image */}
              <div className="vy-card">
                <div className="vy-card-header">
                  <div className="vy-step-badge vy-violet">2</div>
                  <span className="vy-heading-sm">Face / Character Image</span>
                </div>
                <div className="vy-card-body">
                  <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                    <label className="vy-face-upload">
                      <input ref={lsFaceInputRef} type="file" accept="image/*" onChange={e => {
                        const f = e.target.files?.[0]; if (!f) return;
                        setLsFaceImage(f); setLsFaceUrl(URL.createObjectURL(f));
                      }} style={{display:"none"}} />
                      {lsFaceUrl ? (
                        <img src={lsFaceUrl} alt="Face" className="vy-face-preview" />
                      ) : (
                        <><User size={30} strokeWidth={1.2} style={{color:"#4b5563"}} /><span className="vy-drop-hint" style={{marginTop:6}}>Upload face</span></>
                      )}
                    </label>
                    <div className="vy-text-secondary" style={{flex:1,fontSize:13,lineHeight:1.7}}>
                      <p style={{fontWeight:600,color:"#d1d5db",margin:"0 0 6px"}}>Tips for best results:</p>
                      <p style={{margin:"0 0 3px"}}>Clear, well-lit face facing forward</p>
                      <p style={{margin:"0 0 3px"}}>512x512px minimum</p>
                      <p style={{margin:"0 0 3px"}}>Works with photos, AI faces, anime</p>
                      {lsFaceUrl && <button onClick={() => { setLsFaceImage(null); setLsFaceUrl(""); }} className="vy-btn-outline-sm" style={{marginTop:8}}>Remove</button>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Audio / Text */}
              <div className="vy-card">
                <div className="vy-card-header">
                  <div className="vy-step-badge vy-violet">3</div>
                  <span className="vy-heading-sm">Audio or Text Script</span>
                </div>
                <div className="vy-card-body">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                    <div>
                      <p className="vy-label">Upload Audio</p>
                      <label className="vy-drop-zone vy-drop-zone-sm">
                        <input ref={lsAudioInputRef} type="file" accept="audio/*" onChange={e => {
                          const f = e.target.files?.[0]; if (!f) return;
                          setLsAudioFile(f); setLsAudioUrl(URL.createObjectURL(f)); setLsText("");
                        }} style={{display:"none"}} />
                        {lsAudioUrl ? (
                          <div style={{width:"100%"}}>
                            <audio src={lsAudioUrl} controls className="vy-audio-player" />
                            <button onClick={e => { e.preventDefault(); setLsAudioFile(null); setLsAudioUrl(""); }} className="vy-btn-outline-sm" style={{marginTop:6}}>Remove</button>
                          </div>
                        ) : (
                          <><Volume2 size={22} style={{color:"#4b5563"}} /><span className="vy-drop-hint" style={{marginTop:4}}>MP3, WAV, M4A</span></>
                        )}
                      </label>
                    </div>
                    <div>
                      <p className="vy-label">
                        Or Type Script {(lsProvider === "synclabs" || lsProvider === "kling") && <span className="vy-text-muted">(audio required)</span>}
                      </p>
                      <textarea
                        value={lsText}
                        onChange={e => { setLsText(e.target.value); setLsAudioUrl(""); setLsAudioFile(null); }}
                        placeholder="Type what the character should say..."
                        rows={5}
                        disabled={lsProvider === "synclabs" || lsProvider === "kling"}
                        className={`vy-textarea ${(lsProvider === "synclabs" || lsProvider === "kling") ? "vy-disabled" : ""}`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Generate */}
              <div className="vy-card">
                <div className="vy-card-header">
                  <div className="vy-step-badge vy-violet">4</div>
                  <span className="vy-heading-sm">Generate</span>
                </div>
                <div className="vy-card-body">
                  <button onClick={submitLipSync} disabled={lsIsProcessing || !lsApiKeys[lsProvider] || (!lsAudioUrl && !lsText)} className={`vy-btn vy-btn-violet vy-btn-full ${(lsIsProcessing || !lsApiKeys[lsProvider] || (!lsAudioUrl && !lsText)) ? "disabled" : ""}`}>
                    {lsIsProcessing ? <><Loader2 size={16} className="vy-spin" />{lsStatus}</> : <><Mic size={16} />Generate with {LS_PROVIDERS.find(p=>p.id===lsProvider)?.name}</>}
                  </button>
                  {lsStatus && !lsIsProcessing && (
                    <p style={{marginTop:12,fontSize:13,textAlign:"center",color:lsStatus.includes("Done")?"#34d399":"#9ca3af"}}>{lsStatus}</p>
                  )}
                  {lsResultUrl && (
                    <div style={{marginTop:16}}>
                      <video src={lsResultUrl} controls className="vy-video-result" />
                      <button onClick={() => { const a = document.createElement("a"); a.href = lsResultUrl; a.download = `lipsync_${lsProvider}_${Date.now()}.mp4`; a.click(); }} className="vy-btn vy-btn-violet vy-btn-full" style={{marginTop:10}}>
                        <Download size={15} /> Download
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══════ REVIDEO MODE ══════ */}
          {activeMode === "revideo" && (
            <div className="vy-mode-content">
              {/* Video Upload */}
              <div className="vy-card">
                <div className="vy-card-header" style={{justifyContent:"space-between"}}>
                  <div className="vy-flex-center" style={{gap:10}}>
                    <MonitorPlay size={16} style={{color:"#818cf8"}} />
                    <span className="vy-heading-sm">Source Video</span>
                  </div>
                  <label className="vy-flex-center" style={{gap:6,fontSize:12,color:"#9ca3af"}}>
                    FPS: <select value={vFps} onChange={e => setVFps(Number(e.target.value))} className="vy-select-sm">{[1,2,3,4,6,8].map(f => <option key={f} value={f}>{f}</option>)}</select>
                  </label>
                </div>
                <div className="vy-card-body">
                  {!videoUrl ? (
                    <label className="vy-drop-zone">
                      <input ref={videoInputRef} type="file" accept="video/*" onChange={e => { const f = e.target.files?.[0]; if (f) { setVideoFile(f); setVideoUrl(URL.createObjectURL(f)); setFrames([]); setProcessedFrames([]); } }} style={{display:"none"}} />
                      <Upload size={36} strokeWidth={1.2} style={{color:"#4b5563"}} />
                      <p className="vy-drop-title">Drop video or click to browse</p>
                      <button onClick={e => { e.preventDefault(); videoInputRef.current?.click(); }} className="vy-btn vy-btn-accent">Select Video</button>
                    </label>
                  ) : (
                    <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                      <div style={{flex:"1 1 300px"}}>
                        <video src={videoUrl} controls className="vy-video-result" />
                        <div className="vy-flex-center" style={{gap:8,marginTop:10}}>
                          <button onClick={extractFrames} disabled={isExtracting} className={`vy-btn vy-btn-accent ${isExtracting ? "disabled" : ""}`} style={{flex:1}}>
                            {isExtracting ? <Loader2 size={15} className="vy-spin" /> : <Layers size={15} />}{isExtracting ? "Extracting..." : "Extract Frames"}
                          </button>
                          <button onClick={() => { setVideoFile(null); setVideoUrl(""); setFrames([]); setProcessedFrames([]); }} className="vy-icon-btn-sm"><X size={15} /></button>
                        </div>
                      </div>
                      {frames.length > 0 && (
                        <div style={{flex:"1 1 300px"}}>
                          <p className="vy-text-muted" style={{marginBottom:6,fontSize:12}}>{frames.length} frames @ {vFps} FPS</p>
                          <div className="vy-frame-grid">
                            {frames.map((f, i) => <img key={i} src={f} className={`vy-frame-thumb ${currentFrame === i ? "active" : ""}`} onClick={() => setCurrentFrame(i)} />)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* ReStyle / ReBackground Tabs */}
              {frames.length > 0 && (
                <>
                  <div className="vy-sub-tabs">
                    {[{ id: "restyle", label: "ReStyle", icon: Palette }, { id: "rebackground", label: "ReBackground", icon: ImagePlus }].map(t => {
                      const Icon = t.icon; const a = reVideoTab === t.id;
                      return <button key={t.id} onClick={() => setReVideoTab(t.id)} className={`vy-sub-tab ${a ? "active" : ""}`}><Icon size={15} />{t.label}</button>;
                    })}
                  </div>

                  {reVideoTab === "restyle" && (
                    <div className="vy-card">
                      <div className="vy-card-body">
                        <div className="vy-grid-presets">
                          {STYLE_PRESETS.map(s => (
                            <button key={s.id} onClick={() => { setSelectedStyle(s.id); setCustomPrompt(""); }} className={`vy-preset-btn ${selectedStyle === s.id ? "active" : ""}`} style={selectedStyle === s.id ? {"--accent":s.color} : {}}>
                              <span style={{fontSize:20}}>{s.icon}</span>
                              <span className="vy-preset-label">{s.label}</span>
                            </button>
                          ))}
                        </div>
                        <textarea value={customPrompt} onChange={e => { setCustomPrompt(e.target.value); setSelectedStyle(null); }} placeholder="Or enter a custom style prompt..." rows={2} className="vy-textarea" style={{marginBottom:12}} />
                        <button onClick={processReStyle} disabled={isProcessing || (!selectedStyle && !customPrompt)} className={`vy-btn vy-btn-violet vy-btn-full ${(isProcessing || (!selectedStyle && !customPrompt)) ? "disabled" : ""}`}>
                          {isProcessing ? <><Loader2 size={16} className="vy-spin" />{Math.round(progress)}%</> : <><Sparkles size={16} />Apply ReStyle</>}
                        </button>
                      </div>
                    </div>
                  )}

                  {reVideoTab === "rebackground" && (
                    <div className="vy-card">
                      <div className="vy-card-body">
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                          <div>
                            <p className="vy-label">Upload Background</p>
                            <label className="vy-drop-zone vy-drop-zone-sm">
                              <input ref={bgInputRef} type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) setBgImageUrl(URL.createObjectURL(f)); }} style={{display:"none"}} />
                              {bgImageUrl ? <img src={bgImageUrl} className="vy-bg-preview" /> : <><Image size={22} style={{color:"#4b5563"}} /><span className="vy-drop-hint" style={{marginTop:4}}>Click to upload</span></>}
                            </label>
                          </div>
                          <div>
                            <p className="vy-label">Or Describe (AI Generated)</p>
                            <textarea value={bgPrompt} onChange={e => { setBgPrompt(e.target.value); setBgImageUrl(""); }} placeholder="e.g., tropical beach at sunset..." rows={4} className="vy-textarea" />
                          </div>
                        </div>
                        <button onClick={processReBackground} disabled={isProcessing || (!bgImageUrl && !bgPrompt)} className={`vy-btn vy-btn-success vy-btn-full ${(isProcessing || (!bgImageUrl && !bgPrompt)) ? "disabled" : ""}`}>
                          {isProcessing ? <><Loader2 size={16} className="vy-spin" />{Math.round(progress)}%</> : <><Sparkles size={16} />Apply ReBackground</>}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Status */}
                  {(isProcessing || isExtracting) && (
                    <div className="vy-card" style={{padding:16}}>
                      <div className="vy-flex-center" style={{justifyContent:"space-between",marginBottom:8}}>
                        <span className="vy-text-secondary" style={{fontSize:12}}>{statusMsg}</span>
                        <span style={{fontSize:12,fontWeight:600,color:"#818cf8"}}>{Math.round(progress)}%</span>
                      </div>
                      <div className="vy-progress-bar"><div className="vy-progress-fill" style={{width:`${progress}%`}} /></div>
                    </div>
                  )}

                  {/* Result Viewer */}
                  {processedFrames.length > 0 && (
                    <div className="vy-card">
                      <div className="vy-card-header" style={{justifyContent:"space-between"}}>
                        <div className="vy-flex-center" style={{gap:10}}>
                          <Eye size={16} style={{color:"#818cf8"}} />
                          <span className="vy-heading-sm">Result</span>
                          <span className="vy-badge-success">{processedFrames.length} frames</span>
                        </div>
                        <button onClick={downloadReVideo} className="vy-btn vy-btn-accent vy-btn-sm"><Download size={13} /> Download .webm</button>
                      </div>
                      <div className="vy-card-body">
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                          <div>
                            <p className="vy-text-muted" style={{textAlign:"center",fontSize:11,marginBottom:4}}>ORIGINAL</p>
                            <img src={frames[currentFrame] || frames[0]} className="vy-compare-img" />
                          </div>
                          <div>
                            <p style={{textAlign:"center",fontSize:11,marginBottom:4,color:"#a78bfa",fontWeight:600}}>PROCESSED</p>
                            <img src={processedFrames[currentFrame] || processedFrames[0]} className="vy-compare-img vy-compare-processed" />
                          </div>
                        </div>
                        <div className="vy-playback-controls">
                          <button onClick={() => setCurrentFrame(Math.max(0, currentFrame - 1))} className="vy-play-btn-sm"><SkipBack size={12} /></button>
                          <button onClick={() => setPlayback(!playback)} className="vy-play-btn">{playback ? <Pause size={15} /> : <Play size={15} style={{marginLeft:2}} />}</button>
                          <button onClick={() => setCurrentFrame(Math.min(processedFrames.length - 1, currentFrame + 1))} className="vy-play-btn-sm"><SkipForward size={12} /></button>
                          <span className="vy-text-muted" style={{fontSize:11}}>Frame {currentFrame + 1}/{processedFrames.length}</span>
                        </div>
                        <input type="range" min={0} max={processedFrames.length - 1} value={currentFrame} onChange={e => { setPlayback(false); setCurrentFrame(Number(e.target.value)); }} className="vy-range" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      <footer className="vy-footer">VIDYYOU STUDIO &bull; Powered by HuggingFace + Claude + Web Audio + Canvas</footer>

      {/* ══════════════════════════════════════════════════════════
          STYLES
          ══════════════════════════════════════════════════════════ */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes borderGlow { 0%, 100% { border-color: rgba(99,102,241,0.3); } 50% { border-color: rgba(99,102,241,0.6); } }

        ::selection { background: rgba(99,102,241,0.3); color: #e0e7ff; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }

        .vy-app {
          min-height: 100vh;
          background: #09090b;
          color: #e5e7eb;
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        /* ── Header ── */
        .vy-header {
          background: linear-gradient(135deg, #0c0a1a 0%, #111028 50%, #0f0d1f 100%);
          border-bottom: 1px solid rgba(99,102,241,0.15);
          padding: 14px 24px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 100;
          backdrop-filter: blur(20px);
        }
        .vy-header-left { display: flex; align-items: center; gap: 14px; }
        .vy-header-right { display: flex; align-items: center; gap: 10px; }
        .vy-logo-wrap {
          width: 40px; height: 40px; border-radius: 12px; overflow: hidden;
          box-shadow: 0 0 24px rgba(99,102,241,0.3), inset 0 0 0 1px rgba(99,102,241,0.2);
        }
        .vy-logo { width: 100%; height: 100%; object-fit: cover; }
        .vy-title {
          margin: 0; font-size: 20px; font-weight: 700; color: #fff;
          font-family: 'Outfit'; letter-spacing: -0.5px;
        }
        .vy-title-sub { color: #818cf8; font-weight: 400; font-size: 13px; }
        .vy-tagline { margin: 0; font-size: 10px; color: #6366f1; letter-spacing: 1.5px; font-weight: 500; }

        .vy-key-badge {
          display: flex; align-items: center; gap: 5px;
          background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.2);
          padding: 4px 12px; border-radius: 8px;
          color: #34d399; font-size: 11px; font-weight: 500;
        }

        .vy-icon-btn {
          width: 38px; height: 38px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: #9ca3af; transition: all 0.2s;
        }
        .vy-icon-btn:hover, .vy-icon-btn.active { background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.3); color: #818cf8; }
        .vy-icon-btn-sm {
          width: 28px; height: 28px; border-radius: 6px; border: none;
          background: rgba(255,255,255,0.04); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #6b7280; transition: all 0.2s;
        }
        .vy-icon-btn-sm:hover { background: rgba(255,255,255,0.08); color: #d1d5db; }
        .vy-icon-btn-sm.vy-danger:hover { background: rgba(239,68,68,0.15); color: #f87171; }

        /* ── Container ── */
        .vy-container { max-width: 1100px; margin: 0 auto; padding: 20px; }

        /* ── Cards ── */
        .vy-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 16px;
          animation: fadeIn 0.3s ease;
          backdrop-filter: blur(12px);
        }
        .vy-card:hover { border-color: rgba(255,255,255,0.1); }
        .vy-glass { background: rgba(99,102,241,0.04); border-color: rgba(99,102,241,0.12); }
        .vy-card-header {
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          display: flex; align-items: center; gap: 10px;
        }
        .vy-card-body { padding: 20px; }

        .vy-step-badge {
          width: 24px; height: 24px; border-radius: 50%;
          background: linear-gradient(135deg, #4338ca, #6366f1);
          color: #fff; font-size: 12px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 12px rgba(99,102,241,0.3);
        }
        .vy-step-badge.vy-violet { background: linear-gradient(135deg, #7c3aed, #a78bfa); box-shadow: 0 0 12px rgba(124,58,237,0.3); }

        .vy-heading-sm { font-size: 15px; font-weight: 600; font-family: 'Outfit'; color: #f3f4f6; }

        /* ── Mode Bar ── */
        .vy-mode-bar {
          display: flex; gap: 4px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px; padding: 4px;
          margin-bottom: 20px;
        }
        .vy-mode-tab {
          flex: 1; padding: 12px 14px; border-radius: 10px;
          border: none; cursor: pointer;
          background: transparent; color: #6b7280;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-weight: 500; font-size: 14px; font-family: 'Outfit';
          transition: all 0.25s;
        }
        .vy-mode-tab:hover { background: rgba(255,255,255,0.04); color: #d1d5db; }
        .vy-mode-tab.active {
          background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15));
          color: #e0e7ff;
          box-shadow: 0 0 20px rgba(99,102,241,0.15), inset 0 0 0 1px rgba(99,102,241,0.25);
        }
        .vy-mode-label { font-weight: 600; }
        .vy-mode-desc { font-size: 11px; opacity: 0.6; font-family: 'DM Sans'; font-weight: 400; }

        .vy-mode-content { animation: fadeIn 0.25s ease; }

        /* ── Drop Zones ── */
        .vy-drop-zone {
          display: flex; flex-direction: column; align-items: center;
          padding: 40px 20px; border-radius: 12px;
          border: 1.5px dashed rgba(255,255,255,0.08);
          cursor: pointer; background: rgba(255,255,255,0.01);
          transition: all 0.25s;
        }
        .vy-drop-zone:hover { border-color: rgba(99,102,241,0.3); background: rgba(99,102,241,0.03); }
        .vy-drop-zone-sm { padding: 20px 12px; }
        .vy-drop-title { margin: 12px 0 4px; font-size: 14px; font-weight: 500; color: #9ca3af; }
        .vy-drop-hint { font-size: 12px; color: #4b5563; }

        /* ── Buttons ── */
        .vy-btn {
          padding: 10px 20px; border-radius: 10px; border: none;
          font-size: 14px; font-weight: 600; cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.2s; font-family: 'Outfit';
        }
        .vy-btn.disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
        .vy-btn-accent {
          background: linear-gradient(135deg, #4338ca, #6366f1);
          color: #fff; box-shadow: 0 4px 16px rgba(99,102,241,0.25);
        }
        .vy-btn-accent:hover { box-shadow: 0 4px 24px rgba(99,102,241,0.4); transform: translateY(-1px); }
        .vy-btn-violet {
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          color: #fff; box-shadow: 0 4px 16px rgba(124,58,237,0.25);
        }
        .vy-btn-violet:hover { box-shadow: 0 4px 24px rgba(124,58,237,0.4); transform: translateY(-1px); }
        .vy-btn-success {
          background: linear-gradient(135deg, #059669, #34d399);
          color: #fff; box-shadow: 0 4px 16px rgba(52,211,153,0.2);
        }
        .vy-btn-success:hover { box-shadow: 0 4px 24px rgba(52,211,153,0.35); }
        .vy-btn-render {
          background: linear-gradient(135deg, #dc2626, #ef4444);
          color: #fff; box-shadow: 0 4px 16px rgba(239,68,68,0.25);
          font-size: 15px; padding: 14px 24px;
        }
        .vy-btn-full { width: 100%; justify-content: center; }
        .vy-btn-sm { padding: 7px 14px; font-size: 12px; border-radius: 8px; }
        .vy-btn-xs { padding: 4px 10px; font-size: 10px; border-radius: 6px; }

        .vy-btn-outline-sm {
          padding: 6px 12px; border-radius: 7px; font-size: 11px; font-weight: 600;
          text-decoration: none; cursor: pointer;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          color: #9ca3af; display: inline-flex; align-items: center; gap: 4px;
          transition: all 0.2s;
        }
        .vy-btn-outline-sm:hover { border-color: rgba(255,255,255,0.15); color: #d1d5db; }
        .vy-btn-outline-sm.vy-accent { color: #818cf8; border-color: rgba(99,102,241,0.2); }
        .vy-btn-outline-sm.vy-accent:hover { border-color: rgba(99,102,241,0.4); }
        .vy-btn-outline-xs {
          padding: 3px 8px; border-radius: 5px; font-size: 10px; font-weight: 600;
          text-decoration: none; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08); color: #9ca3af;
          display: inline-flex; align-items: center;
        }

        /* ── Inputs ── */
        .vy-input {
          width: 100%; padding: 10px 14px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.03); color: #e5e7eb;
          font-size: 13px; font-family: 'DM Sans'; outline: none;
          transition: border-color 0.2s; box-sizing: border-box;
        }
        .vy-input:focus { border-color: rgba(99,102,241,0.4); }
        .vy-input-sm { padding: 6px 10px; font-size: 12px; border-radius: 6px; }
        .vy-textarea {
          width: 100%; padding: 10px 14px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.03); color: #e5e7eb;
          font-size: 13px; font-family: 'DM Sans'; outline: none;
          resize: vertical; box-sizing: border-box; transition: border-color 0.2s;
        }
        .vy-textarea:focus { border-color: rgba(99,102,241,0.4); }
        .vy-textarea-sm { padding: 6px 8px; font-size: 12px; border-radius: 6px; }
        .vy-textarea.vy-disabled { opacity: 0.35; cursor: not-allowed; }
        .vy-select-sm {
          border: 1px solid rgba(255,255,255,0.08); border-radius: 6px;
          padding: 4px 8px; font-size: 12px;
          background: rgba(255,255,255,0.04); color: #d1d5db; outline: none;
        }
        .vy-range { width: 100%; margin-top: 8px; accent-color: #6366f1; }
        .vy-range-sm { width: 60px; accent-color: #6366f1; }

        /* ── Labels, Text ── */
        .vy-label { margin: 0 0 6px; font-size: 12px; font-weight: 500; color: #6b7280; }
        .vy-text-muted { color: #4b5563; }
        .vy-text-secondary { color: #9ca3af; }
        .vy-flex-center { display: flex; align-items: center; }

        /* ── Badges ── */
        .vy-badge-success {
          background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.2);
          color: #34d399; font-size: 11px; font-weight: 600;
          padding: 2px 10px; border-radius: 20px;
        }
        .vy-badge-required {
          font-size: 10px; font-weight: 600; color: #f87171;
          background: rgba(248,113,113,0.1); padding: 1px 7px; border-radius: 4px;
        }

        /* ── Dots ── */
        .vy-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .vy-dot.green { background: #34d399; box-shadow: 0 0 6px rgba(52,211,153,0.5); }
        .vy-dot.red { background: #f87171; box-shadow: 0 0 6px rgba(248,113,113,0.4); }
        .vy-dot.dim { background: #374151; }

        /* ── Divider ── */
        .vy-divider { height: 1px; background: rgba(255,255,255,0.04); margin: 16px 0; }

        /* ── Error Bar ── */
        .vy-error-bar {
          background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px; padding: 10px 14px; margin-bottom: 16px;
          display: flex; align-items: center; gap: 8px;
          color: #fca5a5; font-size: 13px;
          animation: fadeIn 0.2s ease;
        }

        /* ── Settings ── */
        .vy-settings-wrap { max-width: 800px; margin: 0 auto; padding: 20px 20px 0; }
        .vy-settings-card { border-color: rgba(99,102,241,0.15); }
        .vy-settings-header {
          padding: 14px 20px;
          background: linear-gradient(135deg, rgba(17,16,40,0.8), rgba(15,13,31,0.8));
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .vy-settings-body { padding: 20px; }
        .vy-key-row { margin-bottom: 14px; }
        .vy-key-label { display: flex; align-items: center; gap: 8px; margin-bottom: 6; font-size: 13px; }
        .vy-key-input-row { display: flex; gap: 6px; }

        /* ── Status ── */
        .vy-status-line {
          display: flex; align-items: center; gap: 8px; margin-top: 12;
          color: #818cf8; font-size: 13px;
        }
        .vy-spin { animation: spin 1s linear infinite; }

        /* ── Progress Bar ── */
        .vy-progress-bar {
          height: 4px; border-radius: 2px; background: rgba(255,255,255,0.04);
          overflow: hidden; margin-top: 10px;
        }
        .vy-progress-fill {
          height: 100%; border-radius: 2px;
          background: linear-gradient(90deg, #4338ca, #818cf8);
          transition: width 0.3s;
        }
        .vy-progress-render { background: linear-gradient(90deg, #dc2626, #f87171); }

        /* ── Audio Player ── */
        .vy-audio-player { flex: 1; border-radius: 8px; height: 36px; }

        /* ── Style Grids ── */
        .vy-grid-styles { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 6px; margin-bottom: 14; }
        .vy-style-chip {
          padding: 10px 8px; border-radius: 8px; cursor: pointer; text-align: left;
          border: 1.5px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02); transition: all 0.2s;
        }
        .vy-style-chip:hover { border-color: rgba(255,255,255,0.12); }
        .vy-style-chip.active {
          border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.08);
          box-shadow: 0 0 12px rgba(99,102,241,0.1);
        }
        .vy-style-chip-label { font-size: 12px; font-weight: 600; color: #d1d5db; }
        .vy-style-chip.active .vy-style-chip-label { color: #c7d2fe; }
        .vy-style-chip-desc { font-size: 10px; color: #4b5563; margin-top: 2px; }

        /* ── Preset Grids ── */
        .vy-grid-presets { display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 6px; margin-bottom: 14; }
        .vy-preset-btn {
          padding: 10px 6px; border-radius: 10px; cursor: pointer;
          border: 1.5px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          transition: all 0.2s;
        }
        .vy-preset-btn:hover { border-color: rgba(255,255,255,0.12); }
        .vy-preset-btn.active {
          border-color: var(--accent, #818cf8);
          background: color-mix(in srgb, var(--accent, #818cf8) 8%, transparent);
          box-shadow: 0 0 14px color-mix(in srgb, var(--accent, #818cf8) 15%, transparent);
        }
        .vy-preset-label { font-size: 10px; font-weight: 600; color: #9ca3af; }
        .vy-preset-btn.active .vy-preset-label { color: var(--accent, #c7d2fe); }

        /* ── Provider Grid ── */
        .vy-grid-providers { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14; }
        .vy-provider-card {
          padding: 14px; border-radius: 12px; cursor: pointer; text-align: left;
          border: 1.5px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02); transition: all 0.2s;
        }
        .vy-provider-card:hover { border-color: rgba(255,255,255,0.1); }
        .vy-provider-card.active {
          border-color: rgba(124,58,237,0.4); background: rgba(124,58,237,0.06);
          box-shadow: 0 0 16px rgba(124,58,237,0.1);
        }
        .vy-provider-name { font-size: 14px; font-weight: 700; color: #e5e7eb; margin-bottom: 3px; }
        .vy-provider-card.active .vy-provider-name { color: #c4b5fd; }
        .vy-provider-price { font-size: 11px; color: #34d399; font-weight: 600; margin-bottom: 5px; }
        .vy-provider-desc { font-size: 11px; color: #6b7280; line-height: 1.4; }

        .vy-key-status-bar {
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(255,255,255,0.02); border-radius: 10px; padding: 10px 14px;
          border: 1px solid rgba(255,255,255,0.04);
        }

        /* ── Face Upload ── */
        .vy-face-upload {
          width: 180px; height: 180px; border-radius: 12px; cursor: pointer;
          border: 1.5px dashed rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0; transition: all 0.2s;
        }
        .vy-face-upload:hover { border-color: rgba(99,102,241,0.3); }
        .vy-face-preview { width: 100%; height: 100%; object-fit: cover; }

        /* ── Scene Row ── */
        .vy-scene-row {
          display: flex; gap: 12px; margin-bottom: 10; padding: 10px;
          border-radius: 10px; border: 1px solid rgba(255,255,255,0.04);
          background: rgba(255,255,255,0.01); transition: border-color 0.2s;
        }
        .vy-scene-row:hover { border-color: rgba(255,255,255,0.08); }
        .vy-scene-thumb {
          width: 150px; height: 84px; border-radius: 8px; overflow: hidden;
          background: rgba(255,255,255,0.03); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .vy-scene-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .vy-scene-regen {
          position: absolute; top: 4px; right: 4px;
          width: 22px; height: 22px; border-radius: 5px; border: none;
          background: rgba(0,0,0,0.6); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #fff; transition: background 0.2s;
        }
        .vy-scene-regen:hover { background: rgba(99,102,241,0.7); }
        .vy-scene-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6; }
        .vy-scene-num { font-size: 11px; font-weight: 600; color: #818cf8; }

        /* ── Preview Box ── */
        .vy-preview-box {
          position: relative; border-radius: 12px; overflow: hidden;
          background: #000; margin-bottom: 14;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .vy-preview-img { width: 100%; max-height: 380px; object-fit: contain; display: block; }
        .vy-lyrics-overlay {
          position: absolute; bottom: 20px; left: 0; right: 0; text-align: center;
        }
        .vy-lyrics-overlay span {
          background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
          color: #fff; padding: 8px 24px; border-radius: 8px;
          font-size: 16px; font-weight: 600;
          border: 1px solid rgba(255,255,255,0.1);
        }

        /* ── Playback Controls ── */
        .vy-playback-controls {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin-bottom: 10;
        }
        .vy-play-btn {
          width: 42px; height: 42px; border-radius: 50%; border: none;
          background: linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.25));
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: #e0e7ff; transition: all 0.2s;
          box-shadow: 0 0 16px rgba(99,102,241,0.2);
        }
        .vy-play-btn:hover { background: linear-gradient(135deg, rgba(99,102,241,0.5), rgba(139,92,246,0.4)); }
        .vy-play-btn-sm {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.03); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #9ca3af; transition: all 0.2s;
        }
        .vy-play-btn-sm:hover { border-color: rgba(255,255,255,0.12); color: #e5e7eb; }

        /* ── Video Result ── */
        .vy-video-result { width: 100%; border-radius: 10px; background: #000; border: 1px solid rgba(255,255,255,0.06); }

        /* ── Frame Grid ── */
        .vy-frame-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
          gap: 3px; max-height: 190px; overflow-y: auto;
          border-radius: 8px; padding: 4px;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04);
        }
        .vy-frame-thumb {
          width: 100%; border-radius: 4px; cursor: pointer;
          border: 2px solid transparent; transition: border-color 0.15s;
        }
        .vy-frame-thumb.active { border-color: #6366f1; }
        .vy-frame-thumb:hover { border-color: rgba(99,102,241,0.4); }

        /* ── Sub Tabs ── */
        .vy-sub-tabs {
          display: flex; gap: 4px;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px; padding: 3px; margin-bottom: 14;
        }
        .vy-sub-tab {
          flex: 1; padding: 9px; border-radius: 9px;
          border: none; cursor: pointer;
          background: transparent; color: #6b7280;
          font-weight: 500; font-size: 13px;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: all 0.2s;
        }
        .vy-sub-tab.active {
          background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.12));
          color: #c7d2fe;
          box-shadow: inset 0 0 0 1px rgba(99,102,241,0.2);
        }

        /* ── Compare Images ── */
        .vy-compare-img {
          width: 100%; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .vy-compare-processed { border-color: rgba(167,139,250,0.3); }

        /* ── BG Preview ── */
        .vy-bg-preview { width: 100%; border-radius: 8px; max-height: 120px; object-fit: cover; }

        /* ── Footer ── */
        .vy-footer {
          padding: 18px 24px; text-align: center;
          color: #374151; font-size: 11px; letter-spacing: 0.5px;
          border-top: 1px solid rgba(255,255,255,0.03); margin-top: 30px;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .vy-mode-desc { display: none; }
          .vy-mode-tab { padding: 10px 8px; font-size: 13px; }
          .vy-grid-providers { grid-template-columns: 1fr; }
          .vy-container { padding: 12px; }
        }
      `}</style>
    </div>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(VidyyouStudio));
