// import { useState } from "react";

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

function App() {
  return (
    <div>
      <ProfileCard profile={tmpProf} />
    </div>
  );
}

export default App;
