const profiles = [
  { name: "Amy", age: 21 },
  { name: "Kathy", age: 22 },
  { name: "Elena", age: 23 },
  { name: "Bonnie", age: 25 },
  { name: "Caroline", age: 24 },
];

profileIndex = 0;

const root = document.getElementById("root");

const div1 = document.createElement("div");

root.appendChild(div1);

div1.textContent =
  profiles[profileIndex].age + " " + profiles[profileIndex].name;

const button = document.createElement("button");
button.textContent = "Next";
button.id = "Next";
root.appendChild(button);

button.addEventListener("click", () => {
  profileIndex = (profileIndex + 1) % profiles.length;
  div1.textContent =
    profiles[profileIndex].age + " " + profiles[profileIndex].name;
});
