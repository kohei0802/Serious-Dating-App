const profiles = [
  {
    name: "Amy",
    age: 21,
    bio: "i like cake",
    q1: "don't want to marry",
    q2: "can cook",
    q3: "eating is hobby",
  },
  {
    name: "Kathy",
    age: 22,
    bio: "i like dogs",
    q1: "want to marry",
    q2: "no cook",
    q3: "hiking is hobby",
  },
  {
    name: "Elena",
    age: 23,
    bio: "i like cats",
    q1: "don't want to marry",
    q2: "no cook",
    q3: "photography is hobby",
  },
  {
    name: "Bonnie",
    age: 25,
    bio: "i work a lot",
    q1: "want to marry",
    q2: "can cook",
    q3: "paiting is hobby",
  },
  {
    name: "Caroline",
    age: 24,
    bio: "i sing",
    q1: "don't want to marry",
    q2: "can cook",
    q3: "movie is hobby",
  },
];

let profileIndex = 0;

const root = document.getElementById("root");

// const div1 = document.createElement("div");

// root.appendChild(div1);

const currentcard = document.createElement("div");
currentcard.className = "card";

root.appendChild(currentcard);

renderProfile(profiles[0]);

const button = document.createElement("button");
button.textContent = "Next";
button.id = "Next";
root.appendChild(button);

button.addEventListener("click", () => {
  profileIndex = (profileIndex + 1) % profiles.length;

  renderProfile(profiles[profileIndex]);
});

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
