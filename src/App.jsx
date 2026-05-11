import React from "react";
import { createGoogleLogin } from "./features/auth/api/googleAuth";
import authService from "./app/lib/Appwrite/authservice";

const App = () => {
  const user = {
    email: "anuragbaruah2004@gmail.com",
    password: "12345678",
    name: "whiking",
  };

  const onClickonBut = async () => {
    await authService.createAccount(user);
    const user2 = await authService.checkUser();
    console.log(user2);
  };
  return (
    <div>
      <button onClick={createGoogleLogin}>Google Login</button>
      <button onClick={onClickonBut}>Login</button>
    </div>
  );
};

export default App;
