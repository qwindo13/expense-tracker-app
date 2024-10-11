import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import FormInput from "../../components/ui/FormInput/FormInput";
import Button from "../../components/ui/Button/Button";
import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "miew" && password === "123456") {
      login();
      return <Navigate to="/" />;
    } else {
      alert("Login failed. Please check your username and password.");
    }
  };


  return (
    <section className={styles.loginContainer}>
      <div className={styles.loginLeft} style={{
        background: 'url(/images/login-bg.jpg) no-repeat center center',
        backgroundSize: 'cover'
      }}>
        <a href="/"><img src="/images/logo-white.svg" alt="logo" height={48} width={48} /></a>
        <h1>Take Charge of Your Finances with Ease.</h1>
      </div>
      <div className={styles.loginRight}>
        <div className={styles.loginFormContainer}>
          <img src="/images/logo.svg" alt="logo" height={48} width={48} />
          <h1>Welcome Back!</h1>
          <p>Please enter your details to continue</p>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <FormInput
              type="text"
              label="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FormInput
              type="password"
              label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Log In</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
