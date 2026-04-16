import { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

// small reusable spinner
const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12" cy="12" r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8z"
    />
  </svg>
);

const LoginPage = () => {
  const [currState, setCurrentState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
const [agreedToTerms, setAgreedToTerms] = useState(false);
const [attempted, setAttempted] = useState(false);
const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);


const onGuestLogin = async () => {
  setIsLoading(true);
  await login("guest", {});
  setIsLoading(false);
};

// 2. Block submission if not agreed
const onSubmitHandler = async (event) => {
  event.preventDefault();

  if (!agreedToTerms) {
    setAttempted(true);
    return;
  }

  if (currState === "Sign up" && !isDataSubmitted) {
    setIsDataSubmitted(true);
    return;
  }

  setIsLoading(true);
  await login(currState === "Sign up" ? "signup" : "login", {
    fullName,
    email,
    password,
    bio,
  });
  setIsLoading(false);
};


  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* -------- left -------- */}
      <img src={assets.logo_big} alt="logo" className="w-[min(30vw,250px)]" />

      {/* -------- right -------- */}

      <div className="flex flex-col gap-3"> 
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white
        border-green-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt="arrow"
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
                          className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="provide a short bio..."
            required
          ></textarea>
        )}

<button
  type="submit"
  disabled={isLoading}
  className="py-3 bg-gradient-to-r from-[#66ff33] to-[#1aff00] text-black rounded-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
>
  {isLoading ? (
    <>
      <Spinner />
      Please wait...
    </>
  ) : (
    currState === "Sign up" ? "Create Account" : "Login Now"
  )}
</button>

<div className="flex items-center gap-2 text-sm text-gray-500">
  <input
    type="checkbox"
    checked={agreedToTerms}
    onChange={(e) => {
      setAgreedToTerms(e.target.checked);
      if (e.target.checked) setAttempted(false); // clears red once they check it
    }}
    className={attempted && !agreedToTerms ? "accent-red-500 outline outline-2 outline-red-500 rounded" : ""}
  />
  <p className={attempted && !agreedToTerms ? "text-red-500" : ""}>
    Agree to the terms of use & privacy policy.
  </p>
</div>

        <div className="flex flex-col gap-2">
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrentState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-[#39ff14] cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an account{" "}
              <span
                onClick={() => setCurrentState("Sign up")}
                className="font-medium text-[#39ff14] cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>


      <div className="flex items-center gap-1.5 my-2">
  <hr className="flex-1 border-gray-500" />
  <span className="text-gray-500 text-xs">or</span>
  <hr className="flex-1 border-gray-500" />
</div>

<button
  type="button"
  onClick={onGuestLogin}
  disabled={isLoading}
  className="w-full py-3 border border-gray-500 text-gray-300 rounded-md cursor-pointer hover:bg-white/10 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-70"
>
  {isLoading ? (
    <>
      <Spinner />
      Please wait...
    </>
  ) : (
    "Continue as Guest"
  )}
</button>
</div>
    </div>
  );
};

export default LoginPage;