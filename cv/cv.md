# BR Vishist

**Senior Software Engineer — AI and Full-Stack**

Bengaluru · +91-7019794413 · vishist.developer@gmail.com · [GitHub](https://github.com/vishist-br) · [LinkedIn](https://www.linkedin.com/in/vishist-bhoopalam) · [Portfolio](https://vishist-br.github.io/portfolio-nxt-app)

## Summary

Senior software engineer with 7 years building production web applications, backend services and internal platforms at Elanco and Rakuten. At Elanco I build AI-backed engineering tools: an LLM-powered documentation portal with chat and search over 150+ repositories, and a document translation service on Google Cloud Translation Hub. I also lead delivery of a customer-facing onboarding product. I work across React/Next.js, Node.js, Python and cloud, and I am moving fully into AI engineering.

## Skills

| Area | Skills |
| --- | --- |
| AI and GenAI | RAG (hybrid search, rank fusion, reranking), embeddings, pgvector, Gemini API, Google Cloud Translation Hub, Claude Code |
| Languages | TypeScript, JavaScript, Python, SQL |
| Frontend | React, Next.js, Redux, React Query, Material UI |
| Backend | Node.js, Express.js, FastAPI, Flask, REST APIs |
| Cloud and data | Azure, GCP, AWS, Cloud Functions, Cosmos DB, Postgres, Snowflake |
| Automation and DevOps | Power Automate, Fumadocs, Lucid, CI/CD pipelines, Git, Datadog |

## Experience

### Elanco — Senior Software Engineer, Bengaluru

December 2023 – Present

**Engineering Accelerator team (improving engineering performance)**

- Built an AI documentation portal that reads 150+ of the organisation's repositories and their READMEs and maintains per-repository documentation in one place, with architecture diagrams pulled in through a Lucid integration, so teams can understand each other's projects without asking the owners. Gemini reads each repository's code and READMEs to write the summaries, and a chat and search bar lets engineers ask questions across the whole knowledge base. I built the portal on Fumadocs and integrated the Gemini chat into it. Used by 10 engineering teams.
- Built Translation Hub, a self-service document translation service on Google Cloud Translation Hub, and rolled it out to teams who support customers across many countries and frequently need documents translated.
- Built an NPS survey pipeline with Power Automate, Cloud Functions and Cosmos DB that surveys users of 10 internal services and calculates NPS per service. The business uses the scores to decide which services to keep and which to replace.

**Customer Onboarding Tool (customer-facing product)**

- Built and maintain the portal through which customers sign the forms and agreements for Elanco's data analytics services and medicines, with three roles: operations (manage sales reps, customer issues and business operations), sales reps (invite and onboard customers) and customers (review and sign).
- Led a small customer-facing Scrum team on this product.

### Rakuten India — Senior Software Engineer, Bengaluru

March 2020 – December 2023 · 2 promotions · Best Employee Award 2021

- Built an auto ticket assignment tool in Python that assigns incoming Jira and ServiceNow tickets by shift roster, workload, priority and category, removing a daily manual task. Integrated the ServiceNow, Jira and Slack APIs.
- Built an alerting service in Python that notifies on-call engineers by SMS, phone call and email when a ticket is assigned, replacing the third-party tool PagerDuty.
- Built the backend for 2 projects from scratch with a layered architecture: Python, Flask, Postgres, Snowflake, REST APIs, AWS.
- Built and maintained frontends for 3 projects in React, TypeScript, Redux and React Query.

### Rakuten India — Intern

August 2019 – March 2020

- Built websites in WordPress and a mobile application in React Native.

## Projects

**[Streaming RAG Chat](https://github.com/vishist-br/streaming-rag-chat)** — Python, FastAPI, Postgres + pgvector, Gemini, Next.js

- Built a document question-answering app that streams answers with citations to the exact source passages, with the retrieval pipeline written from scratch and no orchestration framework.
- Implemented structure-aware chunking, idempotent ingestion, hybrid retrieval (vector plus full-text search merged with Reciprocal Rank Fusion), LLM reranking and follow-up query rewriting.
- Added per-request tracing of latency, tokens and cost, prompt-injection guardrails, rate limiting, unit and integration tests, CI, and an evaluation harness with a 31-question golden set.

## Education

B.Tech, Information Science and Engineering — RNS Institute of Technology, Bengaluru, 2019 (7.4 CGPA)

## Awards

- Best Employee Award, Rakuten India, 2021
- Best Project, Project Open House "Panorama", RNSIT, 2019
- Best Public Speaker, Toastmasters International, 2021
