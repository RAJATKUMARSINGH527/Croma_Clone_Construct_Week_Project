import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";


export default function Login() {
    const [step, setStep] = useState(1); // Steps: 1 - Email, 2 - Phone, 3 - OTP
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("login");

    const navigate = useNavigate();

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone = (phone) => /^\d{10}$/.test(phone);
    const isValidOtp = (otp) => /^\d{6}$/.test(otp);
  

    const handleEmailSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      if (!isValidEmail(email)) {
        setError("Enter a valid email address");
        return;
      }
  
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/auth/check-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
          setStep(2);
        } else {
          setError(data.message || "Email verification failed");
        }
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
  
    const handlePhoneSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      if (!isValidPhone(phoneNumber)) {
        setError("Enter a valid 10-digit phone number");
        return;
      }
  
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber, email }),
        });
        const data = await response.json();
        if (response.ok) {
          setStep(3);
        } else {
          setError(data.message || "Failed to send OTP");
        }
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
  
    const handleOtpSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      if (!isValidOtp(otp)) {
        setError("Enter a valid 6-digit OTP");
        return;
      }
  
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber, otp, email }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("isVerified", "true"); // Store verification status
          navigate("/");
        } else {
          setError(data.message || "OTP verification failed");
        }
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-black w-full max-w-md rounded-lg shadow-lg px-8 py-10 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition duration-300"
          onClick={() => navigate("/")}
        >
          <X size={24} />
        </button>

        {/* Login / Create Account Toggle */}
        <div className="mb-6 flex items-center justify-center border border-gray-600 rounded-md p-1 gap-4">
          <button
            className={`px-4 py-2 text-white ${activeTab === "login" ? "font-bold" : "opacity-70"}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>

          <div className="flex flex-col items-center">
            <div className="w-[1px] h-2 bg-gray-500"></div>
            <div className="border border-gray-500 px-1 py-0.5 rounded-md text-white text-xs">
              OR
            </div>
            <div className="w-[1px] h-2 bg-gray-500"></div>
          </div>

          <button
            className={`px-4 py-2 text-white ${activeTab === "create" ? "font-bold" : "opacity-70"}`}
            onClick={() => setActiveTab("create")}
          >
            Create Account
          </button>
        </div>

        {/* Input Fields */}
        <div className="text-center mb-4">
          <p className="text-white text-sm">
            {step === 1 ? "Enter your Email or Phone Number" :
             step === 2 ? "Enter your Phone Number" : "Enter OTP"}
          </p>
        </div>

        <form onSubmit={step === 1 ? handleEmailSubmit : step === 2 ? handlePhoneSubmit : handleOtpSubmit}>
          <div className="mb-4">
            {step === 1 ? (
              <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600" />
            ) : step === 2 ? (
              <input type="text" placeholder="Enter your Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600" />
            ) : (
              <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600" />
            )}
          </div>

          {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

          {/* Show 'Keep Signed In' only for first step */}
          {step === 1 && (
            <div className="mb-4 flex items-center justify-center">
              <input
                type="checkbox"
                id="keepSignedIn"
                checked={keepSignedIn}
                onChange={() => setKeepSignedIn(!keepSignedIn)}
                className="mr-3 w-5 h-5 text-teal-500 border-2 border-gray-500 rounded-md"
              />
              <label htmlFor="keepSignedIn" className="text-white text-sm">
                Keep me signed in
              </label>
            </div>
          )}
          {/* Terms & Conditions */}
          <div className="text-sm text-gray-400 text-center mb-4">
            By continuing you agree to our{" "}
            <a href="#" className="text-teal-500">
              Terms of Use
            </a>{" "}
            &{" "}
            <a href="#" className="text-teal-500">
              Privacy Policy
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded-md hover:bg-teal-600 transition duration-300" disabled={loading}> {loading ? "Processing..." : step === 1 ? "Continue" : step === 2 ? "Send OTP" : "Verify OTP"} </button>
        </form>
      </div>
    </div>
  );
}






