// import "./ChatUI.css";

// import { useEffect,useRef,useState } from "react";

// import API from "../services/api";

// function ChatUI({ user }) {

// const [corpus,setCorpus] =
// useState(user?.corpus || []);

// const [selectedCorpus,setSelectedCorpus] =
// useState(null);

// const [documents,setDocuments] =
// useState([]);

// const [history,setHistory] =
// useState([]);

// const [question,setQuestion] =
// useState("");

// const [citations,setCitations] =
// useState([]);

// const [loading,setLoading] =
// useState(false);

// const [showCreate,setShowCreate] =
// useState(false);

// const [newCorpus,setNewCorpus] =
// useState("");

// const [showDelete,setShowDelete] =
// useState(null);

// const uploadRef =
// useRef();

// const loadCorpus =
// async(id)=>{

// try{

// setLoading(true);

// setSelectedCorpus(id);

// localStorage.setItem(
// "selectedCorpus",
// id
// );

// const corpusRes =
// await API.get(
// `/corpus/${id}`
// );

// setDocuments(
// corpusRes.data.documents || []
// );

// const historyRes =
// await API.get(
// `/corpus/${id}/chat-history`
// );

// setHistory(
// historyRes.data || []
// );

// }
// finally{

// setLoading(false);

// }

// };

// useEffect(()=>{

// const saved =
// localStorage.getItem(
// "selectedCorpus"
// );

// if(saved){

// loadCorpus(saved);

// }

// },[]);

// const createCorpus =
// async()=>{

// if(!newCorpus.trim())
// return;

// const res =
// await API.post(
// "/corpus",
// {
// name:newCorpus
// }
// );

// setCorpus(prev=>[
// ...prev,
// res.data
// ]);

// setShowCreate(false);

// setNewCorpus("");

// await loadCorpus(
// res.data.id
// );

// setTimeout(()=>{

// uploadRef.current?.click();

// },300);

// };

// const upload =
// async(e)=>{

// const file =
// e.target.files[0];

// if(!file)
// return;

// const form =
// new FormData();

// form.append(
// "file",
// file
// );

// await API.post(

// `/corpus/${selectedCorpus}/upload`,

// form

// );

// loadCorpus(
// selectedCorpus
// );

// };

// const deleteCorpus =
// async(id)=>{

// await API.delete(
// `/corpus/${id}`
// );

// const updated =
// corpus.filter(
// c=>c.id!==id
// );

// setCorpus(updated);

// if(selectedCorpus===id){

// setSelectedCorpus(null);

// setDocuments([]);

// setHistory([]);

// }

// setShowDelete(null);

// };

// const askQuestion =
// async()=>{

// if(
// !selectedCorpus ||
// documents.length===0
// )
// return;

// const q =
// question.trim();

// if(!q) return;

// setQuestion("");

// setHistory(prev=>[
// ...prev,
// {
// role:"user",
// message:q
// }
// ]);

// const res =
// await API.post(

// `/corpus/${selectedCorpus}/query`,

// {
// question:q
// }

// );

// setHistory(prev=>[
// ...prev,
// {
// role:"assistant",
// message:res.data.answer
// }
// ]);

// setCitations(
// res.data.citations || []
// );

// };

// return(

// <div className="layout">

// <div className="sidebar">

// <div className="logo">

// CorpusIQ

// </div>

// <button

// className="create-btn"

// onClick={()=>
// setShowCreate(true)
// }

// >

// + New Corpus

// </button>

// <div className="sidebar-list">

// {

// corpus.map((item)=>(

// <div
// key={item.id}
// className={`corpus-card ${
// selectedCorpus===item.id
// ? "active"
// :""
// }`}
// >

// <div
// className="corpus-name"
// onClick={()=>
// loadCorpus(item.id)
// }
// >

// {item.name}

// </div>

// <button

// className="delete-small"

// onClick={()=>{

// setShowDelete(
// item.id
// );

// }}

// >

// ✕

// </button>

// </div>

// ))

// }

// </div>

// </div>

// <div className="chat-container">

// <div className="topbar">

// {

// selectedCorpus

// ?

// `Corpus ${selectedCorpus}`

// :

// "Select Corpus To Continue"

// }

// </div>

// {

// !selectedCorpus ?

// <div className="center">

// Choose Corpus From Sidebar

// </div>

// :

// loading ?

// <div className="center">

// Loading...

// </div>

// :

// <>

// <div className="toolbar">

// <label className="upload-card">

// + Add Document

// <input
// hidden
// type="file"
// ref={uploadRef}
// onChange={upload}
// />

// </label>

// </div>

// <div className="document-area">

// {

// documents.map((doc)=>(

// <div
// key={doc.id}
// className="doc-card"
// >

// {doc.filename}

// </div>

// ))

// }

// </div>

// <div className="messages">

// {

// history.map((msg,index)=>(

// <div

// key={index}

// className={`msg ${msg.role}`}

// >

// {msg.message}

// </div>

// ))

// }

// </div>

// <div className="citation-wrap">

// {

// citations.map((c,i)=>(

// <div
// key={i}
// className="citation"
// >

// {c.document}

// Page {c.page}

// </div>

// ))

// }

// </div>

// <div className="input-wrap">

// <input

// disabled={
// documents.length===0
// }

// value={question}

// placeholder={

// documents.length===0

// ?

// "Upload document first"

// :

// "Ask question"

// }

// onChange={(e)=>

// setQuestion(
// e.target.value
// )

// }

// />

// <button
// onClick={askQuestion}
// disabled={
// documents.length===0
// }
// >

// Send

// </button>

// </div>

// </>

// }

// </div>

// {

// showCreate &&

// <div className="modal-bg">

// <div className="modal">

// <h3>

// Create Corpus

// </h3>

// <input

// value={newCorpus}

// onChange={(e)=>

// setNewCorpus(
// e.target.value
// )

// }

// />

// <div className="modal-btns">

// <button
// onClick={createCorpus}
// >

// Create

// </button>

// <button
// onClick={()=>
// setShowCreate(false)
// }
// >

// Cancel

// </button>

// </div>

// </div>

// </div>

// }

// {

// showDelete &&

// <div className="modal-bg">

// <div className="modal">

// <h3>

// Delete Corpus?

// </h3>

// <div className="modal-btns">

// <button

// onClick={()=>

// deleteCorpus(
// showDelete
// )

// }

// >

// Delete

// </button>

// <button

// onClick={()=>

// setShowDelete(null)

// }

// >

// Cancel

// </button>

// </div>

// </div>

// </div>

// }

// </div>

// );

// }

// export default ChatUI;

// import "./ChatUI.css";

// import { useEffect, useState } from "react";

// function ChatUI() {
//   const [corpus, setCorpus] = useState([
//     {
//       id: 1,
//       name: "Finance Docs",
//     },

//     {
//       id: 2,
//       name: "Research Papers",
//     },

//     {
//       id: 3,
//       name: "HR Policies",
//     },
//   ]);

//   const [selectedCorpus, setSelectedCorpus] = useState(null);

//   const [documents, setDocuments] = useState([]);

//   const [history, setHistory] = useState([]);

//   const [question, setQuestion] = useState("");

//   const [citations, setCitations] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const [showCreate, setShowCreate] = useState(false);

//   const [showDelete, setShowDelete] = useState(null);

//   const [newCorpus, setNewCorpus] = useState("");

//   const corpusData = {
//     1: {
//       documents: [
//         { id: 1, filename: "budget_2025.pdf" },
//         { id: 2, filename: "annual_report.pdf" },
//       ],

//       history: [
//         {
//           role: "assistant",
//           message: "Finance corpus loaded",
//         },

//         {
//           role: "user",
//           message: "Explain EBITDA",
//         },

//         {
//           role: "assistant",
//           message:
//             "EBITDA is earnings before interest taxes depreciation and amortization.",
//         },
//       ],
//     },

//     2: {
//       documents: [{ id: 1, filename: "transformers.pdf" }],

//       history: [
//         {
//           role: "assistant",
//           message: "Research corpus ready",
//         },
//       ],
//     },

//     3: {
//       documents: [],

//       history: [],
//     },
//   };

//   const loadCorpus = (id) => {
//     setLoading(true);

//     setSelectedCorpus(id);

//     localStorage.setItem("selectedCorpus", id);

//     setTimeout(() => {
//       setDocuments(corpusData[id]?.documents || []);

//       setHistory(corpusData[id]?.history || []);

//       setLoading(false);
//     }, 400);
//   };

//   useEffect(() => {
//     const saved = localStorage.getItem("selectedCorpus");

//     if (saved) {
//       loadCorpus(Number(saved));
//     }
//   }, []);

//   const createCorpus = () => {
//     if (!newCorpus.trim()) return;

//     const item = {
//       id: Date.now(),

//       name: newCorpus,
//     };

//     setCorpus((prev) => [...prev, item]);

//     setShowCreate(false);

//     setNewCorpus("");

//     loadCorpus(item.id);
//   };

//   const upload = (e, corpusId) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     const newDoc = {
//       id: Date.now(),

//       filename: file.name,
//     };

//     if (selectedCorpus === corpusId) {
//       setDocuments((prev) => [...prev, newDoc]);
//     }
//   };

//   const deleteCorpus = (id) => {
//     const updated = corpus.filter((c) => c.id !== id);

//     setCorpus(updated);

//     if (selectedCorpus === id) {
//       setSelectedCorpus(null);

//       setDocuments([]);

//       setHistory([]);
//     }

//     setShowDelete(null);
//   };

//   const askQuestion = () => {
//     if (!selectedCorpus || documents.length === 0) return;

//     const q = question.trim();

//     if (!q) return;

//     setQuestion("");

//     setHistory((prev) => [
//       ...prev,

//       {
//         role: "user",
//         message: q,
//       },

//       {
//         role: "assistant",
//         message: `Mock answer for "${q}" using selected corpus`,
//       },
//     ]);

//     setCitations([
//       {
//         document: "sample.pdf",
//         page: 4,
//       },

//       {
//         document: "notes.pdf",
//         page: 2,
//       },
//     ]);
//   };

//   return (
//     <div className="layout">
//       <div className="sidebar">
//         <div className="logo">CorpusIQ</div>

//         <button className="create-btn" onClick={() => setShowCreate(true)}>
//           + New Corpus
//         </button>

//         <div className="sidebar-list">
//           {corpus.map((item) => (
//             <div
//               key={item.id}
//               className={`corpus-card ${
//                 selectedCorpus === item.id ? "active" : ""
//               }`}
//             >
//               <div
//                 className="corpus-main"
//                 onClick={() => {
//                   loadCorpus(item.id);
//                 }}
//               >
//                 <div className="corpus-name">{item.name}</div>
//               </div>

//               <div className="corpus-actions">
//                 <label className="small-upload">
//                   +
//                   <input
//                     hidden
//                     type="file"
//                     onChange={(e) => upload(e, item.id)}
//                   />
//                 </label>

//                 <button
//                   className="delete-small"
//                   onClick={() => {
//                     setShowDelete(item.id);
//                   }}
//                 >
//                   ✕
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="chat-container">
//         <div className="topbar">
//           {selectedCorpus
//             ? `Active Corpus : ${selectedCorpus}`
//             : "Select Corpus To Continue"}
//         </div>

//         {!selectedCorpus ? (
//           <div className="center">Choose corpus from sidebar</div>
//         ) : loading ? (
//           <div className="center">Loading Corpus...</div>
//         ) : (
//           <>
//             <div className="document-area">
//               {documents.map((doc) => (
//                 <div key={doc.id} className="doc-card">
//                   {doc.filename}
//                 </div>
//               ))}
//             </div>

//             <div className="messages">
//               {history.map((msg, index) => (
//                 <div key={index} className={`msg ${msg.role}`}>
//                   {msg.message}
//                 </div>
//               ))}
//             </div>

//             <div className="citation-wrap">
//               {citations.map((c, i) => (
//                 <div key={i} className="citation">
//                   {c.document}
//                   Page {c.page}
//                 </div>
//               ))}
//             </div>

//             <div className="input-wrap">
//               <input
//                 disabled={documents.length === 0}
//                 placeholder={
//                   documents.length === 0
//                     ? "Upload document first"
//                     : "Ask question"
//                 }
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//               />

//               <button disabled={documents.length === 0} onClick={askQuestion}>
//                 Send
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       {showCreate && (
//         <div className="modal-bg">
//           <div className="modal">
//             <h3>Create Corpus</h3>

//             <input
//               placeholder="Corpus Name"
//               value={newCorpus}
//               onChange={(e) => setNewCorpus(e.target.value)}
//             />

//             <div className="modal-btns">
//               <button onClick={createCorpus}>Create</button>

//               <button onClick={() => setShowCreate(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showDelete && (
//         <div className="modal-bg">
//           <div className="modal">
//             <h3>Delete Corpus?</h3>

//             <div className="modal-btns">
//               <button
//                 onClick={() => {
//                   deleteCorpus(showDelete);
//                 }}
//               >
//                 Delete
//               </button>

//               <button
//                 onClick={() => {
//                   setShowDelete(null);
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatUI;






























// import "./ChatUI.css";
// import { useEffect, useState } from "react";
// import API from "../services/api";

// function ChatUI() {
//   const [corpus, setCorpus] = useState([]);

//   const [selectedCorpus, setSelectedCorpus] = useState(null);

//   const [documents, setDocuments] = useState([]);

//   const [history, setHistory] = useState([]);

//   const [question, setQuestion] = useState("");

//   const [citations, setCitations] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const [showCreate, setShowCreate] = useState(false);

//   const [showDelete, setShowDelete] = useState(null);

//   const [newCorpus, setNewCorpus] = useState("");

//   useEffect(() => {
//     fetchCorpus();
//   }, []);

//   const fetchCorpus = async () => {
//     try {
//       console.log("GET /auth/corpus");

//       const res = await API.get("/auth/corpus");

//       console.log("Corpus Response:", res.data);

//       setCorpus(res.data);
//     } catch (err) {
//       console.error("Corpus Fetch Error:", err);

//       if (err.response) {
//         console.error("Status:", err.response.status);
//         console.error("Data:", err.response.data);
//       }
//     }
//   };

//   const loadCorpus = async (id) => {
//     try {
//       setLoading(true);

//       console.log(`GET /auth/corpus/${id}`);

//       setSelectedCorpus(id);

//       const res = await API.get(`/auth/corpus/${id}`);

//       console.log("Corpus Details Response:", res.data);

//       setDocuments(res.data.documents || []);
//       setHistory(res.data.chat_history || []);
//     } catch (err) {
//       console.error("Load Corpus Error:", err);

//       if (err.response) {
//         console.error("Status:", err.response.status);
//         console.error("Data:", err.response.data);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createCorpus = async () => {
//     if (!newCorpus.trim()) return;

//     try {
//       const payload = {
//         name: newCorpus,
//       };

//       console.log("POST /auth/corpus");
//       console.log("Request Payload:", payload);

//       const res = await API.post("/auth/corpus", payload);

//       console.log("Create Corpus Response:", res.data);

//       setCorpus((prev) => [...prev, res.data]);

//       setShowCreate(false);
//       setNewCorpus("");

//       loadCorpus(res.data.id);
//     } catch (err) {
//       console.error("Create Corpus Error:", err);

//       if (err.response) {
//         console.error("Status:", err.response.status);
//         console.error("Data:", err.response.data);
//       }
//     }
//   };

//   const deleteCorpus = async (id) => {
//     try {
//       console.log(`DELETE /auth/corpus/${id}`);

//       const res = await API.delete(`/auth/corpus/${id}`);

//       console.log("Delete Response:", res.data);

//       const deletedId = res.data.id;

//       setCorpus((prev) => prev.filter((item) => item.id !== deletedId));

//       if (selectedCorpus === deletedId) {
//         setSelectedCorpus(null);
//         setDocuments([]);
//         setHistory([]);
//         setCitations([]);
//       }

//       setShowDelete(null);
//     } catch (err) {
//       console.error("Delete Corpus Error:", err);

//       if (err.response) {
//         console.error("Status:", err.response.status);
//         console.error("Data:", err.response.data);
//       }
//     }
//   };

// const upload = async (e, corpusId) => {
//   const file = e.target.files[0];

//   if (!file) return;

//   try {
//     const form = new FormData();
//     form.append("file", file);

//     console.group("UPLOAD REQUEST");
//     console.log("Endpoint:", `/corpus/${corpusId}/upload`);
//     console.log("Corpus ID:", corpusId);
//     console.log("File Name:", file.name);
//     console.log("File Size:", file.size);
//     console.log("File Type:", file.type);
//     console.groupEnd();

//     const res = await API.post(
//       `/auth/corpus/${corpusId}/upload`,
//       form,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     console.group("UPLOAD RESPONSE");
//     console.log(res.data);
//     console.groupEnd();

//     if (selectedCorpus === corpusId) {
//       await loadCorpus(corpusId);
//     }
//   } catch (err) {
//     console.group("UPLOAD ERROR");

//     console.error(err);

//     if (err.response) {
//       console.error("Status:", err.response.status);
//       console.error("Response:", err.response.data);
//     }

//     console.groupEnd();
//   }
// };
//   const askQuestion = async () => {
//     if (!selectedCorpus) return;
//     if (!question.trim()) return;

//     const payload = {
//       question: question,
//     };

//     try {
//       console.log(`POST /corpus/${selectedCorpus}/query`);
//       console.log("Request Payload:", payload);

//       const userQuestion = question;

//       setQuestion("");

//       setHistory((prev) => [
//         ...prev,
//         {
//           role: "user",
//           message: userQuestion,
//         },
//       ]);

//       const res = await API.post(`/corpus/${selectedCorpus}/query`, payload);

//       console.log("Query Response:", res.data);

//       setHistory((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           message: res.data.answer,
//         },
//       ]);

//       setCitations(res.data.citations || []);
//     } catch (err) {
//       console.error("Query Error:", err);

//       if (err.response) {
//         console.error("Status:", err.response.status);
//         console.error("Data:", err.response.data);
//       }
//     }
//   };

//   return (
//     <div className="layout">
//       <div className="sidebar">
//         <div className="logo">CorpusIQ</div>

//         <button
//           className="create-btn"
//           onClick={() => {
//             setShowCreate(true);
//           }}
//         >
//           + New Corpus
//         </button>

//         <div className="sidebar-list">
//           {corpus.map((item) => (
//             <div
//               key={item.id}
//               className={`corpus-card ${
//                 selectedCorpus === item.id ? "active" : ""
//               }`}
//             >
//               <div
//                 className="corpus-main"
//                 onClick={() => {
//                   loadCorpus(item.id);
//                 }}
//               >
//                 <div className="corpus-name">{item.name}</div>
//               </div>

//               <div className="corpus-actions">
//                 <label className="small-upload">
//                   +
//                   <input
//                     hidden
//                     type="file"
//                     onChange={(e) => upload(e, item.id)}
//                   />
//                 </label>

//                 <button
//                   className="delete-small"
//                   onClick={() => {
//                     setShowDelete(item.id);
//                   }}
//                 >
//                   ✕
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="chat-container">
//         <div className="topbar">
//           {selectedCorpus ? `Corpus : ${selectedCorpus}` : "Select Corpus"}
//         </div>

//         {!selectedCorpus ? (
//           <div className="center">Choose corpus from sidebar</div>
//         ) : loading ? (
//           <div className="center">Loading...</div>
//         ) : (
//           <>
//             <div className="document-area">
//               {documents.map((doc) => (
//                 <div key={doc.id} className="doc-card">
//                   {doc.filename}
//                 </div>
//               ))}
//             </div>

//             <div className="messages">
//               {history.map((msg, index) => (
//                 <div key={index} className={`msg ${msg.role}`}>
//                   {msg.message}
//                 </div>
//               ))}
//             </div>

//             <div className="citation-wrap">
//               {citations.map((c, i) => (
//                 <div key={i} className="citation">
//                   {c.document}
//                   Page {c.page}
//                 </div>
//               ))}
//             </div>

//             <div className="input-wrap">
//               <input
//                 disabled={documents.length === 0}
//                 placeholder={
//                   documents.length === 0
//                     ? "Upload document first"
//                     : "Ask question"
//                 }
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//               />

//               <button onClick={askQuestion}>Send</button>
//             </div>
//           </>
//         )}
//       </div>

//       {showCreate && (
//         <div className="modal-bg">
//           <div className="modal">
//             <h3>Create Corpus</h3>

//             <input
//               value={newCorpus}
//               onChange={(e) => setNewCorpus(e.target.value)}
//             />

//             <div className="modal-btns">
//               <button onClick={createCorpus}>Create</button>

//               <button
//                 onClick={() => {
//                   setShowCreate(false);
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showDelete && (
//         <div className="modal-bg">
//           <div className="modal">
//             <h3>Delete Corpus?</h3>

//             <div className="modal-btns">
//               <button
//                 onClick={() => {
//                   deleteCorpus(showDelete);
//                 }}
//               >
//                 Delete
//               </button>

//               <button
//                 onClick={() => {
//                   setShowDelete(null);
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatUI;














// import "./ChatUI.css";
// import { useEffect, useState } from "react";
// import API from "../services/api";

// function ChatUI() {
//   const [corpus, setCorpus] = useState([]);
//   const [selectedCorpus, setSelectedCorpus] = useState(null);
// const [uploadError, setUploadError] = useState("");
//   const [documents, setDocuments] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [citations, setCitations] = useState([]);
// const [selectedDocument, setSelectedDocument] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [showCreate, setShowCreate] = useState(false);
//   const [showDelete, setShowDelete] = useState(null);
//   const [newCorpus, setNewCorpus] = useState("");

//   const [sessionId, setSessionId] = useState(null);
// const selectedCorpusObj = corpus.find(
//   (c) => c.id === selectedCorpus
// );
//   useEffect(() => {
//     fetchCorpus();
//   }, []);

//   // -------------------------
//   // FETCH CORPUS LIST
//   // -------------------------
//   const fetchCorpus = async () => {
//     try {
//       const res = await API.get("/auth/corpus");
//       setCorpus(res.data);
//     } catch (err) {
//       console.error("Corpus Fetch Error:", err);
//     }
//   };

//   // -------------------------
//   // LOAD SINGLE CORPUS
//   // -------------------------
//   const loadCorpus = async (id) => {
//     try {
//       setLoading(true);
//       setSelectedCorpus(id);

// const res = await API.get(`/auth/corpus/${id}`);

// setDocuments(res.data.documents || []);
// setHistory(res.data.chat_history || []);
// setCitations([]);

// setSessionId(
//   res.data.session_id || null
// );

// setSelectedDocument(null);
//     } catch (err) {
//       console.error("Load Corpus Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------------
//   // CREATE CORPUS
//   // -------------------------
//   const createCorpus = async () => {
//     if (!newCorpus.trim()) return;

//     try {
//       const res = await API.post("/auth/corpus", {
//         name: newCorpus,
//       });

//       setCorpus((prev) => [...prev, res.data]);
//       setShowCreate(false);
//       setNewCorpus("");

//       loadCorpus(res.data.id);
//     } catch (err) {
//       console.error("Create Corpus Error:", err);
//     }
//   };

//   // -------------------------
//   // DELETE CORPUS
//   // -------------------------
//   const deleteCorpus = async (id) => {
//     try {
//       const res = await API.delete(`/auth/corpus/${id}`);

//       const deletedId = res.data.id;

//       setCorpus((prev) => prev.filter((c) => c.id !== deletedId));

//       if (selectedCorpus === deletedId) {
//         setSelectedCorpus(null);
//         setDocuments([]);
//         setHistory([]);
//         setCitations([]);
//         setSessionId(null);
//       }

//       setShowDelete(null);
//     } catch (err) {
//       console.error("Delete Corpus Error:", err);
//     }
//   };

//   // -------------------------
//   // UPLOAD FILE
//   // -------------------------
// const upload = async (e, corpusId) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   try {
//     const form = new FormData();
//     form.append("file", file);

//     await API.post(`/auth/corpus/${corpusId}/upload`, form, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     if (selectedCorpus === corpusId) {
//       loadCorpus(corpusId);
//     }
//   } catch (err) {
//     console.error("Upload Error:", err);

//     const message =
//       err.response?.data?.detail ||
//       "Failed to upload document";

//     setUploadError(message);
//   }

//   // Reset file input so same file can be selected again
//   e.target.value = "";
// };

//   // -------------------------
//   // ASK QUESTION (RAG API)
//   // -------------------------
//  const askQuestion = async () => {
//   if (!selectedCorpus || !question.trim()) return;

//   const userQuestion = question;

//   setQuestion("");

//   // show user message immediately
//   setHistory((prev) => [
//     ...prev,
//     {
//       role: "user",
//       message: userQuestion,
//     },
//   ]);

//   try {
//   const res = await API.post(
//   "/auth/query",
//   {
//     corpus_id: selectedCorpus,
//     question: userQuestion,
//     session_id: sessionId,
//     document_name: selectedDocument,
//   }
// );

//     // save assistant answer + citations together
//     setHistory((prev) => [
//       ...prev,
//       {
//         role: "assistant",
//         message: res.data.answer,
//         citations: res.data.citations || [],
//       },
//     ]);

//     setSessionId(
//       res.data.session_id || null
//     );
//   } catch (err) {
//     console.error("Query Error:", err);

//     setHistory((prev) => [
//       ...prev,
//       {
//         role: "assistant",
//         message:
//           "Error: Failed to fetch response",
//       },
//     ]);
//   }
// };
//   // -------------------------
//   // UI
//   // -------------------------
//   return (
//     <div className="layout">

//       {/* SIDEBAR */}
//       <div className="sidebar">
//         <div className="logo">CorpusIQ</div>

//         <button className="create-btn" onClick={() => setShowCreate(true)}>
//           + New Corpus
//         </button>

//         <div className="sidebar-list">
//           {corpus.map((item) => (
//             <div
//               key={item.id}
//               className={`corpus-card ${
//                 selectedCorpus === item.id ? "active" : ""
//               }`}
//             >
//               <div
//                 className="corpus-main"
//                 onClick={() => loadCorpus(item.id)}
//               >
//                 {item.name}
//               </div>

//               <div className="corpus-actions">
//                 <label className="small-upload">
//                   +
//                   <input
//                     type="file"
//                     hidden
//                     onChange={(e) => upload(e, item.id)}
//                   />
//                 </label>

//                 <button onClick={() => setShowDelete(item.id)}>✕</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* MAIN CHAT */}
//       <div className="chat-container">

//     <div className="topbar">
//   {selectedCorpusObj
//     ? `Corpus: ${selectedCorpusObj.name}`
//     : "Select Corpus"}
// </div>

//         {!selectedCorpus ? (
//           <div className="center">Choose corpus from sidebar</div>
//         ) : loading ? (
//           <div className="center">Loading...</div>
//         ) : (
//           <>
//             {/* DOCUMENTS */}
//             {selectedDocument && (
//   <div className="selected-doc">
//     Searching only:
//     <strong> {selectedDocument}</strong>

//     <button
//       onClick={() => setSelectedDocument(null)}
//       className="clear-doc-btn"
//     >
//       ✕
//     </button>
//   </div>
// )}

//            <div className="document-area">
//   {documents.map((doc) => (
//     <div
//       key={doc.id}
//       className={`doc-card ${
//         selectedDocument === doc.filename
//           ? "active-doc"
//           : ""
//       }`}
//       onClick={() =>
//         setSelectedDocument(
//           selectedDocument === doc.filename
//             ? null
//             : doc.filename
//         )
//       }
//     >
//       📄 {doc.filename}
//     </div>
//   ))}
// </div>
// {/* DOCUMENTS */}


//             {/* CHAT HISTORY */}

// <div className="messages">
//   {history.map((msg, i) => (
//     <div
//       key={i}
//       className={`msg ${msg.role}`}
//     >
//       <div>{msg.message}</div>

//       {msg.role === "assistant" &&
//         msg.citations?.length > 0 && (
//           <div className="message-citations">

//             {msg.citations.map((c, idx) => (
//               <div
//                 key={idx}
//                 className="citation-card"
//               >
//                 <strong>
//                   📄 {c.filename}
//                 </strong>

//                 <div>
//                   Page {c.page}
//                 </div>

//                 {c.snippet && (
//                   <div className="citation-snippet">
//                     {c.snippet}
//                   </div>
//                 )}
//               </div>
//             ))}

//           </div>
//         )}
//     </div>
//   ))}
// </div>
//             {/* CITATIONS */}


//             {/* INPUT */}
//             <div className="input-wrap">
//               <input
//                 disabled={documents.length === 0}
//                 placeholder={
//                   documents.length === 0
//                     ? "Upload document first"
//                     : "Ask question"
//                 }
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && askQuestion()}
//               />

//               <button onClick={askQuestion}>Send</button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* CREATE MODAL */}
//       {showCreate && (
//         <div className="modal-bg">
//           <div className="modal">
//             <h3>Create Corpus</h3>

//             <input
//               value={newCorpus}
//               onChange={(e) => setNewCorpus(e.target.value)}
//             />

//             <div className="modal-btns">
//               <button onClick={createCorpus}>Create</button>
//               <button onClick={() => setShowCreate(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* DELETE MODAL */}
//       {showDelete && (
//         <div className="modal-bg">
//           <div className="modal">
//             <h3>Delete Corpus?</h3>

//             <div className="modal-btns">
//               <button onClick={() => deleteCorpus(showDelete)}>
//                 Delete
//               </button>
//               <button onClick={() => setShowDelete(null)}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}



//       {uploadError && (
//   <div className="modal-bg">
//     <div className="modal">
//       <h3>Upload Error</h3>

//       <p>{uploadError}</p>

//       <div className="modal-btns">
//         <button onClick={() => setUploadError("")}>
//           OK
//         </button>
//       </div>
//     </div>
//   </div>
// )}
//     </div>
//   );
// }

// export default ChatUI;


















import "./ChatUI.css";
import { useEffect, useState } from "react";
import API from "../services/api";

function ChatUI() {
  const [corpus, setCorpus] = useState([]);
  const [selectedCorpus, setSelectedCorpus] = useState(null);

  const [uploadError, setUploadError] = useState("");

  const [documents, setDocuments] = useState([]);
  const [history, setHistory] = useState([]);

  const [citations, setCitations] = useState([]);

  const [selectedDocument, setSelectedDocument] = useState(null);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(null);
  const [newCorpus, setNewCorpus] = useState("");

  const [sessionId, setSessionId] = useState(null);

  const selectedCorpusObj = corpus.find((c) => c.id === selectedCorpus);

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
console.log("response uload is : ", res)
      if (selectedCorpus === corpusId) {
        loadCorpus(corpusId);
      }
    } catch (err) {
      console.error("Upload Error:", err);

      const message =
        err.response?.data?.detail || "Failed to upload document";

      setUploadError(message);
    }

    e.target.value = "";
  };

  // -------------------------
  // ASK QUESTION (FIXED)
  // -------------------------
const askQuestion = async () => {
  if (!selectedCorpus || !question.trim()) return;

  const userQuestion = question;
  setQuestion("");

  setHistory((prev) => [
    ...prev,
    {
      role: "user",
      message: userQuestion,
    },
  ]);

  try {
    console.log("🚀 QUERY REQUEST:", {
      user_id: "usr_001",
      corpus_id: selectedCorpus,
      session_id: sessionId,
      query: userQuestion,
    });

    const res = await API.post("/auth/chat", {
    
      corpus_id: String(selectedCorpus),
      query: userQuestion,
    });

    console.log("✅ RESPONSE:", res.data);

    setHistory((prev) => [
      ...prev,
      {
        role: "assistant",
        message: res.data.answer,
        citations: res.data.citations || [],
      },
    ]);

  } catch (err) {
    console.error("❌ Query Error:", err);
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);

    setHistory((prev) => [
      ...prev,
      {
        role: "assistant",
        message: "Error: Failed to fetch response",
      },
    ]);
  }
};
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
              <div
                className="corpus-main"
                onClick={() => loadCorpus(item.id)}
              >
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
          <div className="center">Choose corpus from sidebar</div>
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
                      selectedDocument === doc.filename ? null : doc.filename
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

                  {msg.role === "assistant" &&
                    msg.citations?.length > 0 && (
                      <div className="message-citations">
                        {msg.citations.map((c, idx) => (
                          <div key={idx} className="citation-card">
                            <strong>📄 {c.filename}</strong>
                            <div>Page {c.page}</div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>

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
              <button onClick={() => deleteCorpus(showDelete)}>
                Delete
              </button>
              <button onClick={() => setShowDelete(null)}>
                Cancel
              </button>
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