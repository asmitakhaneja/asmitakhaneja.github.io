/* ============================================================
   Asmita — Project Chatbot
   Rule-based Q&A about Asmita's projects & skills.
   To connect to Claude API, set CLAUDE_API_ENDPOINT below
   and uncomment the fetchClaudeReply function.
   ============================================================ */

// ── Optional: Claude API config ──────────────────────────────
// const CLAUDE_API_ENDPOINT = '/api/chat'; // your backend proxy
// const USE_AI = false; // set true when backend is ready
// ─────────────────────────────────────────────────────────────

const KB = {
  greet: {
    triggers: ['hi','hello','hey','sup','greetings'],
    reply: "Hey! 👋 I'm Asmita's project bot. Ask me about her projects, skills, or how to get in touch. Here are some things you can ask:"
  },
  projects: {
    triggers: ['project','projects','work','built','created','portfolio'],
    reply: "Asmita has two flagship projects:\n\n🔹 **E2E LLM Fine-Tuning Pipeline** — A full system for fine-tuning image LLMs (Qwen, Flux) with automated data prep, MLflow experiment tracking, and vLLM deployment.\n\n🔹 **Automotive Ad-Campaign** — An AI-driven pipeline for brand-consistent car visual generation using diffusion models (Flux, LoRA), ComfyUI workflows, and 8K upscaling.\n\nWant details on either?"
  },
  llm: {
    triggers: ['llm','fine-tun','fine tun','finetuning','qwen','flux','vllm','lora','peft','qlora'],
    reply: "For LLM fine-tuning, Asmita works with **PEFT (LoRA / QLoRA)** on models like **Qwen** and **Flux**.\n\nHer pipeline covers:\n• Automated metadata & diversity analysis\n• MLflow for hyperparameter tracking\n• Checkpoint validation against a Golden Dataset\n• Deployment via **vLLM**\n\nThis is applied to both text and image LLMs!"
  },
  automotive: {
    triggers: ['automotive','car','ad','campaign','comfyui','firefly','upscal','8k','brand'],
    reply: "The Automotive Ad-Campaign project is an end-to-end AI ad generation system:\n\n• Fine-tuned diffusion models (LoRA / PEFT) for brand-consistent car imagery\n• ComfyUI workflows integrating Flux, Qwen, Firefly & Nano Banana Pro\n• Prompt guardrails + anti-injection mechanisms\n• Generative fill, scene expansion & **8K upscaling**\n• Python components with OpenUSD asset pipelines"
  },
  skills: {
    triggers: ['skill','tech','stack','technology','tool','know','expertise','speciali'],
    reply: "Asmita's core expertise spans:\n\n🤖 **GenAI** — LLM/SLM fine-tuning, Multimodal LLMs, Image LLMs, PEFT, LoRA, RAG, Agentic AI, Prompt Engineering\n\n🛠️ **MLOps / LLMOps** — MLflow, vLLM, ONNX, Prometheus, GCP, AWS\n\n💻 **Frameworks** — PyTorch, TensorFlow, LangChain, LangGraph, FastAPI, Flask\n\n📊 **Data** — Python, SQL (MS-SQL, PostgreSQL), MongoDB, Elasticsearch\n\n☁️ **Cloud & DevOps** — Azure DevOps, GCP, AWS, Shell Scripting, MSAL/SSO"
  },
  contact: {
    triggers: ['contact','reach','email','linkedin','connect','hire','talk'],
    reply: "You can connect with Asmita on:\n\n🔗 **LinkedIn**: linkedin.com/in/asmita-khaneja\n📧 **Email**: asmita.khaneja@gmail.com\n\nShe's open to collaboration on GenAI, MLOps, and LLM fine-tuning projects."
  },
  blog: {
    triggers: ['blog','post','article','write','writing','read'],
    reply: "Asmita writes about practical AI implementation:\n\n📝 *A Practical Guide to LLM Fine-Tuning with PEFT & LoRA*\n📝 *Building Agentic Pipelines with LangGraph — Lessons Learned*\n📝 *ComfyUI Workflows for Production Image Generation*\n\nCheck out the Blog section for the full posts!"
  },
  about: {
    triggers: ['who','about','background','experience','bio'],
    reply: "Asmita is an **Experienced Data Science Associate Architect** with deep expertise in Finance, Retail Marketing, and Commerce domains.\n\nShe bridges cutting-edge AI research and real-world production systems — from LLM fine-tuning pipelines to agentic AI architectures. Her mission: turn the latest research into solutions with positive societal impact."
  },
  fallback: "Hmm, I'm not sure about that! Try asking about:\n• **Projects** (LLM pipeline, Automotive AI)\n• **Skills** (GenAI, MLOps, fine-tuning)\n• **Blog** posts\n• How to **Contact** Asmita"
};

const SUGGESTIONS = [
  "Tell me about projects",
  "What are Asmita's skills?",
  "How to contact?",
  "Tell me about fine-tuning"
];

function getBotReply(text) {
  const t = text.toLowerCase().trim();
  for (const key of Object.keys(KB)) {
    if (key === 'fallback') continue;
    const entry = KB[key];
    if (entry.triggers && entry.triggers.some(w => t.includes(w))) {
      return key === 'greet' ? entry.reply : entry.reply;
    }
  }
  return KB.fallback;
}

function renderMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n•/g, '<br>•')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

function initChatbot() {
  const toggle = document.getElementById('chatToggle');
  const window_ = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatClose');
  const messages = document.getElementById('chatMessages');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');
  const suggestionsEl = document.getElementById('chatSuggestions');

  if (!toggle) return;

  // Initial greeting message
  setTimeout(() => appendBot(KB.greet.reply, true), 400);

  toggle.addEventListener('click', () => {
    window_.classList.toggle('open');
    toggle.textContent = window_.classList.contains('open') ? '✕' : '🤖';
  });
  closeBtn.addEventListener('click', () => {
    window_.classList.remove('open');
    toggle.textContent = '🤖';
  });

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

  // Render suggestion chips
  SUGGESTIONS.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'suggestion-chip';
    btn.textContent = s;
    btn.addEventListener('click', () => { input.value = s; sendMessage(); });
    suggestionsEl.appendChild(btn);
  });

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    appendUser(text);
    input.value = '';
    showTyping();
    setTimeout(() => {
      removeTyping();
      appendBot(getBotReply(text));
    }, 650 + Math.random() * 400);
  }

  function appendUser(text) {
    const el = document.createElement('div');
    el.className = 'msg user';
    el.textContent = text;
    messages.appendChild(el);
    scrollBottom();
  }

  function appendBot(text, showSuggestions = false) {
    const el = document.createElement('div');
    el.className = 'msg bot';
    el.innerHTML = renderMarkdown(text);
    messages.appendChild(el);
    scrollBottom();
    if (showSuggestions) suggestionsEl.style.display = 'flex';
  }

  let typingEl = null;
  function showTyping() {
    typingEl = document.createElement('div');
    typingEl.className = 'msg bot';
    typingEl.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    messages.appendChild(typingEl);
    scrollBottom();
  }
  function removeTyping() {
    if (typingEl) { typingEl.remove(); typingEl = null; }
  }
  function scrollBottom() {
    messages.scrollTop = messages.scrollHeight;
  }
}

document.addEventListener('DOMContentLoaded', initChatbot);
