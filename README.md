# Domain Knowledge Co-Pilot Frontend

## Overview

Domain Knowledge Co-Pilot is a Retrieval-Augmented Generation (RAG) application that allows users to create domain-specific knowledge repositories from PDF documents and interact with them using natural language queries.

The frontend provides an intuitive interface for:

- User Authentication
- Corpus Management
- PDF Upload
- Conversational Chat Interface
- Citation Display
- Knowledge Retrieval Visualization

The application communicates with a FastAPI backend that performs document processing, vector search, BM25 retrieval, reranking, and answer generation.

---

# Features

## Authentication

- User Registration
- User Login
- JWT Token Based Authentication

## Corpus Management

- Create New Corpus
- View Existing Corpora
- Delete Corpus
- Load Corpus Details

## Document Management

- Upload PDF Documents
- View Uploaded Documents
- Document Isolation Per Corpus

## Conversational RAG

- Ask Questions Against Uploaded Documents
- Follow-up Questions
- Session-based Chat History
- Citation-based Responses

## Explainability

- Source Citations
- Retrieved Chunk Preview
- Page Number References

---

# Technology Stack

## Frontend

- React.js
- JavaScript
- Axios
- CSS3

## Backend Integration

- FastAPI
- JWT Authentication
- REST APIs

---

# Project Structure

```text
src/

├── components/
│   ├── Login.js
│   ├── Login.css
│   ├── Register.js
│   ├── Register.css
│   ├── ChatUI.js
│   └── ChatUI.css
│
├── services/
│   └── api.js
│
├── utils/
│   └── logger.js
│
├── App.js
├── App.css
├── index.js
└── index.css
```

---

# Application Flow

## User Authentication

1. Register account
2. Login
3. Receive JWT token
4. Token stored in Local Storage
5. Protected API access enabled

## Knowledge Base Creation

1. Create Corpus
2. Upload PDF Documents
3. Backend performs:
   - Text Extraction
   - Semantic Chunking
   - Embedding Generation
   - Vector Storage

## Question Answering

1. User selects Corpus
2. User enters question
3. Backend executes RAG Pipeline
4. Response returned with citations
5. Chat history updated

---

# API Integration

The frontend communicates with the backend using Axios.

Base URL:

```javascript
http://localhost:8000
```

Authentication token is automatically attached using Axios Interceptors.

---

# Available Screens

## Login Page

- Username
- Password
- Login Button

## Registration Page

- Username
- Password
- Register Button

## Chat Interface

- Corpus Selection
- PDF Upload
- Chat Window
- Message History
- Citation Viewer

---

# Environment Setup

## Prerequisites

- Node.js 18+
- npm

---

# Installation

Clone Repository

```bash
git clone <repository-url>
```

Move to project directory

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

---

# Running Locally

Start development server

```bash
npm start
```

Application will run at:

```text
http://localhost:3000
```

Backend should be running at:

```text
http://localhost:8000
```

---

# Build For Production

```bash
npm run build
```

Production build will be generated inside:

```text
build/
```

---

# Future Enhancements

- Dark Mode
- Multi-File Upload
- Streaming Responses
- Voice Queries
- Export Chat
- Mobile Responsive Design
- Role-Based Access Control

---

# Author

Radhika Malani

Software Engineer | Generative AI Developer

Built as part of the Domain Knowledge Co-Pilot Capstone Project.