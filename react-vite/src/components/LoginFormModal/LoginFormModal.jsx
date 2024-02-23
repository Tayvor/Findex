import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="loginForm-Wrapper">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {errors.email && <p className="loginError error">{errors.email}</p>}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        {errors.password && <p className="loginError error">{errors.password}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button
          type="submit"
          className={email && password ? "loginForm-LoginBtn clickable gGlow"
            :
            "loginForm-LoginBtn"
          }
          disabled={email && password ? false : true}
        >Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
