"use client";
import { useState } from "react";
import { useEffect, useRef } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  if (chatRef.current) {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }
}, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input;
    const userMessage: Message = { role: "user", content: userInput };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      // 👇 NEW TYPING EFFECT BLOCK
      const fullText = data.reply;

      // step 1: add empty assistant message
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "" },
      ]);

      // step 2: type it out
      let current = "";

      for (let i = 0; i < fullText.length; i++) {
        current += fullText[i];

        await new Promise((r) => setTimeout(r, 15)); // speed control

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: current,
          };
          return updated;
        });
      }

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error reaching AI service" },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans flex justify-center">
      
      <main className="w-full max-w-6xl grid grid-cols-3 gap-10 py-20 px-6">

        <div className="col-span-2">

          <section>
            <h1 className="text-4xl font-semibold text-black dark:text-zinc-50">
              Zameer (Zee)
            </h1>

            <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
              AI Product Engineer • Python • Applied ML
            </p>

            <p className="mt-4 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
              Product-focused technical engineer building cloud-based systems, APIs, and distributed data platforms.
            </p>
          </section>

          <section className="mt-16 border-t pt-10">
            <h2 className="text-2xl font-semibold mb-10 text-black dark:text-zinc-50">
              Projects
            </h2>

            <div className="mb-16">
              <h3 className="text-lg font-semibold">
                TruSic — Less Skip. More Play.
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 max-w-xl">
                Context-aware music system combining embeddings and behavioral triggers.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="text-lg font-semibold">
                Unnamed Health Engine
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 max-w-xl">
                Converts physiological data into adaptive guidance using pipelines + LLM.
              </p>
            </div>
          </section>

        </div>

        <div className="col-span-1 space-y-10">
          <div>
            <h3 className="font-semibold mb-2 text-black dark:text-zinc-50">Contact</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              techiezameer.h@gmail.com
            </p>
          </div>
        </div>

      </main>

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-zinc-900 border rounded-lg shadow-lg flex flex-col">
          
          <div className="p-3 border-b font-semibold">
            Ask Zee AI
          </div>

          <div
          ref={chatRef}
          className="flex-1 p-3 text-sm overflow-y-auto space-y-3 max-h-[320px]"
          >
            {messages.length === 0 && (
              <div className="text-zinc-500">Ask me anything about Zee...</div>
            )}

            {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-[80%] text-sm ${
                  msg.role === "user"
                    ? "bg-black text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border rounded-md px-2 py-1 text-sm"
              placeholder="Ask something..."
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />

            <button
              onClick={handleSend}
              className="px-3 py-1 text-sm bg-black text-white rounded-md"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </div>
  );
}