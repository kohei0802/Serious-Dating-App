import { useState } from "react";
import ProfileCard from "./ProfileCard.jsx";

const profiles = [
  {
    id: 1,
    likesYou: true,
    name: "Amy",
    age: 21,
    bio: "i like cake",
    q1: "don't want to marry",
    q2: "can cook",
    q3: "eating is hobby",
  },
  {
    id: 2,
    likesYou: false,
    name: "Kathy",
    age: 22,
    bio: "i like dogs",
    q1: "want to marry",
    q2: "no cook",
    q3: "hiking is hobby",
  },
  {
    id: 3,
    likesYou: false,
    name: "Elena",
    age: 23,
    bio: "i like cats",
    q1: "don't want to marry",
    q2: "no cook",
    q3: "photography is hobby",
  },
  {
    id: 4,
    likesYou: true,
    name: "Bonnie",
    age: 25,
    bio: "i work a lot",
    q1: "want to marry",
    q2: "can cook",
    q3: "painting is hobby",
  },
  {
    id: 5,
    likesYou: true,
    name: "Caroline",
    age: 24,
    bio: "i sing",
    q1: "don't want to marry",
    q2: "can cook",
    q3: "movie is hobby",
  },
  {
    id: 6,
    likesYou: false,
    name: "Mika",
    age: 26,
    bio: "i read a lot of history",
    q1: "want to marry",
    q2: "can cook",
    q3: "running is hobby",
  },
  {
    id: 7,
    likesYou: false,
    name: "Joyce",
    age: 23,
    bio: "i travel whenever i can",
    q1: "not sure about marriage",
    q2: "no cook",
    q3: "travel is hobby",
  },
  {
    id: 8,
    likesYou: true,
    name: "Hana",
    age: 27,
    bio: "i play piano",
    q1: "want to marry",
    q2: "can cook",
    q3: "music is hobby",
  },
  {
    id: 9,
    likesYou: false,
    name: "Rachel",
    age: 22,
    bio: "i am a night owl",
    q1: "don't want to marry",
    q2: "no cook",
    q3: "gaming is hobby",
  },
  {
    id: 10,
    likesYou: false,
    name: "Yuki",
    age: 24,
    bio: "i love the beach",
    q1: "not sure about marriage",
    q2: "can cook",
    q3: "swimming is hobby",
  },
];

function App() {
  const [profileIndex, setProfileIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState([]);
  console.log("likeEventt", likedProfiles);
  return (
    <>
      <ProfileCard profile={profiles[profileIndex]} />
      <button onClick={likeEventHandler}>Like</button>
      <button onClick={passEventHandler}>Pass</button>
    </>
  );

  function likeEventHandler() {
    const profileId = profiles[profileIndex].id;
    if (!likedProfiles.includes(profileId)) {
      setLikedProfiles((prevLPs) => [...prevLPs, profileId]);
    }

    showNext();
  }

  function passEventHandler() {
    showNext();
  }

  function showNext() {
    setProfileIndex((prevI) => {
      if (prevI === profiles.length - 1) {
        return prevI;
      }
      return prevI + 1;
    });
  }
}

export default App;
