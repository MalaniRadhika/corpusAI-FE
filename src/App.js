import { useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import ChatUI from "./components/ChatUI";

function App() {
  const [screen, setScreen] = useState("login");

  const [user, setUser] = useState(null);

  return (
    <>
      {screen === "login" && <Login setScreen={setScreen} setUser={setUser} />}

      {screen === "register" && <Register setScreen={setScreen} />}

      {screen === "chat" && <ChatUI user={user} />}
    </>
  );
}

export default App;
