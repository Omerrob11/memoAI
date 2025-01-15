"use client";
import { useState } from "react";
import { supabase } from "@/servcies/supabase";

export default function AuthTestPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // for showing success/error messages

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      setMessage("Check your email for the confirmation link!");
      console.log("Sign up successful:", data);
    } catch (error) {
      setMessage(error.message);
      console.error("Error signing up:", error.message);
    }
  };

  const handleTestEndpoint = async (e) => {
    e.preventDefault(); // Add this

    const { data: sessionData } = await supabase.auth.getSession();
    console.log("Current session:", sessionData);

    try {
      const response = await fetch("/api/test-summary");
      const data = await response.json();
      console.log("Response:", data);
      setMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      setMessage("Logged in successfully!");
      console.log("Login successful:", data);
    } catch (error) {
      setMessage(error.message);
      console.error("Error logging in:", error.message);
    }
  };
  const messageElement = message && (
    <div className="mt-4 p-2 text-center rounded bg-gray-100">{message}</div>
  );
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Auth Test Page</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="test@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="********"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSignUp}
              type="button"
              className="w-1/2 bg-blue-500 text-black rounded-md px-4 py-2 hover:bg-blue-600"
            >
              Sign Up
            </button>
            <button
              onClick={handleLogin}
              type="button"
              className="w-1/2 bg-green-500 text-black rounded-md px-4 py-2 hover:bg-green-600"
            >
              Login
            </button>
          </div>
          <button
            onClick={handleTestEndpoint}
            type="button"
            className="w-full bg-purple-500 text-black rounded-md px-4 py-2 mt-4"
          >
            Test Summary Endpoint
          </button>
        </form>
      </div>
    </div>
  );
}
