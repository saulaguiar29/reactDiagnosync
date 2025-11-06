import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Login form state
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  // Sign up form state
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "physician",
    specialty: "",
    facilityName: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",
    licenseNumber: "",
    yearsInPractice: ""
  });

  const [passwordStrength, setPasswordStrength] = useState("");

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)) return "strong";
    return "medium";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setSignUpData({ ...signUpData, password: newPassword });
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validation
    if (!loginData.username.trim()) {
      alert("Please enter your username or email");
      return;
    }
    if (!loginData.password.trim()) {
      alert("Please enter your password");
      return;
    }
    
    login({ username: loginData.username, role: "physician" });
    navigate("/physician");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    // Validation
    if (!signUpData.fullName.trim()) {
      alert("Please enter your full name");
      return;
    }
    if (!signUpData.email.trim()) {
      alert("Please enter your email address");
      return;
    }
    if (!signUpData.password.trim()) {
      alert("Please enter a password");
      return;
    }
    if (signUpData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!signUpData.phone.trim()) {
      alert("Please enter your phone number");
      return;
    }
    if (!signUpData.specialty.trim()) {
      alert("Please enter your specialty");
      return;
    }
    if (!signUpData.facilityName.trim()) {
      alert("Please enter your facility name");
      return;
    }
    if (!signUpData.city.trim() || !signUpData.state.trim() || !signUpData.zip.trim()) {
      alert("Please complete your address information");
      return;
    }
    
    // Handle sign up logic here
    console.log("Sign up data:", signUpData);
    alert("Account created successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-md">
              <svg 
                viewBox="0 0 800 257" 
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Circuit lines on left */}
                <g stroke="#14B8A6" strokeWidth="3" fill="none">
                  <line x1="207" y1="128" x2="257" y2="128" />
                  <circle cx="207" cy="128" r="4" fill="#14B8A6" />
                  <circle cx="220" cy="115" r="4" fill="#14B8A6" />
                  <circle cx="220" cy="141" r="4" fill="#14B8A6" />
                </g>
                
                {/* Waveform */}
                <path 
                  d="M 250 128 L 270 128 L 280 108 L 290 148 L 300 128 L 320 128" 
                  stroke="#06B6D4" 
                  strokeWidth="3" 
                  fill="none"
                />
                
                {/* Circular tech element */}
                <g stroke="#14B8A6" strokeWidth="2" fill="none">
                  <circle cx="350" cy="128" r="60" />
                  <circle cx="350" cy="128" r="50" />
                  <circle cx="350" cy="128" r="40" />
                  <path d="M 350 128 L 385 128" stroke="#14B8A6" strokeWidth="3"/>
                </g>
                
                {/* Circuit lines on right */}
                <g stroke="#14B8A6" strokeWidth="3" fill="none">
                  <line x1="410" y1="128" x2="460" y2="128" />
                  <circle cx="430" cy="115" r="4" fill="#14B8A6" />
                  <circle cx="430" cy="141" r="4" fill="#14B8A6" />
                  <circle cx="460" cy="128" r="4" fill="#14B8A6" />
                </g>
                
                {/* DiaPort Text */}
                <text 
                  x="500" 
                  y="160" 
                  fontFamily="Arial, sans-serif" 
                  fontSize="72" 
                  fontWeight="bold" 
                  fill="#4B5563"
                >
                  DiaPort
                </text>
              </svg>
            </div>
          </div>
          <p className="text-gray-600 mt-2 text-lg font-medium">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              !isSignUp
                ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              isSignUp
                ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {!isSignUp && (
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username or Email
              </label>
              <input
                id="username"
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                placeholder="Enter your username or email"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Sign In
            </button>
          </div>
        )}

        {/* Sign Up Form */}
        {isSignUp && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={signUpData.fullName}
                  onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                  placeholder="First & Last Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                  placeholder="name@clinic.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  id="password"
                  type="password"
                  value={signUpData.password}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                  placeholder="Create a password"
                />
                {signUpData.password && (
                  <div className="mt-2 flex gap-1">
                    <div className={`h-1 flex-1 rounded ${passwordStrength === 'weak' ? 'bg-red-500' : passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                    <div className={`h-1 flex-1 rounded ${passwordStrength === 'medium' || passwordStrength === 'strong' ? passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500' : 'bg-gray-200'}`}></div>
                    <div className={`h-1 flex-1 rounded ${passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={signUpData.confirmPassword}
                  onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                value={signUpData.phone}
                onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role / Title *
                </label>
                <select
                  id="role"
                  value={signUpData.role}
                  onChange={(e) => setSignUpData({ ...signUpData, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="physician">Physician</option>
                  <option value="labtech">Lab Technician</option>
                  <option value="nurse">Nurse Practitioner</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty *
                </label>
                <input
                  id="specialty"
                  type="text"
                  value={signUpData.specialty}
                  onChange={(e) => setSignUpData({ ...signUpData, specialty: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                  placeholder="e.g., Cardiology"
                />
              </div>
            </div>

            <div>
              <label htmlFor="facilityName" className="block text-sm font-medium text-gray-700 mb-2">
                Facility Name *
              </label>
              <input
                id="facilityName"
                type="text"
                value={signUpData.facilityName}
                onChange={(e) => setSignUpData({ ...signUpData, facilityName: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                placeholder="Hospital or Clinic Name"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  value={signUpData.city}
                  onChange={(e) => setSignUpData({ ...signUpData, city: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                  placeholder="City"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  id="state"
                  type="text"
                  value={signUpData.state}
                  onChange={(e) => setSignUpData({ ...signUpData, state: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                  placeholder="State"
                />
              </div>

              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP *
                </label>
                <input
                  id="zip"
                  type="text"
                  value={signUpData.zip}
                  onChange={(e) => setSignUpData({ ...signUpData, zip: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                  placeholder="ZIP"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  License Number
                </label>
                <input
                  id="licenseNumber"
                  type="text"
                  value={signUpData.licenseNumber}
                  onChange={(e) => setSignUpData({ ...signUpData, licenseNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                  placeholder="NPI or equivalent"
                />
              </div>

              <div>
                <label htmlFor="yearsInPractice" className="block text-sm font-medium text-gray-700 mb-2">
                  Years in Practice
                </label>
                <input
                  id="yearsInPractice"
                  type="number"
                  value={signUpData.yearsInPractice}
                  onChange={(e) => setSignUpData({ ...signUpData, yearsInPractice: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                  placeholder="e.g., 5"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignUp}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Create Account
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help? <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}