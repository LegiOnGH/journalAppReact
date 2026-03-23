import { useState } from "react";
import { signupUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function SignupPage(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async(e) => {
        e.preventDefault();
        try{
            const token = await signupUser({
                userName,
                password,
                email,
                sentimentAnalysis : false
            })
            console.log("Response: ", token);
            navigate("/login")

        }catch(err){
            console.error(err);
            console.error("Backend response: " + err.response?.data);
    }
}

return(
    <>
    <h2>Sign Up</h2>
    <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">SignUp</button>
      </form>
    </>
)
}

export default SignupPage;