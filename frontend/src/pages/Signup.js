import { useState } from "react";
import { useSignup } from "../hooks/useSignup";


const Signup = () => {

  const { signup, loading } = useSignup()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    await signup(email, password)
  }

  return (
 
    <form className="text-orange-900 border-orange-300 mt-10 md:mt-20 border signup flex flex-col md:w-1/3 mx-auto w-[95%] my-auto bg-amber-200 rounded-lg justify-center p-5" onSubmit={handleSubmit}>
      <h3 className="self-center mb-5 text-2xl">Don't have an account?</h3>

      <label className="mb-2">Your Email address</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="mb-4 h-10 rounded p-2"
      />
      <label className="mb-2">Your Password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="mb-4 h-10 rounded p-2"
      />

      <button className="text-lg border-2 text-orange-900 rounded w-24 border-orange-600 self-center py-1" disabled={loading}>Sign Up</button>
      {/* {error && <div className="error">{error}</div>} */}
    </form>
  );
};

export default Signup;
