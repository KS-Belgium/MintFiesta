import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from "firebase/database";
import "../styles/SponsorSlider.css";

function SponsorSlider() {
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
        <div className={"SponsorSlider"}>
            <h2>SponsorSlider</h2>
            <div >
                {sponsors.map((sponsor, index) => (
                    console.log(sponsor),
                    <img key={index} src={sponsor.img}/>
                ))}
            </div>
        </div>
    );
}

export default SponsorSlider;