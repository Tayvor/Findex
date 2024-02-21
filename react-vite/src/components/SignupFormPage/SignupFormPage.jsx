import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import './SignupForm.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="signupPage">
      <h1>Sign Up</h1>
      {errors.server && <p className="error">{errors.server}</p>}

      <form onSubmit={handleSubmit} className="signupForm">
        <table>
          <tr>
            <td>
              Email:
            </td>
            <td>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </td>
          </tr>
          {errors.email && <p className="error">{errors.email}</p>}

          <tr>
            <td>
              Username:
            </td>
            <td>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </td>
          </tr>
          {errors.username && <p className="error">{errors.username}</p>}

          <tr>
            <td>
              Password:
            </td>
            <td>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </td>
          </tr>
          {errors.password && <tr className="error">{errors.password}</tr>}

          <tr>
            <td>
              Confirm Password:
            </td>
            <td>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </td>
          </tr>
          {errors.confirmPassword && <tr className="error">{errors.confirmPassword}</tr>}

        </table>

        <div className="signupForm-BtnDiv">
          <button
            type="submit"
            className={email && username && password && confirmPassword ?
              "signupForm-SubmitBtn gGlow clickable"
              :
              "signupForm-SubmitBtn"
            }
            disabled={email && username && password && confirmPassword ?
              false : true
            }
          >Sign Up!</button>
        </div>
      </form>
    </div >
  );
}

export default SignupFormPage;
