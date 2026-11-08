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
  const ageDiv = document.createElement("div");
  const bioDiv = document.createElement("div");
  const q1Div = document.createElement("div");
  const q2Div = document.createElement("div");
  const q3Div = document.createElement("div");
  nameDiv.textContent = profile.name;
  ageDiv.textContent = profile.age;
  bioDiv.textContent = profile.bio;
  q1Div.textContent = profile.q1;
  q2Div.textContent = profile.q2;
  q3Div.textContent = profile.q3;
  currentcard.appendChild(nameDiv);
  currentcard.appendChild(ageDiv);
  currentcard.appendChild(bioDiv);
  currentcard.appendChild(q1Div);
  currentcard.appendChild(q2Div);
  currentcard.appendChild(q3Div);
}

async function main() {
  ///
  currentcard.textContent = "Loading....";

  try {
    const profiles = await getProfiles("http://localhost:3000/profiles");

    let profileIndex = 0;

    renderProfile(profiles[0]);

    button = document.createElement("button");
    button.textContent = "Next";
    button.id = "Next";
    root.appendChild(button);

    button.addEventListener("click", () => {
      profileIndex = (profileIndex + 1) % profiles.length;

      renderProfile(profiles[profileIndex]);
    });
  } catch (e) {
    currentcard.textContent = "Couldn't load profiles";
    console.error(e);
  }
}

const root = document.getElementById("root");
let button = null;
const currentcard = document.createElement("div");

currentcard.className = "card";

root.appendChild(currentcard);

main();
