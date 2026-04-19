"use client";
import { useState, useEffect, useRef } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [showMatcher, setShowMatcher] = useState(false);
  const [jobDesc, setJobDesc] = useState("");
  const [matchResult, setMatchResult] = useState("");
  const [loadingMatch, setLoadingMatch] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input;
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setInput("");
    setLoadingChat(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      let current = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      for (let i = 0; i < data.reply.length; i++) {
        current += data.reply[i];
        await new Promise((r) => setTimeout(r, 10));

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: current,
          };
          return updated;
        });
      }
      setLoadingChat(false);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error reaching AI service" },
      ]);
    }
  };

  const handleMatch = async () => {
    if (!jobDesc.trim()) return;

    setLoadingMatch(true);
    setMatchResult("");

    try {
      const res = await fetch("/api/matcher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ job_description: jobDesc }),
      });

      const data = await res.json();

      setMatchResult(typeof data === "string" ? data : JSON.stringify(data, null, 2));
      setLoadingMatch(false);
    } catch {
      setMatchResult("Error generating match");
    }

    setLoadingMatch(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans px-4 md:px-6 py-10 md:py-16 relative">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-5xl font-semibold">Syed Zameer M</h1>

        <p className="mt-3 text-xl font-bold text-zinc-800 dark:text-zinc-200">
          +1 972.441.2534 · techiezameer.m@gmail.com
        </p>

        <p className="mt-6 text-xl leading-8 text-zinc-700 dark:text-zinc-300 max-w-5xl">
          I build intelligent systems that connect data, behavior, and real-world use.
          With 15+ years across product, backend engineering, cloud systems, and APIs,
          I focus on turning complex data into practical, scalable products.
          Today, I work at the intersection of Python, applied ML, and AI,
          building systems that don’t just respond, but understand context and adapt to users.
        </p>

        <p className="mt-3 italic text-zinc-500">
          Prefer less scrolling? Ask ZeeAI below.
        </p>

        <p className="mt-2 text-xs text-zinc-400">
          *This experience is optimized for desktop. Mobile enhancements are in progress.*
        </p>

        {/* DIVIDER */}
        <div className="mt-8 border-t pt-3" />
        {/* SPLIT SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-8 mt-6">

          {/* LEFT — now Explore */}
          <div className="md:col-span-5">
            <h2 className="text-2xl font-semibold mt-2 mb-4">Explore</h2>

            {/* JOB MATCHER */}
            <div className="mt-2">
              <h3 className="text-lg font-semibold">Match Your Role</h3>
              <p className="text-sm text-zinc-500 mt-1">
                Paste a job description and see alignment
              </p>

              {!showMatcher && (
                <button
                  onClick={() => setShowMatcher(true)}
                  className="mt-2 mb-2 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded text-sm relative z-10"
                >
                  Try Job Matcher
                </button>
              )}

              {showMatcher && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-[90vw] max-w-[500px] relative">

                    <button
                      onClick={() => setShowMatcher(false)}
                      className="absolute top-3 right-3 text-zinc-500 hover:text-black"
                    >
                      ✕
                    </button>

                    <h3 className="text-lg font-semibold mb-3">Match Your Role</h3>

                    <textarea
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      placeholder="Paste job description..."
                      className="w-full border rounded p-2 text-sm h-32"
                    />

                    <button
                      onClick={handleMatch}
                      className="mt-3 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded text-sm">
                      {loadingMatch ? "Generating..." : "Generate Match"}
                    </button>

                    {matchResult && (
                      <div className="mt-4 text-sm whitespace-pre-wrap border-t pt-3 max-h-64 overflow-y-auto">
                        {matchResult}
                      </div>
                    )}

                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4 text-base">
              <p>
                <a href="https://github.com/vasthelium" className="underline" target="_blank" rel="noopener noreferrer">GitHub</a>
                {" · "}
                <a href="https://www.linkedin.com/in/syedzameerm" className="underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                {" · "}
                <a href="https://medium.com/@techiezameer.m/trusic-playing-what-you-feel-not-what-you-usually-play-436870da0cd4" className="underline" target="_blank" rel="noopener noreferrer">Medium</a>
              </p>

              <p>
                <a
                  href="https://syedzameer-ai-data.s3.us-east-1.amazonaws.com/SyedZameer_Resume_Y26.pdf"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Full Resume (PDF)
                </a>
              </p>
            </div>

          </div>

          {/* RIGHT — now Interests */}
          <div className="md:col-span-5">
            <h2 className="text-2xl font-semibold mt-2 mb-4">Interests</h2>
            <ul className="text-base space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>Python · Applied ML · Retrieval Systems (RAG) · Agentic AI</li>
              <li>Systems Thinking · First Principles · Pattern Recognition</li>
              <li>ML/AI Depth · Systems, Product & Cloud Breadth</li>
              <li>Tegmark · Dawkins · Sagan · Sapolsky</li>
              <li>Acquired · Long-form Tech & Business Thinking</li>
              <li>Investigative Thrillers · Curiosity Driven</li>
              <li>Life Learning · Fatherhood · Cats 🐾</li>
            </ul>
          </div>

        </div>

        {/* PROJECTS */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Projects / Research</h2>

          <div className="mb-10">
            <h3 className="font-semibold mb-2">TruSic</h3>

            <p className="text-sm mt-1 mb-3">
              <a href="https://syedzameer-ai-data.s3.us-east-1.amazonaws.com/TruSic.svg" className="underline">System Diagram</a> ·{" "}
              <a href="https://github.com/vasthelium/TruSic" className="underline">GitHub</a>
            </p>
            <ul className="text-base space-y-2">
              <li>Building a context-aware music system that aligns playback with real-time human state</li>
              <li>Multimodal system combining CLAP, YAMNet, Wav2Vec, physiological signals, and behavioral triggers to model “felt music”</li>
              <li>Uses structured trigger signals and contextual inputs to model and progressively learn song associations</li>
              <li>Shifts retrieval from history-based recommendations to current internal state</li>
              <li>Leverages vector similarity (pgvector) to match contextual embeddings for precise retrieval</li>
            </ul>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold mb-2">AI Resume Site</h3>

            <p className="text-sm mt-1 mb-3">
              <a href="https://syedzameer-ai-data.s3.us-east-1.amazonaws.com/AI_ResumeSite.svg" className="underline">System Diagram</a> ·{" "}
              <a href="https://github.com/vasthelium/zee-ai-site" className="underline">GitHub</a>
            </p>
            <ul className="text-base space-y-2">
              <li>Custom RAG pipeline (chunking, embeddings, retrieval, LLM) over a curated personal corpus</li>
              <li>Real-time interaction through a FastAPI backend integrated with a lightweight frontend (Next.js)</li>
              <li>AI-powered portfolio that allows users to interact with work through conversation instead of static content</li>
              <li>Transforms a traditional resume into a context-aware, interactive system</li>
            </ul>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold mb-2">Health Engine</h3>

            <ul className="text-base space-y-2">
              <li>A personal health intelligence system that translates physiological data into adaptive daily guidance</li>
              <li>Ingests wearable data, normalizes signals, applies rule-based and LLM-driven reasoning</li>
              <li>Focuses on flexible, user-specific behavior guidance instead of rigid templates</li>
              <li>Fully automated pipeline using scheduled workflows (GitHub Actions)</li>
            </ul>
          </div>
        </div>

        {/* WORK EXPERIENCE */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Work Experience</h2>

          {/* Yum */}
          <div className="mb-8">
            <h3 className="font-semibold">Yum Brands — Product Technical Engineer</h3>
            <p className="text-sm text-zinc-500">Apr 2023 - Present</p>
            <ul className="mt-2 space-y-2">
              <li>Building AI-driven predictive search and suggestion systems within menu hub enabling contextual reuse of existing configurations</li>
              <li>Designing context-aware reuse patterns to reduce duplication and improve efficiency</li>
              <li>Leading product development of menu management systems, integrating AWS services (Lambda, S3, RDS) to support workflows</li>
              <li>Working across API-driven systems, validating payloads and ensuring reliable request-response flows across distributed services</li>
              <li>Improving system scalability and observability through CloudWatch and DataDog</li>
              <li>Worked with enterprise AI systems and production evaluation frameworks</li>
            </ul>
          </div>

          {/* PACCAR */}
          <div className="mb-8">
            <h3 className="font-semibold">PACCAR — Technical Product Analyst</h3>
            <p className="text-sm text-zinc-500">Oct 2023 – Apr 2024</p>
            <ul className="mt-2 space-y-2">
              <li>Contributed to PACCGPT, an internal AI-driven enterprise knowledge interface, supporting early-stage development and integration design</li>
              <li>Defined data integration points for the Connected Vehicle Platform (CVP), aligning fleet and diagnostic systems</li>
              <li>Aligned vehicle diagnostics data to enable future integration into AI-driven systems</li>
              <li>Supported modernization efforts transitioning legacy systems to Azure-based, event-driven architecture</li>
              <li>Worked across APIs, data pipelines, and microservices, supporting distributed system integrations</li>
            </ul>
          </div>

          {/* Toyota */}
          <div className="mb-8">
            <h3 className="font-semibold">Toyota — Technical Product Owner / Analyst</h3>
            <p className="text-sm text-zinc-500">Sep 2021 – Jul 2023</p>
            <ul className="mt-2 space-y-2">
              <li>Led API mapping and end-to-end data flow analysis across legacy and cloud-native systems during AWS migration</li>
              <li>Supported transition to microservices and event-driven architecture, improving performance and integration reliability</li>
              <li>Collaborated with cross-functional teams to define and refine requirements for large-scale modernization initiatives</li>
              <li>Maintained system documentation and integration artifacts to support delivery, onboarding, and knowledge sharing</li>
            </ul>
          </div>

          {/* United */}
          <div className="mb-8">
            <h3 className="font-semibold">United Airlines — Technical Analyst</h3>
            <p className="text-sm text-zinc-500">Feb 2020 – Sep 2021</p>
            <ul className="mt-2 space-y-2">
              <li>Supported end-to-end development of customer-facing mobile applications, from requirements through production deployment</li>
              <li>Conducted gap analysis and feature prioritization to support transition from legacy to modern platforms</li>
              <li>Collaborated with engineering and design teams to translate user needs into functional requirements and improve usability</li>
              <li>Ensured API compatibility and consistent performance across mobile and responsive platforms</li>
            </ul>
          </div>

          {/* Aspire */}
          <div className="mb-8">
            <h3 className="font-semibold">Aspire Systems — Software Engineer</h3>
            <p className="text-sm text-zinc-500">May 2016 – Dec 2019</p>
            <ul className="mt-2 space-y-2">
              <li>Worked on large-scale data processing systems in the warranty domain, supporting high-volume enterprise platforms</li>
              <li>Built and maintained data pipelines using SQL and Python for processing, transformation, and validation</li>
              <li>Contributed to data engineering workflows using PostgreSQL and enterprise data platforms, ensuring accuracy and performance</li>
              <li>Developed automation scripts to streamline data validation, transformation, and operational processes</li>
              <li>Collaborated on technical and functional specifications, aligning data flows with business requirements</li>
            </ul>
          </div>

          {/* Earlier */}
          <div>
            <h3 className="font-semibold">Earlier Experience — NTT Data / Wipro</h3>
            <ul className="mt-2 space-y-2">
              <li>Worked on enterprise systems across healthcare and financial domains, including claims and transaction platforms</li>
              <li>Documented and refined system requirements (BRD, SRS) to support development and integration workflows</li>
              <li>Handled integrations and compliance-driven application development within regulated enterprise systems</li>
              <li>Supported testing, automation, and system validation for high-volume, business-critical platforms</li>
            </ul>
          </div>
        </div>

        {/* TOOLS */}
        <div className="mt-16">
          <h3 className="font-semibold mb-2">Tools</h3>
          <ul className="space-y-2">
            <li>Python, APIs, FastAPI, OpenAI / LLM APIs</li>
            <li>PostgreSQL (Neon), pgvector, Pinecone, MySQL</li>
            <li>AWS, Azure, Vercel</li>
            <li>Postman, Swagger, GitHub Actions, Atlassian, Azure DevOps</li>
            <li>CloudWatch, Splunk, AppDynamics</li>
            <li>AWS Certified Solutions Architect, Google IT Automation with Python</li>
            <li>CKAD (In Progress), Docker</li>
          </ul>
        </div>

      </div>

      {/* CHAT — unchanged */}
      {!showMatcher && !open && (
        <button
          onClick={() => setOpen(!open)}
          className="fixed bottom-18 right-4 md:right-[calc((100vw-72rem)/2+1.5rem)] px-5 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center gap-2 shadow-lg text-sm z-30"
        >
          💬 <span className="font-medium">Ask ZeeAI</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-4 md:right-[calc((100vw-72rem)/2+1.5rem)] w-[72vw] max-w-[320px] h-[52vh] max-h-[460px] bg-white dark:bg-zinc-900 border rounded-lg shadow-lg flex flex-col">
          <div className="p-3 border-b font-semibold flex justify-between items-center">
            <span>Ask Zee AI</span>
            <button
              onClick={() => setOpen(false)}
              className="text-zinc-500 hover:text-black text-sm"
            >
              ✕
            </button>
          </div>
          {/* DISCLAIMER */}
          <div className="px-3 pb-2 text-[11px] text-zinc-500">
            *AI responses may be incomplete. Reach Zameer for more info..*
          </div>

          <div ref={chatRef} className="flex-1 p-3 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === "user" ? "text-right" : ""}>
                <div className={`inline-block px-3 py-2 rounded-lg ${msg.role === "user"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-zinc-200 dark:bg-zinc-700"
                  }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loadingChat && (
              <div>
                <div className="inline-block px-3 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-sm italic">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-3 flex gap-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border px-2 py-1 rounded text-sm"
              placeholder="Ask something..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="bg-black text-white dark:bg-white dark:text-black px-3 rounded">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}