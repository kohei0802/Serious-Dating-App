async function getProfiles(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.status);
  }

  const result = await response.json();
  console.log(result);
  return result;
}

function renderProfile(profile) {
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
    ? `${profile.name} liked your profile!`
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

async function main() {
  currentcard.textContent = "Loading....";

  let profileIndex = 0;
  let profiles = null;
  try {
    profiles = await getProfiles("http://localhost:3000/profiles");

    renderProfile(profiles[0]);

    const likeButton = document.createElement("button");
    likeButton.textContent = "Like";
    const passButton = document.createElement("button");
    passButton.textContent = "Pass";

    root.appendChild(likeButton);
    root.appendChild(passButton);

    likeButton.addEventListener("click", () => {
      console.log(`Like ${profiles[profileIndex].id}`);
      showNext();
    });

    passButton.addEventListener("click", () => {
      console.log(`Pass ${profiles[profileIndex].id}`);
      showNext();
    });
  } catch (e) {
    currentcard.textContent = "Couldn't load profiles";
    console.error(e);
  }

  function showNext() {
    profileIndex = (profileIndex + 1) % profiles.length;

    renderProfile(profiles[profileIndex]);
  }
}

const root = document.getElementById("root");
const currentcard = document.createElement("div");

currentcard.className = "card";

root.appendChild(currentcard);

main();
