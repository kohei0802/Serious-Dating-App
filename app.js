async function getProfiles(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.status);
  }

  const result = await response.json();
  console.log("getProfiles got ", result);
  return result;
}

function renderProfile(profile) {
  if (profile === null) {
    currentcard.textContent = "No more profiles";
    return;
  }

  currentcard.textContent = "";
  const nameDiv = document.createElement("div");
  const likeDiv = document.createElement("div");
  const ageDiv = document.createElement("div");
  const bioDiv = document.createElement("div");
  const q1Div = document.createElement("div");
  const q2Div = document.createElement("div");
  const q3Div = document.createElement("div");
  nameDiv.textContent = profile.name;
  likeDiv.textContent = profile.likesYou
    ? `${profile.name} liked your profile`
    : "";
  ageDiv.textContent = profile.age;
  bioDiv.textContent = profile.bio;
  q1Div.textContent = profile.q1;
  q2Div.textContent = profile.q2;
  q3Div.textContent = profile.q3;
  currentcard.appendChild(nameDiv);
  currentcard.appendChild(likeDiv);
  currentcard.appendChild(ageDiv);
  currentcard.appendChild(bioDiv);
  currentcard.appendChild(q1Div);
  currentcard.appendChild(q2Div);
  currentcard.appendChild(q3Div);
}

function getMatches(profiles, likedProfiles) {
  const matches = profiles.filter(
    (profile) => likedProfiles.includes(profile.id) && profile.likesYou,
  );

  console.log("getMatches return ", matches);

  return matches;
}

async function main() {
  currentcard.textContent = "Loading....";

  const storedLikedProfiles = JSON.parse(localStorage.getItem("likedProfiles"));
  const likedProfiles = storedLikedProfiles ? storedLikedProfiles : [];

  let profileIndex = 0;
  let profiles = null;
  try {
    profiles = await getProfiles("http://localhost:3000/profiles");

    renderProfile(profiles.length > 0 ? profiles[0] : null);
    renderMatch(getMatches(profiles, likedProfiles));

    const likeButton = document.createElement("button");
    likeButton.textContent = "Like";
    const passButton = document.createElement("button");
    passButton.textContent = "Pass";

    cardHolder.appendChild(likeButton);
    cardHolder.appendChild(passButton);

    likeButton.addEventListener("click", () => {
      if (profileIndex === profiles.length) {
        return;
      }
      console.log(`Like ${profiles[profileIndex].id}`);
      if (!likedProfiles.includes(profiles[profileIndex].id)) {
        likedProfiles.push(profiles[profileIndex].id);
        localStorage.setItem("likedProfiles", JSON.stringify(likedProfiles));
        renderMatch(getMatches(profiles, likedProfiles));
      }
      console.log(JSON.parse(localStorage.getItem("likedProfiles")));
      showNext();
    });

    passButton.addEventListener("click", () => {
      if (profileIndex === profiles.length) {
        return;
      }

      console.log(`Pass ${profiles[profileIndex].id}`);
      showNext();
    });
  } catch (e) {
    currentcard.textContent = "Couldn't load profiles";
    console.error(e);
  }

  function showNext() {
    profileIndex = profileIndex + 1;

    console.log(profileIndex);

    renderProfile(
      profileIndex < profiles.length ? profiles[profileIndex] : null,
    );
  }

  function renderMatch(matches) {
    const header = document.createElement("header");
    const ul = document.createElement("ul");

    ul.className = "matchList";

    matches.forEach((match) => {
      const li = document.createElement("li");
      li.textContent = match.name;
      ul.appendChild(li);
    });

    matchHolder.textContent = "";
    header.textContent = "Matches";

    matchHolder.appendChild(header);
    matchHolder.appendChild(ul);
  }
}

const root = document.getElementById("root");
const cardHolder = document.createElement("div");
const currentcard = document.createElement("div");
const matchHolder = document.createElement("div");

cardHolder.className = "cardHolder";
currentcard.className = "card";
matchHolder.className = "match";

root.appendChild(cardHolder);
cardHolder.appendChild(currentcard);

root.appendChild(matchHolder);

main();
