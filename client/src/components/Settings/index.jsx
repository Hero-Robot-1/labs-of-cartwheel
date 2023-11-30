import { createRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../index";

export default function SettingSection({ setIsLoggedIn, isLoggedIn }) {
  const [user, setUser] = useState({ id: "", email: "" });
  const idInputRef = createRef();
  const emailInputRef = createRef();
  const navigate = useNavigate();

  async function fetchAuthUser() {
    try {
      const response = await fetch(`${serverUrl()}/user`);
      const userData = await response.json();
      setUser(userData);
      console.log("user: ", userData);
    } catch (error) {
      console.error("Fetch user error:", error);
    }
  }

  // useEffect(() => {
  //   if (user.id && user.email) {
  //     handleLogin(); // Auto-click the login button if id and email exist
  //   }
  // }, [user.id, user.email]);

  async function handleLogin() {
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
        await setIsLoggedIn(true); // Set login status to true
        console.log("user logged in", user );
        await navigate(window.location.pathname); // Redirecting to the same page

       

      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  useEffect(() => {
    fetchAuthUser();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        background: "#E8B64A",
        padding: 10,
        alignItems: "center",

        /* Rectangle 10 */

      }}
    >
      <div>
        <p style={{ margin: 0 }}>
          Get your Personal Memebership Card
        </p>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          placeholder="email"
          defaultValue={user?.email}
          ref={emailInputRef}
          style={{ color: "black" }} // Set text color
        />
        <input
          placeholder="user id"
          defaultValue={user?.id}
          ref={idInputRef}
          style={{ color: "black" }} // Set text color
        />
        <button onClick={handleLogin}>login</button>
      </div>
    </div>
  );
}
