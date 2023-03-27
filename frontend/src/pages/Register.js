import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterComponents() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    let model = { email: email, name: name, password: password };
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register", model);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "50px" }}
      >
        <div className="register-card">
          <img
            src="https://raw.githubusercontent.com/enessahindev/javascript-es6-signup/945e7d0e16327e15bd60676f2d7e358a44a8a7ee/assets/images/login.svg"
            alt=""
          />
          <h2>Register Page</h2>
          <h3>Please enter your details.</h3>
          <form onSubmit={register}>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
                type="text"
                id="name"
                name="name"
                className="form-control mt-2"
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
                onClick={register}
                className="btn btn-success w-100 mt-2"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </form>
          <Link to="/login" className="mt-2" style={{ float: "left" }}>
            Go to Login Page
          </Link>
        </div>
      </div>
    </>
  );
}

export default RegisterComponents;
