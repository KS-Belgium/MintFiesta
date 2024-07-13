import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from "firebase/database";
import QRCode from 'qrcode.react';

function SponsorQRCode() {
    const [sponsors, setSponsors] = useState([]);

    useEffect(() => {
        const fetchSponsors = async () => {
            const db = getDatabase();
            const sponsorsRef = ref(db, 'sponsors');
            const snapshot = await get(sponsorsRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const sponsorsList = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key
                }));
                setSponsors(sponsorsList);
            } else {
                console.log("No data available");
            }
        };

        fetchSponsors();
    }, []);

    return (
        <div className="SponsorQRCode">
            <h2>Sponsor QR Codes</h2>
            <div className="SponsorQRCode-grid">
                {sponsors.map((sponsor) => (
                    <div key={sponsor.id} className="SponsorQRCode-item">
                        <h3>{sponsor.name}</h3>
                        <QRCode value={`https://cabe-213-214-42-42.ngrok-free.app/auth?sponsorId=${sponsor.id}`} size={128} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SponsorQRCode;