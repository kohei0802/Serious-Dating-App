function getMatches(profiles, likedProfiles) {
  const matches = profiles.filter(
    (profile) => likedProfiles.includes(profile.id) && profile.likesYou,
  );

  return matches;
}

export default function Matches({ profiles, likedProfiles }) {
  return (
    <>
      <h2>Matches</h2>
      <ul>
        {getMatches(profiles, likedProfiles).map((profile) => (
          <li key={profile.id}>{profile.name}</li>
        ))}
      </ul>
    </>
  );
}
