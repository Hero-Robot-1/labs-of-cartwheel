import { createRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../index";
import axios from "axios";


export default function SettingSection({ setIsLoggedIn ,isLoggedIn  }) {
  const [user, setUser] = useState({ id: "", email: "" });
  const idInputRef = createRef();
  const emailInputRef = createRef();
  const navigate = useNavigate();
  const [timestamp, setTimestamp] = useState(new Date().toISOString());
  const [userid, setUserid] = useState('');
  const[email, setEmail] = useState('');


  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios.get(`${serverUrl()}/userEmails`).then((response) => {
      console.log("here response: ", response);
      setAPIData(response.data.userEmails);
    });
  }, []);
  
  console.log("fetching the user emails : ",APIData );
  const userId = APIData.length; 

  console.log("current user id : ", userId);

  async function fetchAuthUser() {
    try {
      const response = await fetch(`${serverUrl()}/user`);
      const userData = await response.json();
      setUser(userData);
      console.log("current user: ", userData);
    } catch (error) {
      console.error("Fetch user error:", error);
    }
  }

  async function handleLogin() {
    const enteredEmail = emailInputRef.current.value;

  // Regular expression to check if the entered email looks like an email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(enteredEmail)) {
    // If the entered email doesn't match the pattern, display a message to the user
    alert('Please enter a valid email address.');
    return; // Stop further execution of the login process
  }
    try {
      const response = await fetch(`${serverUrl()}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idInputRef.current.value,
          email: emailInputRef.current.value,
        }),
      });

      if (response.ok) {
        setUser({
          id: idInputRef.current.value,
          email: emailInputRef.current.value,
        });
        setIsLoggedIn(true); // Set login status to true
        console.log("user just logged in", user);

        // Store a flag in localStorage indicating successful login
        localStorage.setItem('loggedIn', 'true');
        
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  useEffect(() => {
    const isNewUser = !localStorage.getItem('loggedIn');

    if (isNewUser && user.id && user.email) {
      handleLogin();
    } else {
      fetchAuthUser();
    }
  }, [user.id, user.email]);

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 10,
      background: "#E8B64A",
      padding: 10,
      alignItems: "center",
    }}
  >
    <div>
      <p style={{ margin: 5 ,color: "#0E4B8A", fontSize: "large"}}>Get your Membership Card</p>
    </div>
    <div style={{ marginBottom: 10 }}>
      <input
        placeholder="email"
        defaultValue={user?.email}
        ref={emailInputRef}
        style={{ color: "black", marginBottom: 10, width: "300px" }}
      />
      <input
        placeholder="user password"
        defaultValue={user?.id}
        ref={idInputRef}
        type="password"
        style={{ color: "black", marginBottom: 10, width: "300px" }}
      />
    </div>
    <button
      onClick={handleLogin}
      style={{
        background: "#0E4B8A",
        color: "#fff",
        border: "2px solid #0E4B8A",
        borderRadius: "10px",
        padding: "10px 20px",
        cursor: "pointer",
      }}
    >
      Lets Go
    </button>
  </div>
  );
}
