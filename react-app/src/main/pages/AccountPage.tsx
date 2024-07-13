import "../styles/AccountPage.css";
import React, { useState, useEffect } from 'react';
import { getParticipantByMail, getAllNfts } from "../model/firebase_api";
import Navbar from "../component/Navbar.tsx";

function AccountPage() {
    const mail = "participant1@mail.com";
    const [nftsOwned, setNftsOwned] = useState<string[]>([]);
    const [allNfts, setAllNfts] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        const fetchParticipantData = async () => {
            try {
                const participant = await getParticipantByMail(mail, 3);
                setNftsOwned(participant.nfts);
            } catch (error) {
                console.error('Error fetching participant data:', error);
            }
        };

        const fetchAllNfts = async () => {
            try {
                const allNftsData = await getAllNfts();
                setAllNfts(allNftsData);
            } catch (error) {
                console.error('Error fetching all NFTs:', error);
            }
        };

        fetchParticipantData();
        fetchAllNfts();
    }, [mail]);

    const groupNftsBySponsors = () => {
        const nftsBySponsors: { [key: string]: any[] } = {};

        Object.keys(allNfts).forEach(key => {
            const nft = allNfts[key];
            const sponsor = nft.sponsor;
            if (!nftsBySponsors[sponsor]) {
                nftsBySponsors[sponsor] = [];
            }
            nftsBySponsors[sponsor].push(nft);
        });

        return nftsBySponsors;
    };

    const sponsorsWithNfts = groupNftsBySponsors();

    const isNftOwned = (nftId: string) => {
        return nftsOwned.includes(nftId);
    };

    return (
        <div>
            <h1>NFTs Grouped by Sponsors</h1>
            {Object.keys(sponsorsWithNfts).map(sponsor => (
                <div key={sponsor}>
                    <h2>{sponsor}</h2>
                    <div className="nft-images">
                        {sponsorsWithNfts[sponsor].map((nft: any) => (
                            <div key={nft.id} className="nft-item">
                                <img
                                    src={nft.url}
                                    alt={nft.name}
                                    style={{
                                        filter: isNftOwned(nft.name) ? 'none' : 'grayscale(100%)',
                                        maxWidth: '100%',
                                        height: 'auto'
                                    }}
                                />
                                <p><strong>Name:</strong> {nft.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <Navbar/>
        </div>
    );
}

export default AccountPage;
