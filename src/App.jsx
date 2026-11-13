import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard.jsx";

function getMatches(profiles, likedProfiles) {
  const matches = profiles.filter(
    (profile) => likedProfiles.includes(profile.id) && profile.likesYou,
  );

  return matches;
}

function App() {
  const url = "http://localhost:3000/profiles";

  const [profiles, setProfiles] = useState([]);
  const [status, setStatus] = useState("loading");

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
  }, [url]);

  const [profileIndex, setProfileIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState(getLikedProfiles);

  useEffect(() => {
    localStorage.setItem("likedProfiles", JSON.stringify(likedProfiles));
  }, [likedProfiles]);

  const renderCard = () => {
    switch (status) {
      case "loading":
        return <div>Loading ...</div>;
      case "ready":
        return <ProfileCard profile={profiles[profileIndex]} />;
      case "error":
        return <div>Could not load profiles</div>;
    }
  };

  return (
    <>
      {renderCard()}
      <button
        disabled={profileIndex === profiles.length}
        onClick={likeEventHandler}
      >
        Like
      </button>
      <button
        disabled={profileIndex === profiles.length}
        onClick={passEventHandler}
      >
        Pass
      </button>
      <h2>Matches</h2>
      <ul>
        {getMatches(profiles, likedProfiles).map((profile) => (
          <li key={profile.id}>{profile.name}</li>
        ))}
      </ul>
    </>
  );

  function getLikedProfiles() {
    const storedLikedProfiles = JSON.parse(
      localStorage.getItem("likedProfiles"),
    );
    return storedLikedProfiles ? storedLikedProfiles : [];
  }

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
      if (prevI === profiles.length) {
        return prevI;
      }
      return prevI + 1;
    });
  }
}

export default App;
