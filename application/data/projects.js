const PROJECTS = [
  {
    num: "01",
    category: "LLMOps · Fine-Tuning · vLLM",
    title: "E2E LLM Fine-Tuning Pipeline",
    desc: "A fully automated, production-grade pipeline for training and deploying high-fidelity diffusion-based image LLMs — from raw data to serving.",
    impact: [
      "~40% cost reduction via QLoRA vs full fine-tune",
      "Auto checkpoint selection cutting manual review by 80%",
      "Reproducible across Qwen & Flux model families"
    ],
    bullets: [
      "Designed three-module architecture: <strong>Data Pre-processing</strong>, <strong>Fine-Tuning</strong>, and <strong>Validation</strong> for reliable, reproducible training.",
      "Built automated metadata generation, diversity analysis dashboards, and high-fidelity image preparation workflows to ensure data quality.",
      "Unified Fine-Tuning framework supporting <strong>Qwen</strong> and <strong>Flux</strong> models with MLflow for hyperparameter optimization and experiment tracking.",
      "Custom Validation module with a scoring mechanism on a curated <strong>Golden Dataset</strong> to auto-select the best checkpoint for <strong>vLLM</strong> deployment."
    ],
    tags: ["Qwen","Flux","PEFT / LoRA","MLflow","vLLM","LLMOps","Python"]
  },
  {
    num: "02",
    category: "GenAI · ComfyUI · Diffusion",
    title: "Automotive AI Ad-Campaign",
    desc: "An AI-driven, end-to-end automotive advertisement generation pipeline delivering brand-consistent, high-fidelity car visuals at scale.",
    impact: [
      "3× faster creative turnaround vs manual pipeline",
      "8K resolution outputs with zero manual upscaling",
      "0 brand-safety incidents via prompt guardrail system"
    ],
    bullets: [
      "Led fine-tuning of diffusion-based image LLMs with <strong>PEFT &amp; LoRA</strong> for brand-consistent, photorealistic car imagery.",
      "Designed advanced <strong>ComfyUI</strong> workflows integrating Flux, Qwen, Firefly, and Nano Banana Pro to automate creative production.",
      "Built robust <strong>prompt guardrails</strong> and anti–prompt-injection mechanisms ensuring safe, on-brand outputs across open-source models.",
      "Delivered generative fill, scene expansion, and upscaling to <strong>8K resolution</strong> with OpenUSD asset pipelines."
    ],
    tags: ["ComfyUI","Flux","Firefly","LoRA","OpenUSD","8K Upscaling","Python"]
  },
  {
    num: "03",
    category: "Multimodal LLM · Agentic AI · AWS",
    title: "Marketing Video Analysis Platform",
    desc: "LLM-powered platform for automated marketing video analysis, content optimisation, and platform-specific format generation across YouTube, Instagram, and Facebook.",
    impact: [
      "+25% ad engagement via tailored platform analysis",
      "-60% manual effort through automated transcript & frame analysis",
      "+30% user experience via automated Shorts, Reels & Stories generation"
    ],
    bullets: [
      "Led team to deploy <strong>LLM-based video analysis</strong> pipeline using GPT-4o, Claude Sonnet/Haiku, and Gemini for multi-model content optimisation.",
      "Implemented <strong>transcript generation and summarisation</strong> using Whisper (speech/audio) and frame analysis for full video coverage.",
      "Designed automated process for generating platform-specific formats (Shorts, Reels, Stories, Feeds) by extracting highlights from longer videos.",
      "Integrated a <strong>Video Q&amp;A feature</strong> with timestamp context using WebSocket-based real-time streaming on AWS ECS + Fargate."
    ],
    tags: ["GPT-4o","Claude","Gemini","Whisper","AWS ECS","LangChain","Docker","FastAPI"]
  },
  {
    num: "04",
    category: "Agentic AI · LangGraph · Multi-Cloud",
    title: "E2E Commerce Campaign Generation Platform",
    desc: "Cloud-agnostic agentic platform for generating multi-lingual product descriptions and key visuals adhering to marketplace guidelines across Amazon, Lazada, and Shopee.",
    impact: [
      "+80% efficiency for Graphic Designers",
      "+40% efficiency for Copywriters",
      "Multi-cloud: AWS + GCP CloudRun deployment"
    ],
    bullets: [
      "Implemented <strong>multi-modal agentic tagging</strong> system for image and document analysis, ensuring brand consistency and searchability.",
      "Engineered cloud-agnostic <strong>LangGraph Agents</strong> for generating multi-lingual PDP copy and key visuals aligned with marketplace guidelines.",
      "Integrated <strong>LLM Fine-Tuning (PEFT, QLoRA)</strong> with Phi-3 and multi-model orchestration across GPT-4o, Claude, Gemini, and Midjourney.",
      "Led product design and architecture, aligning stakeholders across business, engineering, and marketplace platform teams."
    ],
    tags: ["LangGraph","Agentic AI","QLoRA","AWS Bedrock","GCP CloudRun","Firefly","LLMOps"]
  },
  {
    num: "05",
    category: "MLOps · AWS Serverless · CI/CD",
    title: "Marketing Trends & Personas Engine",
    desc: "End-to-end solution for generating dynamic marketing insights, trends, and personas from real-time data and industry reports on a fully serverless AWS architecture.",
    impact: [
      "+75% deployment efficiency via CI/CD pipeline",
      "Cost-effective scaling via AWS Serverless architecture",
      "Real-time insights from live data + industry reports"
    ],
    bullets: [
      "Built end-to-end solution for dynamic marketing insights and personas using real-time data with <strong>Claude, Gemini, LLaMA, and Falcon</strong>.",
      "Deployed on <strong>AWS Serverless</strong> (Fargate, ECS, API WebSocket, OpenSearch, SageMaker) for cost-effective, high-availability scaling.",
      "Led design and architecture of robust, scalable infrastructure supporting real-time insights generation at enterprise scale.",
      "Implemented <strong>CI/CD pipeline</strong> for ML models via Azure DevOps, improving deployment efficiency by 75%."
    ],
    tags: ["AWS Fargate","SageMaker","OpenSearch","LLaMA","Claude","CI/CD","Python"]
  },
  {
    num: "06",
    category: "MLOps · ONNX · TensorRT · Cost Optimisation",
    title: "ONNX Model Optimisation — $1M → $100K",
    desc: "Optimised custom deep learning models for CPU and GPU inference using ONNX and TensorRT, achieving a 10× reduction in cloud compute costs.",
    impact: [
      "Cloud cost reduced from $1M to $100K (10× savings)",
      "First TPS module ONNX conversion in the open-source community",
      "Negligible accuracy drop with significant latency gains"
    ],
    bullets: [
      "Implemented models in <strong>ONNX</strong> for faster CPU inference — first conversion of the TPS module to ONNX in the community.",
      "Converted custom <strong>PyTorch</strong> models to <strong>TensorRT</strong> for GPU inference, achieving lightning-fast speeds on NVIDIA hardware.",
      "Implemented automated <strong>CI/CD pipelines</strong> for serverless deployments on AWS Lambda and Google Cloud Functions for a PII masking solution.",
      "Implemented automated ML training/tuning pipelines using <strong>Bayesian optimisation</strong> for neural network hyperparameter search."
    ],
    tags: ["ONNX","TensorRT","PyTorch","AWS Lambda","GCP Functions","MLOps","CI/CD"]
  }
];
