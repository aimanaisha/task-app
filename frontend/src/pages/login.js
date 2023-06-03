import { useState } from "react";
import { useLogin } from "../hooks/useLogin";


const Login = () => {

  const {login, loading} = useLogin()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(email, password)
    await login(email, password)
  }

  return (
    <form className="text-emerald-950 border-teal-300 mt-10 md:mt-20 border login flex flex-col md:w-1/3 mx-auto w-[95%] my-auto bg-emerald-200 rounded-lg justify-center p-5" onSubmit={handleSubmit}>
      <h3 className="self-center mb-5 text-2xl">Login to Get Started!</h3>

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

      <button className="text-lg border-2 text-emerald-950 rounded w-24 border-emerald-600 self-center py-1" disabled={loading}>Login</button>
      {/* {error && <div className="error">{error}</div>} */}
    </form>
  );
};

export default Login;
