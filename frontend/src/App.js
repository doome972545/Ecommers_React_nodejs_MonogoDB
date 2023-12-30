import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import React from "react";

function App() {
  return (
    <div>
      <Header/>
      <main className="pt-16">
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default App;
