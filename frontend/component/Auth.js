import React, { useState } from 'react';
import { auth, googleProvide } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // New state to control sign-up/login toggle
  console.log(auth?.currentUser?.email)

  const signIn = async () => {
    try {
      if (isSignUp) {
        // If sign-up mode, create a new user
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // If login mode, sign in with existing credentials
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvide);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const toggleMode = () => {
    // Toggle between sign-up and login modes
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="gradient-custom" style={{backgroundColor:"#000000f5"}}>
      <div className="blur-overlay"></div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-4">
              <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-3 text-center">
                  <div className="mb-2 pb-3">
                    <h3 className="fw-bold mb-2 text-uppercase">
                      {isSignUp ? "Sign Up" : "Login"}
                    </h3>
                    <p className="text-white-50 mb-3">
                      Please {isSignUp ? "create an account" : "enter your login and password"}!
                    </p>

                    <div className="form-outline form-white mb-3">
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-outline form-white mb-3">
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div style={{ paddingBottom: "10px" }}>
                      <button className="btn btn-outline-light btn-lg px-4" onClick={signIn}>
                        {isSignUp ? "Sign Up" : "Login"}
                      </button>
                    </div>

                    <div>
                      <button className="btn btn-outline-light btn-lg px-4" onClick={signInGoogle}>
                        {/* Sign in with Google */}
                        {isSignUp ? "Sign up with Google" : "Sign in with Google"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="mb-0">
                      {isSignUp ? "Already have an account?" : "Don't have an account?"}
                      <a href="#!" className="text-white-50 fw-bold" onClick={toggleMode}>
                        {isSignUp ? "Login" : "Sign Up"}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
