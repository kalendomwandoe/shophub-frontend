import { useState } from "react";
import type React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useRegisterMutation, useLoginMutation } from "../api/authApi";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setCredentials } from "../store/authSlice";
import styles from "./Register.module.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"CUSTOMER" | "OWNER">("CUSTOMER");

  const [register, { isLoading: isRegistering, error: registerError }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await register({ name, email, password, role }).unwrap();

      const loginResult = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user: loginResult.user, token: loginResult.token }));

      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const isLoading = isRegistering || isLoggingIn;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.heading}>Create your account</h1>

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />

        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles.toggleBtn}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className={styles.roleGroup}>
          <label className={styles.roleOption}>
            <input
              type="radio"
              name="role"
              value="CUSTOMER"
              checked={role === "CUSTOMER"}
              onChange={() => setRole("CUSTOMER")}
            />
            I'm a Customer
          </label>

          <label className={styles.roleOption}>
            <input
              type="radio"
              name="role"
              value="OWNER"
              checked={role === "OWNER"}
              onChange={() => setRole("OWNER")}
            />
            I'm a Boutique Owner
          </label>
        </div>

        {registerError && <p className={styles.error}>Registration failed. Try a different email.</p>}

        <button type="submit" className={styles.submitBtn} disabled={isLoading}>
          {isLoading ? "Creating account..." : "Register"}
        </button>

        <p className={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;