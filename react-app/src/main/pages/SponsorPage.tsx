import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { getDatabase, ref, get } from "firebase/database";
import Navbar from "../component/Navbar.tsx";
import "../styles/SponsorPage.css";

function SponsorPage() {
    const { sponsorId } = useParams();
    const [sponsor, setSponsor] = useState(null);
    const navigate = useNavigate();
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem(`sponsorToken_${sponsorId}`);
        if (!token) {
            navigate('/event');
            return;
        }
        const fetchSponsor = async () => {
            const db = getDatabase();
            const sponsorRef = ref(db, `sponsors/${sponsorId}`);
            const snapshot = await get(sponsorRef);
            if (snapshot.exists()) {
                const sponsorData = snapshot.val();
                setSponsor(sponsorData);

                // Fetch NFTs associated with the sponsor
                const nftPromises = sponsorData.nfts.map(async (nftId) => {
                    const nftRef = ref(db, `nfts/${nftId}`);
                    const nftSnapshot = await get(nftRef);
                    return nftSnapshot.exists() ? nftSnapshot.val() : null;
                });
                const nftData = await Promise.all(nftPromises);
                setNfts(nftData.filter(nft => nft !== null));
            } else {
                console.log("Sponsor not found");
            }
        };

        fetchSponsor();
    }, [sponsorId]);

    if (!sponsor) {
        return <p>Loading sponsor information...</p>;
    }

    return (
        <div className="sponsor-page">
            <h2>Sponsor</h2>
            <h1>{sponsor.name}</h1>
            <h3>Congrats !</h3>
            <p>Claim your NFT to unlock unique stuff</p>
            {nfts.length > 0 && (
                <div className="nft-section">
                    {nfts.map((nft, index) => (
                        <div key={index} className="nft-item">
                            <img src={nft.url} alt={nft.name} />
                        </div>
                    ))}
                </div>
            )}
            <button>Claim</button>
            <h3 className="waiting-for-you">What is waiting for you</h3>
            <img src="https://www.dezignercom.com/wp-content/uploads/2024/01/im-produits.jpg" alt="What is waiting for you" className="waiting-for-you" />
            <Navbar />
        </div>
    );
}

export default SponsorPage;