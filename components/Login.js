"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });

        console.log(res);
        
        if (res.ok) {
            document.cookie = "auth-token=sample_token; path=/";
            window.location.href = "/dashboard";
        } else {
            setError("User invalid.");
        }
      } 
    catch (error) {
        console.log(error);
    }
  };

  const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{backgroundColor: '#394b81'}}>
      <div className="bg-white p-8 rounded-lg shadow-md w-[30%]">
        <div className="flex justify-center">
          <h2 className="text-4xl font-bold mb-8" style={{color: '#394b81'}}>LOGIN</h2>  
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
            <div className="flex px-4 py-3 gap-2 items-center bg-white rounded-lg">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full outline-none border-none bg-transparent p-0"
                    autoComplete="off"
                    required
                />
            </div>
            <div className="flex px-4 py-3 gap-2 items-center bg-white rounded-lg">
                <input
                    type="password"
                    placeholder="Kata Sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full outline-none border-none bg-transparent p-0"
                    autoComplete="off"
                    required
                />
            </div>
          <button
            type="submit"
            className="bg-blue-900 text-white py-3 rounded-lg w-full mt-4 shadow-md hover:bg-blue-800"
          >
            <a href="/dashboard">Login</a> 
          </button>
        </form>
      </div>
    </div>
  );
}
