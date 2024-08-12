import React, { useContext, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  //   console.log(email);
  //   console.log(password);

  const { store } = useContext(Context);
  return (
    <div>
      <input
        type="text"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide" : "Show"}
      </button>
      <button onClick={() => store.login(email, password)}>Login</button>
      <button onClick={() => store.registration(email, password)}>
        Registration
      </button>
    </div>
  );
};

export default observer(LoginForm);
