import "./ChatUI.css";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useRef } from "react";
function ChatUI() {
  const [corpus, setCorpus] = useState([]);
  const [selectedCorpus, setSelectedCorpus] = useState(null);
const messagesEndRef = useRef(null);
  const [uploadError, setUploadError] = useState("");

  const [documents, setDocuments] = useState([]);
  const [history, setHistory] = useState([]);

  const [citations, setCitations] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(null);
  const [newCorpus, setNewCorpus] = useState("");

  const [sessionId, setSessionId] = useState(null);

  const selectedCorpusObj = corpus.find((c) => c.id === selectedCorpus);
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [history, chatLoading]);
  useEffect(() => {
    fetchCorpus();
  }, []);

  // -------------------------
  // FETCH CORPUS LIST
  // -------------------------
  const fetchCorpus = async () => {
    try {
      const res = await API.get("/auth/corpus");
      setCorpus(res.data);
    } catch (err) {
      console.error("Corpus Fetch Error:", err);
    }
  };

  // -------------------------
  // LOAD CORPUS
  // -------------------------
  const loadCorpus = async (id) => {
    try {
      setLoading(true);
      setSelectedCorpus(id);

      const res = await API.get(`/auth/corpus/${id}`);

      setDocuments(res.data.documents || []);
      setHistory(res.data.chat_history || []);
      setCitations([]);

      // IMPORTANT: reset session when switching corpus
      setSessionId(null);

      setSelectedDocument(null);
    } catch (err) {
      console.error("Load Corpus Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // CREATE CORPUS
  // -------------------------
  const createCorpus = async () => {
    if (!newCorpus.trim()) return;

    try {
      const res = await API.post("/auth/corpus", {
        name: newCorpus,
      });

      setCorpus((prev) => [...prev, res.data]);

      setShowCreate(false);
      setNewCorpus("");

      loadCorpus(res.data.id);
    } catch (err) {
      console.error("Create Corpus Error:", err);
    }
  };

  // -------------------------
  // DELETE CORPUS
  // -------------------------
  const deleteCorpus = async (id) => {
    try {
      const res = await API.delete(`/auth/corpus/${id}`);

      const deletedId = res.data.id;

      setCorpus((prev) => prev.filter((c) => c.id !== deletedId));

      if (selectedCorpus === deletedId) {
        setSelectedCorpus(null);
        setDocuments([]);
        setHistory([]);
        setCitations([]);
        setSessionId(null);
      }

      setShowDelete(null);
    } catch (err) {
      console.error("Delete Corpus Error:", err);
    }
  };

  // -------------------------
  // UPLOAD FILE
  // -------------------------
  const upload = async (e, corpusId) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await API.post(`/auth/corpus/${corpusId}/upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("response uload is : ", res);
      if (selectedCorpus === corpusId) {
        loadCorpus(corpusId);
      }
    } catch (err) {
      console.error("Upload Error:", err);

      const message = err.response?.data?.detail || "Failed to upload document";

      setUploadError(message);
    }

    e.target.value = "";
  };

  // -------------------------
  // ASK QUESTION (FIXED)
  // -------------------------

  const askQuestion = async () => {
    if (!selectedCorpus || !question.trim() || chatLoading) return;

    const userQuestion = question;
    setQuestion("");

    setHistory((prev) => [
      ...prev,
      {
        role: "user",
        message: userQuestion,
      },
    ]);

    setChatLoading(true);

    try {
      const res = await API.post("/auth/chat", {
        corpus_id: String(selectedCorpus),
        query: userQuestion,
      });

      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          message: res.data.answer,
          citations: res.data.citations || [],
        },
      ]);
    } catch (err) {
      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          message: "Error: Failed to fetch response",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };


  const groupCitations = (citations = []) => {
  const grouped = {};

  citations.forEach((c) => {
    if (!c.filename) return;

    if (!grouped[c.filename]) {
      grouped[c.filename] = new Set();
    }

    if (c.page_number) {
      grouped[c.filename].add(c.page_number);
    }
  });

  return Object.entries(grouped).map(([filename, pages]) => ({
    filename,
    pages: [...pages].sort((a, b) => a - b),
  }));
};



  // const askQuestion = async () => {
  //   if (!selectedCorpus || !question.trim()) return;

  //   const userQuestion = question;
  //   setQuestion("");

  //   setHistory((prev) => [
  //     ...prev,
  //     {
  //       role: "user",
  //       message: userQuestion,
  //     },
  //   ]);

  //   try {
  //     console.log("🚀 QUERY REQUEST:", {
  //       user_id: "usr_001",
  //       corpus_id: selectedCorpus,
  //       session_id: sessionId,
  //       query: userQuestion,
  //     });

  //     const res = await API.post("/auth/chat", {

  //       corpus_id: String(selectedCorpus),
  //       query: userQuestion,
  //     });

  //     console.log("✅ RESPONSE:", res.data);

  //     setHistory((prev) => [
  //       ...prev,
  //       {
  //         role: "assistant",
  //         message: res.data.answer,
  //         citations: res.data.citations || [],
  //       },
  //     ]);

  //   } catch (err) {
  //     console.error("❌ Query Error:", err);
  //     console.error("Status:", err.response?.status);
  //     console.error("Data:", err.response?.data);

  //     setHistory((prev) => [
  //       ...prev,
  //       {
  //         role: "assistant",
  //         message: "Error: Failed to fetch response",
  //       },
  //     ]);
  //   }
  // };
  // -------------------------
  // UI (UNCHANGED)
  // -------------------------
  return (
    <div className="layout">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="logo">CorpusIQ</div>

        <button className="create-btn" onClick={() => setShowCreate(true)}>
          + New Corpus
        </button>

        <div className="sidebar-list">
          {corpus.map((item) => (
            <div
              key={item.id}
              className={`corpus-card ${
                selectedCorpus === item.id ? "active" : ""
              }`}
            >
              <div className="corpus-main" onClick={() => loadCorpus(item.id)}>
                {item.name}
              </div>

              <div className="corpus-actions">
                <label className="small-upload">
                  +
                  <input
                    type="file"
                    hidden
                    onChange={(e) => upload(e, item.id)}
                  />
                </label>

                <button onClick={() => setShowDelete(item.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CHAT */}
      <div className="chat-container">
        <div className="topbar">
          {selectedCorpusObj
            ? `Corpus: ${selectedCorpusObj.name}`
            : "Select Corpus"}
        </div>

        {!selectedCorpus ? (
          <div className="center">
            {" "}
            <h2>Welcome to CorpusIQ</h2>
            <p>Create a corpus and upload documents to start chatting.</p>
          </div>
        ) : loading ? (
          <div className="center">Loading...</div>
        ) : (
          <>
            {/* DOCUMENTS */}
            {selectedDocument && (
              <div className="selected-doc">
                Searching only:
                <strong> {selectedDocument}</strong>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="clear-doc-btn"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="document-area">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`doc-card ${
                    selectedDocument === doc.filename ? "active-doc" : ""
                  }`}
                  onClick={() =>
                    setSelectedDocument(
                      selectedDocument === doc.filename ? null : doc.filename,
                    )
                  }
                >
                  📄 {doc.filename}
                </div>
              ))}
            </div>

            {/* CHAT */}
            <div className="messages">
              {history.map((msg, i) => (
                <div key={i} className={`msg ${msg.role}`}>
                  <div>{msg.message}</div>

                 {/* {msg.role === "assistant" && msg.citations?.length > 0 && (
                    <div className="message-citations">
                      {msg.citations.map((c, idx) => (
                        <div key={idx} className="citation-card">
                          <strong>📄 {c.filename}</strong>
                          <div>Page {c.page}</div>
                        </div>
                      ))}
                    </div>
                  )} */}


{groupCitations(msg.citations).map((c, idx) => (
  <div key={idx} className="citation-card">
    <strong>📄 {c.filename}</strong>

    {c.pages.length > 0 && (
      <div>Pages: {c.pages.join(", ")}</div>
    )}
  </div>
))}

                </div>
              ))}
            </div>


 {chatLoading && (
        <div className="msg assistant loading-msg">
          <div className="typing-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}


            {/* INPUT */}
            <div className="input-wrap">
              <input
                disabled={documents.length === 0}
                placeholder={
                  documents.length === 0
                    ? "Upload document first"
                    : "Ask question"
                }
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && askQuestion()}
              />

              <button onClick={askQuestion}>Send</button>
            </div>
          </>
        )}
          <div ref={messagesEndRef} />
      </div>
 
      {/* MODALS (UNCHANGED) */}
      {showCreate && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Create Corpus</h3>
            <input
              value={newCorpus}
              onChange={(e) => setNewCorpus(e.target.value)}
            />
            <div className="modal-btns">
              <button onClick={createCorpus}>Create</button>
              <button onClick={() => setShowCreate(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Delete Corpus?</h3>
            <div className="modal-btns">
              <button onClick={() => deleteCorpus(showDelete)}>Delete</button>
              <button onClick={() => setShowDelete(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {uploadError && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Upload Error</h3>
            <p>{uploadError}</p>
            <div className="modal-btns">
              <button onClick={() => setUploadError("")}>OK</button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
}

export default ChatUI;
