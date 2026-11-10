// import { useState } from "react";

export default function ProfileCard({ profile }) {
  return (
    <>
      <div>{profile.name}</div>
      <div>{profile.likesYou ? `${profile.name} liked your profile` : ""}</div>
      <div>{profile.age}</div>
      <div>{profile.bio}</div>
      <div>{profile.q1}</div>
      <div>{profile.q2}</div>
      <div>{profile.q3}</div>
    </>
  );
}
