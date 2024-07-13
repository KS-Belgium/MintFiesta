import React, { useState } from "react";
import "../styles/Authentication.css";
import { getParticipantByMail } from "../model/firebase_api"; // Import correct de la fonction

function Authentication() {
    const [mail, setMail] = useState('');
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [idEvent, setIdEvent] = useState('');
    const [idParticipant, setIdParticipant] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const participant = await getParticipantByMail(mail, 0);
            if (participant && participant.code === code) {
                alert("Connexion réussie");
                setErrorMessage('');
                setIdParticipant(participant.id);
                // Rediriger ou effectuer d'autres actions après la connexion réussie
            } else {
                setErrorMessage("Erreur de connexion : code incorrect");
            }
        } catch (error) {
            setErrorMessage(`Erreur de connexion : ${error.message}`);
        }
    };

    return (
        <div>
            <h1>MintyFiesta</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="email"
                    placeholder="Votre mail"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Votre code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button type="submit">Se connecter</button>
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
}

export default Authentication;
