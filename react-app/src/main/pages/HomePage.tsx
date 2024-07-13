import React, { useState, useEffect } from 'react';
import { getPwdByMail, getAdminEventsByMail, getEventByName, getSponsorsByEvent } from "../model/firebase_api.js";
import { SHA256 } from "crypto-js";

function HomePage() {
    const [isConnect, setIsConnect] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegistreForm, setShowRegistreForm] = useState(false);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [events, setEvents] = useState([]); // Tableau pour stocker les détails des événements
    const [sponsors, setSponsors] = useState([]); // Tableau pour stocker les détails des sponsors

    useEffect(() => {
        const loadAdminEventsAndSponsors = async () => {
            try {
                const adminEvents = await getAdminEventsByMail(mail); // Récupérer les événements de l'admin par son email
                let eventsList = [];
                let sponsorsList = [];

                // Parcourir les événements récupérés
                for (const eventId of adminEvents) {
                    const eventDetails = await getEventByName(eventId);
                    if (eventDetails) {
                        eventsList.push(eventDetails); // Ajouter les détails de l'événement à la liste
                        const eventSponsors = await getSponsorsByEvent(eventDetails.id);
                        sponsorsList = sponsorsList.concat(eventSponsors); // Ajouter les sponsors de l'événement à la liste des sponsors
                    }
                }

                // Mettre à jour le state avec la liste des événements et des sponsors
                setEvents(eventsList);
                setSponsors(sponsorsList);
            } catch (error) {
                console.error("Error loading admin events and sponsors:", error);
            }
        };

        if (isConnect && mail) { // Assurez-vous que mail n'est pas vide avant de charger les événements
            loadAdminEventsAndSponsors();
        }
    }, [isConnect, mail]);

    const handleLoginClick = () => {
        setShowLoginForm(true);
    };

    const handleRegisterForm = () => {
        setShowRegistreForm(true);
    };

    const handleFormSubmit = async (e) => {
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
            <h1>Page d'accueil</h1>
            {isConnect && (
                <div>
                    <h2>Gérer mes événements</h2>
                    <ul>
                        {events.map((event, index) => (
                            <li key={index}>
                                <strong>Nom de l'événement:</strong> {event.name} <br />
                                <strong>Date de début:</strong> {event.start_date} <br />
                                <strong>Date de fin:</strong> {event.end_date} <br />
                                <strong>Description:</strong> {event.description} <br />
                                {event.img && <img src={event.img} alt={event.name} width="200" />} <br />
                                <strong>Sponsors:</strong> <br />
                                <ul>
                                    {sponsors.filter(sponsor => sponsor.id_event === event.id).map((sponsor, i) => (
                                        <li key={i}>
                                            {sponsor.name} <br />
                                            {sponsor.img && <img src={sponsor.img} alt={sponsor.name} width="100" />}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {!isConnect && !showLoginForm && !showRegistreForm && (
                <div>
                    <p>Bonjour bienvenue sur notre site. Vous pouvez vous connecter ou demander à créer votre événement.</p>
                    <button onClick={handleLoginClick}>Se connecter</button>
                    <button onClick={handleRegisterForm}>Créer un événement</button>
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
