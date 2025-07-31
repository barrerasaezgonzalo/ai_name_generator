import { useState } from "react";
import splash from "../src/assets/splash.png";
import { useGemini } from "./hooks/useGemini";

export default function App() {
  const [input, setInput] = useState("");
  const { loading, response, generateContent } = useGemini();

  const handleSubmit = async () => {
    if (input.trim()) {
      generateContent(input);
    }
  };

  function OutputBox({ response }: { response: string | null }) {
    if (!response) return null;
    return (
      <div style={{ marginTop: 50, textAlign: "center" }}>
        <strong>Answer:</strong>
        <pre style={{ maxWidth: "90vw", whiteSpace: "pre-wrap" }}>
          {response}
        </pre>
      </div>
    );
  }

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        textAlign: "center",
      }}
    >
      <img
        src={splash}
        alt="Logo"
        style={{ width: "400px", height: "auto", marginBottom: 20 }}
      />
      <h1
        style={{
          textAlign: "center",
          fontSize: "2Rem",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        Simple Name Generator (AI-powered)
      </h1>

      <p
        style={{
          marginBottom: 30,
          textAlign: "center",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        Type a word or phrase in the text box and press "Submit" to
        automatically generate 20 related names.
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        style={{ width: "400px", maxWidth: "90vw", paddingLeft: 10 }}
        placeholder="Type something..."
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !input.trim()}
        style={{ marginTop: 20 }}
      >
        {loading ? "Generating..." : "Send!"}
      </button>
      {loading && <p>Generating names...</p>}
      <OutputBox response={response} />
    </section>
  );
}
