import React from "react";
import "./TeamSection.css";

const TeamSection = () => {
  const teamCategories = {
    "Administration": [
      {
        name: "Emanuela Boschero",
        role: "Administration Support",
        linkedIn: "#",
        facebook: "#",
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5sFjZPx1Yzi1b9_FpQzrxqgsjv2DPAp81Q&s",
      },
      {
        name: "Karen White",
        role: "Finance Manager",
        linkedIn: "#",
        facebook: "#",
        imageURL: "https://cdni.iconscout.com/illustration/premium/thumb/female-profile-illustration-download-in-svg-png-gif-file-formats--young-woman-girl-avatar-portraits-pack-people-illustrations-6590623.png?f=webp",
      },
      {
        name: "Paul Brown",
        role: "HR Specialist",
        linkedIn: "#",
        facebook: "#",
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf8GOlaSOIuicOLo8uLGgoHta1sQ_M473gBg&s",
      },
    ],
    "Communication": [
      {
        name: "Jessica Smith",
        role: "Communication Head",
        linkedIn: "#",
        facebook: "#",
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-2MVGTaluJdhDzyMMpwrhv2AVw3NfnDLbw&s",
      },
    ],
    "Artistic Direction": [
      {
        name: "Laura Wilson",
        role: "Creative Designer",
        linkedIn: "#",
        facebook: "#",
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxFTIE1o0KC7-cV7U7R9NHNCm-xOZA4tJ07ue0dMVoOnLQbjo_XfYJjoBnNM9l_HUYcJg&usqp=CAU",
      },
    ],
    "Logistics and Production": [
      {
        name: "Michael Chen",
        role: "Event Manager",
        linkedIn: "#",
        facebook: "#",
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJr-fGkiy1DE5A0JNOkcmCNGcXuQXdzENZA&s",
      },
    ],
    "Partnerships": [
      {
        name: "David Bonino",
        role: "Partnership Coordinator",
        linkedIn: "#",
        facebook: "#",
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR2EXelJNCgczyB9wAbWPeSORFIgkSO7kEXhu9ClV0UKvpRfzBASagnwEu2IzLPhguhEE&usqp=CAU",
      },
    ],
    "Community": [
      {
        name: "Luke Morano",
        role: "Community Manager",
        linkedIn: "#",
        facebook: "#",
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsPJ9cm0-r5p50py0yUzvM5ZtEB-xWoJRPRA&s",
      },
    ],
  };

  return (
    <div className="px-4 team-section">
      <div className="team-intro">
        <h1 className="team-header">The faces behind TEDx <span className="text-red-600">IPSA</span></h1>
        <p className="team-description">
          We are over 50 volunteers with different ages and experiences, and a 
          strong bond with Cuneo. We want to spread new ideas, foster
          relationships and opportunities.
        </p>
      </div>
      {Object.entries(teamCategories).map(([category, members], idx) => (
        <div key={idx} className="team-category">
          <h3 className="category-title">{category}</h3>
          <div className="team-members">
            {members.map((member, idx) => (
              <div key={idx} className="member">
                <div className="image-wrapper">
                  <img
                    src={member.imageURL}
                    alt={member.name}
                    className="member-image"
                  />
                </div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <div className="member-links">
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-link"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-link"
                  >
                    Facebook ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamSection;
