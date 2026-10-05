/**
 * All site content lives in this file. Edit text here; components only render it.
 *
 * Anything marked `TODO(vishist)` is a fact the site does not have yet. TODOs are
 * never rendered: a `todo` field is a note for you, not copy for visitors.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Stat = { value: number; suffix?: string; label: string };

export type Pillar = { title: string; body: string; proof: string };

export type DiagramNode = {
  id: string;
  label: string;
  sub?: string;
  /** Grid position. `span` widens the node over several columns. */
  col: number;
  row: number;
  span?: number;
  kind?: "default" | "accent" | "store" | "external";
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  /** dashed = a call to a model, solid = request or data flow */
  dashed?: boolean;
  both?: boolean;
  /**
   * h: straight across · v: straight down or up · hv / vh: one elbow ·
   * over: leaves the top, runs above the diagram, enters the target's top
   */
  route?: "h" | "v" | "hv" | "vh" | "over";
};

export type Diagram = {
  title: string;
  /** Plain-language description, read by screen readers and shown under the diagram. */
  summary: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export type EvalRow = {
  configuration: string;
  hitRate: string;
  mrr: string;
  faithfulness: string;
  latency: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  problem: string;
  built: string[];
  stack: string[];
  highlights: string[];
  links?: { label: string; href: string }[];
  diagram: Diagram;
  evaluation?: {
    heading: string;
    conditions: string;
    rows: EvalRow[];
    findings: string[];
    source: { label: string; href: string };
  };
  /** Notes for you. Not rendered. */
  todo?: string[];
};

export type Role = {
  company: string;
  title: string;
  period: string;
  note?: string;
  items: { name?: string; text: string }[];
};

export type SkillGroup = { area: string; skills: string[] };

// ---------------------------------------------------------------------------
// Identity
// ---------------------------------------------------------------------------

export const site = {
  url: "https://vishist-br.github.io/portfolio-nxt-app",
  name: "BR Vishist",
  role: "Senior Software Engineer",
  headline: "Senior Software Engineer — AI and Full-Stack",
  location: "Bengaluru",
  description:
    "BR Vishist is a senior software engineer in Bengaluru with 7 years of experience, building AI products and full-stack platforms at Elanco and Rakuten.",
  email: "vishist.developer@gmail.com",
  links: {
    github: "https://github.com/vishist-br",
    linkedin: "https://www.linkedin.com/in/vishist-bhoopalam",
  },
  /**
   * The CV is the file public/cv.pdf. To publish a new version, replace that
   * file (same name) and push. See the README for the two ways to produce it.
   */
  cv: { href: "/cv.pdf", label: "Download CV" },
} as const;

export const hero = {
  eyebrow: "BR Vishist · Bengaluru",
  title: ["Senior engineer", "building AI products,", "end to end."],
  /** The words in the title that take the accent colour. */
  accent: "AI products,",
  lede: "Seven years shipping at Elanco and Rakuten. Recently: an AI documentation portal over 150+ repositories, and a retrieval pipeline written from scratch with its own evaluation harness.",
  stats: [
    { value: 150, suffix: "+", label: "repositories read by the AI docs portal" },
    { value: 10, label: "engineering teams using it" },
    { value: 7, label: "years of experience" },
  ] satisfies Stat[],
};

// ---------------------------------------------------------------------------
// What I build
// ---------------------------------------------------------------------------

export const pillars: Pillar[] = [
  {
    title: "AI products",
    body: "LLM features inside tools people already use: summaries, chat and search over a real knowledge base, with retrieval I can explain line by line.",
    proof: "Gemini over 150+ repos · hybrid RAG with citations",
  },
  {
    title: "Full-stack platforms",
    body: "Customer-facing portals and internal services, from React and Next.js frontends to Python and Node.js backends on Azure, GCP and AWS.",
    proof: "Customer Onboarding Tool · 2 backends, 3 frontends at Rakuten",
  },
  {
    title: "Automation",
    body: "Pipelines that take a daily manual job away: ticket assignment, on-call alerting, and survey scores the business decides with.",
    proof: "Replaced PagerDuty · NPS across 10 services",
  },
];

// ---------------------------------------------------------------------------
// Featured work
// ---------------------------------------------------------------------------

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-docs-portal",
    title: "AI documentation portal",
    kicker: "Elanco",
    summary:
      "Gemini reads the code and READMEs of 150+ repositories and writes the documentation. Engineers ask questions across all of it.",
    problem:
      "Across 150+ repositories, understanding another team's project meant asking the people who owned it.",
    built: [
      "A documentation portal on Fumadocs that holds per-repository documentation in one place.",
      "Summaries written by Gemini from each repository's code and READMEs.",
      "Chat and search so engineers can ask questions across the whole knowledge base.",
      "Architecture diagrams brought in through a Lucid integration.",
    ],
    stack: ["Gemini API", "Fumadocs", "Lucid"],
    highlights: ["150+ repositories", "10 engineering teams", "Built the portal and the Gemini chat"],
    diagram: {
      title: "How the portal is fed and used",
      summary:
        "Repository code and READMEs go to Gemini, which writes summaries into the documentation portal. Lucid supplies architecture diagrams. Engineers ask questions through chat and search, which answer from the portal's knowledge base.",
      nodes: [
        { id: "repos", label: "150+ repositories", sub: "code + READMEs", col: 0, row: 0, kind: "external" },
        { id: "gemini", label: "Gemini", sub: "writes summaries", col: 1, row: 0, kind: "accent" },
        { id: "portal", label: "Docs portal", sub: "Fumadocs", col: 2, row: 0, kind: "store" },
        { id: "lucid", label: "Lucid", sub: "architecture diagrams", col: 1, row: 1, kind: "external" },
        { id: "chat", label: "Chat + search", sub: "Gemini", col: 3, row: 0, kind: "accent" },
        { id: "teams", label: "Engineers", sub: "10 teams", col: 4, row: 0 },
      ],
      edges: [
        { from: "repos", to: "gemini", route: "h" },
        { from: "gemini", to: "portal", label: "summaries", route: "h" },
        { from: "lucid", to: "portal", label: "diagrams", route: "hv" },
        { from: "chat", to: "portal", route: "h", both: true },
        { from: "teams", to: "chat", label: "questions", route: "h" },
      ],
    },
    todo: [
      "How chat retrieves from the knowledge base (search index, embeddings, context stuffing?) so the diagram can show it.",
      "Any measured outcome: questions answered, time saved, adoption over time.",
      "Whether a screenshot can be shown publicly.",
    ],
  },
  {
    slug: "streaming-rag-chat",
    title: "Streaming RAG Chat",
    kicker: "Personal project · open source",
    summary:
      "Ask questions of your documents and get streamed answers that cite the exact source passages. The retrieval pipeline is written from scratch.",
    problem:
      "An answer about a document is only useful if you can check it. That needs retrieval that finds the right passage for both exact identifiers and paraphrased questions, citations back to that passage, and a way to measure whether a change made things better.",
    built: [
      "Structure-aware chunking and idempotent ingestion: an unchanged file is skipped, an edited one re-embeds only what changed.",
      "Hybrid retrieval: pgvector similarity and Postgres full-text search, merged with Reciprocal Rank Fusion, with optional LLM reranking.",
      "Follow-up questions rewritten into standalone queries before retrieval.",
      "Answers streamed over Server-Sent Events with numbered citations, and an explicit \"I don't know\" when the sources are not enough.",
      "Per-request tracing of latency, tokens and cost, prompt-injection guardrails and rate limiting.",
      "Unit and integration tests, CI, and an evaluation harness with a 31-question golden set.",
    ],
    stack: ["Python", "FastAPI", "Postgres + pgvector", "Gemini", "Ollama", "Next.js"],
    highlights: ["No orchestration framework", "Hybrid search + RRF", "31-question golden set"],
    links: [{ label: "Source on GitHub", href: "https://github.com/vishist-br/streaming-rag-chat" }],
    diagram: {
      title: "Request flow",
      summary:
        "The Next.js UI sends uploads and chat requests through guardrails and rate limiting. Uploads are parsed, chunked, embedded and stored in Postgres. A chat question is rewritten if it is a follow-up, retrieved with vector and full-text search fused by RRF, optionally reranked, then answered from the top passages. Sources, tokens and metrics stream back to the UI. Rewrite, retrieval, rerank and generation each call the model provider, which is Gemini or Ollama behind one interface.",
      nodes: [
        { id: "ui", label: "Next.js UI", sub: "chat + upload", col: 0, row: 1 },
        { id: "guard", label: "Guardrails", sub: "validate + rate limit", col: 1, row: 1 },
        { id: "ingest", label: "Ingestion", sub: "parse, chunk, embed", col: 2, row: 0 },
        { id: "pg", label: "Postgres", sub: "pgvector + tsvector", col: 3, row: 0, kind: "store" },
        { id: "rewrite", label: "Query rewrite", sub: "follow-ups only", col: 2, row: 1 },
        { id: "retrieve", label: "Hybrid retrieval", sub: "vector + keyword, RRF", col: 3, row: 1, kind: "accent" },
        { id: "rerank", label: "Rerank", sub: "opt-in", col: 4, row: 1 },
        { id: "generate", label: "Grounded answer", sub: "citations required", col: 5, row: 1, kind: "accent" },
        { id: "llm", label: "Gemini API or Ollama", sub: "one Provider interface", col: 2, row: 2, span: 4, kind: "external" },
      ],
      edges: [
        { from: "ui", to: "guard", route: "h" },
        { from: "guard", to: "ingest", label: "upload", route: "vh" },
        { from: "guard", to: "rewrite", label: "chat", route: "h" },
        { from: "ingest", to: "pg", route: "h" },
        { from: "rewrite", to: "retrieve", route: "h" },
        { from: "retrieve", to: "pg", route: "v", both: true },
        { from: "retrieve", to: "rerank", route: "h" },
        { from: "rerank", to: "generate", route: "h" },
        { from: "generate", to: "ui", label: "SSE: sources, tokens, metrics", route: "over" },
        { from: "rewrite", to: "llm", route: "v", dashed: true },
        { from: "retrieve", to: "llm", route: "v", dashed: true },
        { from: "rerank", to: "llm", route: "v", dashed: true },
        { from: "generate", to: "llm", route: "v", dashed: true },
      ],
    },
    evaluation: {
      heading: "Measured, including what did not work",
      conditions:
        "31 questions from the golden set, run with local open models through Ollama: llama3.2 (3B) for answers, reranking and judging, nomic-embed-text for embeddings. These are not Gemini numbers.",
      rows: [
        { configuration: "Vector only", hitRate: "0.96", mrr: "0.88", faithfulness: "4.57", latency: "2.9 s" },
        { configuration: "Hybrid (RRF)", hitRate: "0.96", mrr: "0.83", faithfulness: "4.64", latency: "2.8 s" },
        { configuration: "Hybrid + rerank", hitRate: "0.96", mrr: "0.54", faithfulness: "4.50", latency: "8.1 s" },
      ],
      findings: [
        "Retrieval put the evidence passage in the top 5 for 27 of 28 answerable questions, in every configuration.",
        "All 3 unanswerable questions got \"I don't know\" instead of a made-up answer.",
        "Reranking with a 3B model made ranking worse and nearly tripled latency, so rerank is opt-in and hybrid is the default.",
        "The corpus is small (39 chunks) and the judge is the same model that wrote the answers, so differences of a few points are within noise.",
      ],
      source: {
        label: "evals/RESULTS.md",
        href: "https://github.com/vishist-br/streaming-rag-chat/blob/main/evals/RESULTS.md",
      },
    },
    todo: [
      "Run the evaluation with PROVIDER=gemini and replace these rows. The repo's README says the Gemini provider has not been run against the live API yet.",
      "A hosted demo link, if you deploy one.",
    ],
  },
  {
    slug: "translation-hub",
    title: "Translation Hub",
    kicker: "Elanco",
    summary:
      "Self-service document translation on Google Cloud Translation Hub, for teams who serve customers in many countries.",
    problem:
      "Teams who support customers across many countries frequently need documents translated.",
    built: [
      "A self-service document translation service on Google Cloud Translation Hub.",
      "Rollout to the teams who serve customers in many countries.",
    ],
    stack: ["Google Cloud Translation Hub", "GCP"],
    highlights: ["Self-service", "Document translation", "Multi-country teams"],
    diagram: {
      title: "Self-service flow",
      summary:
        "A team member submits a document to the self-service Translation Hub on Google Cloud and gets the translated document back.",
      nodes: [
        { id: "team", label: "Team member", sub: "many countries", col: 0, row: 0 },
        { id: "hub", label: "Translation Hub", sub: "Google Cloud", col: 1, row: 0, kind: "accent" },
        { id: "out", label: "Translated document", sub: "back to the team", col: 2, row: 0, kind: "store" },
      ],
      edges: [
        { from: "team", to: "hub", label: "document", route: "h" },
        { from: "hub", to: "out", route: "h" },
      ],
    },
    todo: [
      "How translation was done before (agency, manual, another tool) and what it cost in time or money.",
      "Number of teams, documents or languages, if you can share them.",
      "What you built around Translation Hub (portal, access, glossaries?) so the diagram can show more than three boxes.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export const experience: Role[] = [
  {
    company: "Elanco",
    title: "Senior Software Engineer",
    period: "Dec 2023 – present",
    items: [
      {
        name: "AI documentation portal",
        text: "Gemini reads the code and READMEs of 150+ repositories and writes summaries; chat and search answer questions across the knowledge base. Built on Fumadocs with a Lucid integration. Used by 10 engineering teams.",
      },
      {
        name: "Translation Hub",
        text: "Self-service document translation on Google Cloud Translation Hub for teams serving customers in many countries.",
      },
      {
        name: "NPS pipeline",
        text: "Power Automate, Cloud Functions and Cosmos DB survey the users of 10 internal services. The business uses the scores to decide which services to keep or replace.",
      },
      {
        name: "Customer Onboarding Tool",
        text: "Customer-facing portal where operations, sales reps and customers manage and sign forms and agreements. Led a small Scrum team on it.",
      },
    ],
  },
  {
    company: "Rakuten India",
    title: "Senior Software Engineer",
    period: "Mar 2020 – Dec 2023",
    note: "Intern from Aug 2019 · 2 promotions · Best Employee Award 2021",
    items: [
      {
        name: "Auto ticket assignment",
        text: "Python tool on the Jira, ServiceNow and Slack APIs that assigns tickets by shift roster, workload, priority and category.",
      },
      {
        name: "On-call alerting",
        text: "Alerting service by SMS, phone call and email that replaced PagerDuty.",
      },
      {
        name: "Backends and frontends",
        text: "Backends for 2 projects in Python, Flask, Postgres, Snowflake and AWS. Frontends for 3 in React, TypeScript, Redux and React Query.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export const skills: SkillGroup[] = [
  {
    area: "AI and GenAI",
    skills: [
      "RAG (hybrid search, rank fusion, reranking)",
      "Embeddings",
      "pgvector",
      "Gemini API",
      "Google Cloud Translation Hub",
      "Claude Code",
    ],
  },
  { area: "Languages", skills: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { area: "Frontend", skills: ["React", "Next.js", "Redux", "React Query", "Material UI"] },
  { area: "Backend", skills: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs"] },
  {
    area: "Cloud and data",
    skills: ["Azure", "GCP", "AWS", "Cloud Functions", "Cosmos DB", "Postgres", "Snowflake"],
  },
  {
    area: "Automation and DevOps",
    skills: ["Power Automate", "Fumadocs", "Lucid", "CI/CD", "Git", "Datadog"],
  },
];

// ---------------------------------------------------------------------------
// Contact and footer
// ---------------------------------------------------------------------------

export const contact = {
  title: "Hiring for an AI engineering role?",
  body: "I am looking for AI Engineer roles. Email is the fastest way to reach me.",
};

export const credentials = [
  "B.Tech, Information Science and Engineering, RNSIT, 2019",
  "Best Employee Award, Rakuten India, 2021",
  "Best Public Speaker, Toastmasters International, 2021",
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
