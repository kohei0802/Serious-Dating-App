import { useEffect, useState } from "react";
import Matches from "./Matches.jsx";
import Browse from "./Browse.jsx";

function getLikedProfiles() {
  const storedLikedProfiles = JSON.parse(localStorage.getItem("likedProfiles"));
  return storedLikedProfiles ? storedLikedProfiles : [];
}

const url = "http://localhost:3000/profiles";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [status, setStatus] = useState("loading");

  const [profileIndex, setProfileIndex] = useState(0);

  const [likedProfiles, setLikedProfiles] = useState(getLikedProfiles);

  useEffect(() => {
    let ignore = false;

    async function getSetProfiles() {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(response.status);
        }
        const result = await response.json();
        if (!ignore) {
          setStatus("ready");
          setProfiles(result);
        }
      } catch (e) {
        if (!ignore) {
          setStatus("error");
        }
        console.log(e);
      }
    }

    getSetProfiles();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("likedProfiles", JSON.stringify(likedProfiles));
  }, [likedProfiles]);

  const renderBrowse = () => {
    switch (status) {
      case "loading":
        return <div>Loading ...</div>;
      case "ready":
        return (
          <Browse
            profiles={profiles}
            likedProfiles={likedProfiles}
            onLike={setLikedProfiles}
            profileIndex={profileIndex}
            onNext={setProfileIndex}
          />
        );
      case "error":
        return <div>Could not load profiles</div>;
    }
  };

  return (
    <>
      {renderBrowse()}
      <Matches profiles={profiles} likedProfiles={likedProfiles} />
      <button onClick={resetHandler}>Reset</button>
    </>
  );

  function resetHandler() {
    setLikedProfiles([]);
    setProfileIndex(0);
  }
}

export default App;
