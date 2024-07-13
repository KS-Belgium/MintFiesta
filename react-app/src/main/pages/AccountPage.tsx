import "../styles/AccountPage.css";
import React from "react";
import { getParticipantByMail } from "../model/firebase_api";

function AccountPage() {
    const mail= "participant1@mail.com";
    const participant = getParticipantByMail(mail, 3);
    const nftsOwned = participant.nfts;
    console.log(nftsOwned);

    return (
        <div>
            
        </div>
    );
}

export default AccountPage;