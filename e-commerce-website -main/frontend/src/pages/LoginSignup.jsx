import React,{useState, useEffect} from "react";
import {toast} from "react-toastify";
import { useLocation } from 'react-router-dom';
import './CSS/LoginSignup.css'

const LoginSignup = () => {

    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
    });
    const location = useLocation();
    const [role, setRole] = useState("client");
     useEffect(() => {
     const urlRole = new URLSearchParams(location.search).get("role");
     setRole(urlRole === "admin" ? "admin" : "client");
     console.log("🧭 URL Role updated to:", urlRole);
    }, [location.search]);

    const [signupErrors, setSignupErrors] = useState([]);    
    const backend_url = process.env.REACT_APP_API_URL;
    const login = async () =>{
        const response = await fetch(`${backend_url}/api/users/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        });
        const json = await response.json();
        if(response.ok){
            localStorage.setItem("token", json.token);
            toast.success("You're logged in.");
            window.location.replace("/");
        }
        else{
            toast.error(json.error);
        }
    }

    const signup = async () => {
  const response = await fetch(`${backend_url}/api/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(role === 'admin' && { 'x-admin-register': 'true' }), // ✅ Add the header conditionally
    },
    body: JSON.stringify({ ...formData, role }), // ✅ Send role in body
  });

  const json = await response.json();
  console.log("Signup JSON response:", json);

  if (response.ok) {
    localStorage.setItem('token', json.token);
    toast.success("Account created.");

    // Redirect based on role
    if (role === 'admin') {
      window.location.replace('/admin/dashboard');
    } else {
      window.location.replace('/');
    }
  } else {
    if (Array.isArray(json.errors)) {
      setSignupErrors(json.errors);
    } else {
      setSignupErrors([]);
      toast.error(json.message || "Signup failed.");
    }
  }
};



    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    
    useEffect(() => {
  console.log("📦 Form Data:", formData);
  console.log("🔍 Role:", role);
}, [formData, role]);
 

    return (
  <div className="loginsignup-container">
    <h1>{state}</h1>

    <div className="loginsignup-fields">
      {state === 'Sign Up' && (
        <input
          name="name"
          value={formData.name}
          onChange={changeHandler}
          type="text"
          placeholder="Your Name"
        />
      )}
      <input
        name="email"
        value={formData.email}
        onChange={changeHandler}
        type="email"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={formData.password}
        onChange={changeHandler}
        type="password"
        placeholder="Password"
      />
    </div>

    {/* ✅ PUT IT HERE — inside return */}
    {signupErrors.length > 0 && state === 'Sign Up' && (
      <div className="loginsignup-errors">
        {signupErrors.map((err, index) => (
          <div key={index} className="error-line">• {err}</div>
        ))}
      </div>
    )}

    <button onClick={() => { state === 'Login' ? login() : signup() }}>
      {state}
    </button>

    {state === 'Sign Up' ? (
      <p className="loginsignup-login">
        Already have an account?{" "}
        <span onClick={() => { setState("Login"); setSignupErrors([]); }}>Login</span>
      </p>
    ) : (
      <p className="loginsignup-login">
        Create an account?{" "}
        <span onClick={() => { setState("Sign Up"); setSignupErrors([]); }}>Click Here</span>
      </p>
    )}
  </div>
  
);

}
 
export default LoginSignup;