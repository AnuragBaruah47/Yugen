import React from "react";
import { createGoogleLogin } from "./features/auth/api/googleAuth";
import authService from "./app/lib/Appwrite/authservice";
import Buttons from "../style/components/Buttons";

const App = () => {

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Buttons variant={"outline"} text={"Helloaj"}/>
    </div>
  );
};

export default App;
