import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

export const Main = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const faviconLink = document.querySelector("link[rel='icon']");
    if (isDesktop) {
      document.title = "Owomonie Admin Page";
      if (faviconLink) {
        faviconLink.setAttribute("href", "/logo.png");
      }
    } else {
      document.title = "Error Occured!";
      if (faviconLink) {
        faviconLink.setAttribute("href", "");
      }
    }
  }, [isDesktop]);

  return (
    <div>
      <App />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
