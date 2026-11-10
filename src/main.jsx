// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";

// import App from "./App.jsx";
import ProfileCard from "./ProfileCard.jsx";

const tmpProf = {
  id: 1,
  likesYou: true,
  name: "Amy",
  age: 21,
  bio: "i like cake",
  q1: "don't want to marry",
  q2: "can cook",
  q3: "eating is hobby",
};

createRoot(document.getElementById("root")).render(
  <div>
    <ProfileCard profile={tmpProf}></ProfileCard>
  </div>,
);
