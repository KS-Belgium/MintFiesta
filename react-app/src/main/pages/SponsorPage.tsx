import React from "react";
import Navbar from "../component/Navbar";
import "../styles/SponsorPage.css";

function SponsorPage() {
    return (
        <div className="sponsor-page">
            <h2>Sponsor</h2>
            <h1>CELO</h1>
            <h3>Congrats !</h3>
            <p>Claim your NFT to unlock unique stuff</p>
            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST3QrMg9PZDlTR5aXk98hQNOgFNigCEAVGlw&s"} alt="Sponsor" />
            <button>Claim</button>
            <h3 className="waiting-for-you">What is waiting for you</h3>
            <img src={"https://path_to_your_image"} alt="What is waiting for you" className="waiting-for-you" />
            <Navbar />
        </div>
    );
}

export default SponsorPage;