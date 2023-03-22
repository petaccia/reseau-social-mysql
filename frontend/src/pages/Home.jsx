import React from "react";
import AuthForm from "@components/Auth/AuthForm";
import Sidebar from "@components/layout/Sidebar";

function Home() {
  return (
    <section>
      <Sidebar />
      <AuthForm />
     
    </section>
  );
}

export default Home;
