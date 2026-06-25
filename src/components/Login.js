// import "./Login.css";

// import { useState } from "react";

// import API from "../services/api";

// function Login({
//   setScreen,

//   setUser,
// }) {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const login = async () => {
//     try {
//       setLoading(true);

//     //   const res = await API.post("/auth/login", form);

//     //   localStorage.setItem("token", res.data.access_token);

//     //   setUser(res.data);

//       setScreen("chat");
//     } catch {
//       alert("Login Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <h1>CorpusIQ</h1>

//         <input
//           placeholder="Email"
//           onChange={(e) =>
//             setForm({
//               ...form,

//               email: e.target.value,
//             })
//           }
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) =>
//             setForm({
//               ...form,

//               password: e.target.value,
//             })
//           }
//         />

//         <button onClick={login} disabled={loading}>
//           {loading ? "Loading..." : "Login"}
//         </button>

//         <p onClick={() => setScreen("register")}>Create Account</p>
//       </div>
//     </div>
//   );
// }

// export default Login;
import "./Login.css";
import { useState } from "react";
import API from "../services/api";

function Login({ setScreen, setUser }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const login = async () => {
  try {
    setLoading(true);

    const res = await API.post("/auth/login", form);

    // فقط token store karna hai
    localStorage.setItem("token", res.data.access_token);

    setUser(res.data.user);
    setScreen("chat");

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="auth-title">CorpusIQ</h1>
        <p className="auth-sub">Knowledge Assistant</p>

        <input
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="primary-btn" onClick={login}>
          {loading ? "Signing In..." : "Login"}
        </button>

        <p
          className="secondary-link"
          onClick={() => setScreen("register")}
        >
          Create Account
        </p>

      </div>
    </div>
  );
}

export default Login;