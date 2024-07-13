import React, { useState, useEffect } from 'react';
import { getPwdByMail, getAdminEventsByMail, getEventByName } from "../model/firebase_api.js";
import { SHA256 } from "crypto-js";

function HomePage() {
    const [isConnect, setIsConnect] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegistreForm, setshowRegistreForm] = useState(false);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [events, setEvents] = useState<any[]>([]); // Tableau pour stocker les détails des événements

    useEffect(() => {
        // Fonction pour charger les événements une fois connecté
        const loadAdminEvents = async () => {
            try {
                const event = await getEventByName("ETH-Brussels"); // Remplacez par le nom de l'événement souhaité
                setEvents([event]);
            } catch (error) {
                console.error("Error loading admin events:", error);
            }
        };

        if (isConnect) {
            loadAdminEvents();
        }
    }, [isConnect]); // Dépendance pour recharger lorsque isConnect change

    const handleLoginClick = () => {
        setShowLoginForm(true);
    };

    const handleLoginClick2 = () => {
        setshowRegistreForm(true);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const pwd = await getPwdByMail(mail);
            if (SHA256(password).toString() !== pwd) {
                alert("Erreur de connexion");
                return;
            }
            setIsConnect(true);
            setShowLoginForm(false); // Cacher le formulaire après connexion réussie
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Home Page</h1>
            {isConnect && (
                <div>
                    <h2>Gérer mes événements</h2>
                    <ul>
                        {events.map((event, index) => (
                            <li key={index}>{event.infos.nom}</li>
                        ))}
                    </ul>
                </div>
            )}
            {!isConnect && !showLoginForm && !showRegistreForm && (
                <div>
                    <p>Bonjour bienvenue sur notre site. Vous pouvez vous connecter ou demander à créer votre événement.</p>
                    <button onClick={handleLoginClick}>Se connecter</button>
                    <button onClick={handleLoginClick2}>Créer un événement</button>
                </div>
            )}

            {!isConnect && showRegistreForm && (
                <div>
                    <p>Formulaire d'inscription</p>
                </div>
            )}

            {!isConnect && showLoginForm && (
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="mail"
                        placeholder="Mail"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Se connecter</button>
                </form>
            )}
        </div>
    );
}

export default HomePage;
