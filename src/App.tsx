import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import CustomButton from "./components/CusomButton";

function App() {
  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
          <CustomButton text="Click me!" onClick={() => console.log("Hello!")} />
    </div>
  );
}

export default App;
