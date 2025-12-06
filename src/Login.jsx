import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();  // ← initialize navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    //   alert("Logged in!");
    navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const alredyHaveAccount = (e) => {
    navigate("/signup");
  }

  return (
    <>
      {/* <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email"
               onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
               onChange={(e) => setPassword(e.target.value)} /> <br />
        <button className="btn btn-primary" type="submit">Login</button>
      </form> */}

    

    <section className="vh-90">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        
        <img
          src="https://blogger.googleusercontent.com/img/a/AVvXsEgsDypQwdJd9njDRJykMJEoUFgoOh9yNi7c5WdYt3K0mzOh4avdVuAjwBM0XeRgD4V_jYJARseD4bZQYM00CAPeviH54FWAlLFyTCHk4Difn85VgoO4SETde44BslLHGLUCK3tCJJWnREL51mFuePdss3TmZVLlREXkaj-GoBIaqJRpQW_UsZlEUxfoDP0"
          className="img-fluid rounded-4"
          alt="Phone"
          
        />
      </div>

      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <h2 className="text-center mb-4">Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          {/* Email input */}
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form1Example13"
              className="form-control form-control-lg"
              onChange={(e) => setEmail(e.target.value)} 
            />
            <label className="form-label" htmlFor="form1Example13">
              Email address
            </label>
          </div>

          {/* Password input */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="form1Example23"
              className="form-control form-control-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="form1Example23">
              Password
            </label>
          </div>

          <div className="d-flex justify-content-around align-items-center mb-4">
            {/* Checkbox */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="form1Example3"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="form1Example3">
                Remember me
              </label>
            </div>
            <a href="#!">Forgot password?</a>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary btn-block w-100">
            Login
          </button>

          <div className="text-center my-3">
            <p className="text-center fw-bold mx-3 mb-3 text-muted">OR</p>
            <button onClick={alredyHaveAccount} className="btn text-primary">Create new account</button>
          </div>

          

        </form>
      </div>
    </div>
  </div>
</section>


    </>
  );
}
