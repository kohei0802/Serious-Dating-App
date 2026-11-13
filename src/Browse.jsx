import ProfileCard from "./ProfileCard";

export default function Browse({
  profiles,
  likedProfiles,
  onLike,
  profileIndex,
  onNext,
}) {
  return (
    <>
      <ProfileCard profile={profiles[profileIndex]} />
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
    </>
  );

  function likeEventHandler() {
    const profileId = profiles[profileIndex].id;
    if (!likedProfiles.includes(profileId)) {
      onLike((prevArr) => [...prevArr, profileId]);
    }

    showNext();
  }

  function passEventHandler() {
    showNext();
  }

  function showNext() {
    onNext((prevI) => {
      if (prevI === profiles.length) {
        return prevI;
      }
      return prevI + 1;
    });
  }
}
