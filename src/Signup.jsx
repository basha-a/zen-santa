import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();  // ← initialize navigation

  const handleSignup = async (e) => {
    e.preventDefault();


    // Validate email domain
    if (!email.endsWith("@zentegra.com")) {
      setError("Use your @zentegra.com email to Signup.");
      return;
    }



    // try {
    //   await createUserWithEmailAndPassword(auth, email, password);
    //    navigate("/");

    // } catch (err) {
    //   setError(err.message);
    // }

   try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send verification email
    await sendEmailVerification(user);

    setError("Verification email sent! Please check your inbox.");

    // Optionally redirect to login

    setTimeout(() => {
      navigate("/login");
    }, 8000);

    

  } catch (err) {
    const cleanedMessage = err.message.replace("Firebase: ", "");
    setError(cleanedMessage);
    // setError(err.message);
  }
  };

const alredyHaveAccount = (e) => {
    navigate("/login");
  }

  return (
    <>

      <section className="vh-90">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img
          src="https://blogger.googleusercontent.com/img/a/AVvXsEg13y2Os52YJ5bDwd9Ape_TT6aeEKvJnT95UM8N3Qe5uM2q6YWJFGgCfsuBzvkklvaR728Zr7UIc3Xqy25NQMzn4Qe2WYxI9zx3flHWp-YXajIlCqHrCkAduoPc5EpbXFA6ZLIVNKtSZ2ojXpq2BTI9q74xpjVNKMwjvn1iW6lFJZamWIsLfTOpHutMc48"
          className="img-fluid rounded-4"
          alt="Phone"
         
        />
      </div>

      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <h2 className="text-center mb-4">Sign up</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSignup}>
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



          {/* Submit button */}
          <button type="submit" className="btn btn-dark btn-block w-100">
            Register
          </button>

          <div className="text-center my-3">
            <p className="text-center fw-bold mx-3 mb-3 text-muted">OR</p>
            <button onClick={alredyHaveAccount} className="btn text-dark">Already have an account</button>
          </div>

          

        </form>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
