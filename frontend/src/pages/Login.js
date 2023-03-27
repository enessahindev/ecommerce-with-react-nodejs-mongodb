import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginComponents() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async (e) => {
    e.preventDefault();
    try {
      let model = { email: email, password: password };
      let response = await axios.post("http://localhost:5000/auth/login", model);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "50px" }}
      >
        <div className="login-card">
          <img
            src="https://raw.githubusercontent.com/enessahindev/javascript-es6-signup/945e7d0e16327e15bd60676f2d7e358a44a8a7ee/assets/images/login.svg"
            alt=""
          />
          <h2>Log/ in</h2>
          <h3>Please enter your details.</h3>
          <form onSubmit={login}>
            <div className="form-group">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Mail Adress"
                type="email"
                id="email"
                name="email"
                className="form-control"
                required
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                className="form-control mt-2"
                required
              />
              <button
                onClick={login}
                className="btn btn-primary w-100 mt-2"
                type="button"
              >
                Login
              </button>
            </div>
          </form>
          <Link to="/register" className="mt-2" style={{ float: "right" }}>
            Register
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginComponents;
