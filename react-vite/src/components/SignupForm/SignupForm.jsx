import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import './SignupForm.css'

function SignupForm() {
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
    setErrors({});
    const errors = {};

    if (email) {
      const emailFormat = email.split('@');
      if (!email.includes('@') ||
        email.length < 3 ||
        !emailFormat[0] ||
        !emailFormat[1]
      ) {
        errors.email = 'Please provide a valid email.'
      }
    }

    if (username) {
      if (username.length < 4) {
        errors.username = 'Username must be at least 4 characters.'
      } else if (username.includes('@')) {
        errors.username = 'Username must not be an email.'
      }
    }

    if (password) {
      if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters.'
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.'
      }
    }

    if (Object.values(errors).length) {
      return setErrors(errors);
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
      <div className="signupErrors">
        {errors.server && <p className="error">{errors.server}</p>}
        {errors.email && <p className="error">{errors.email}</p>}
        {errors.username && <p className="error">{errors.username}</p>}
        {errors.password && <p className="error">{errors.password}</p>}
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
      </div>

      <form onSubmit={handleSubmit} className="signupForm">
        <table>
          <tr>
            <td className="cellRight">
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

          <tr>
            <td className="cellRight">
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

          <tr>
            <td className="cellRight">
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

          <tr>
            <td className="cellRight">
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
        </table>

        {/* <div className="signupErrors">
          {errors.email && <p className="error">{errors.email}</p>}
          {errors.username && <p className="error">{errors.username}</p>}
          {errors.password && <p className="error">{errors.password}</p>}
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div> */}

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

export default SignupForm;
