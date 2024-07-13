import React, { useState, useEffect } from 'react';
import { getPwdByMail, getAdminEventsByMail, getEventByName } from "../model/firebase_api.js";
import { SHA256 } from "crypto-js";

function HomePage() {
    const [isConnect, setIsConnect] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegistreForm, setShowRegistreForm] = useState(false);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [events, setEvents] = useState<any[]>([]); // Tableau pour stocker les détails des événements

    useEffect(() => {
        // Fonction pour charger les événements une fois connecté
        const loadAdminEvents = async () => {
            try {
                const adminEvents = await getAdminEventsByMail(mail); // Récupérer les événements de l'admin par son email
                let eventsList = [];
        
                // Parcourir les événements récupérés
                for (const eventId in adminEvents) {
                    const eventDetails = await getEventByName(adminEvents[eventId]);
                    if (eventDetails) {
                        eventsList.push(eventDetails); // Ajouter les détails de l'événement à la liste
                    }
                }
        
                // Mettre à jour le state avec la liste des événements
                setEvents(eventsList);
            } catch (error) {
                console.error("Error loading admin events:", error);
            }
        };        

        if (isConnect && mail) { // Assurez-vous que mail n'est pas vide avant de charger les événements
            loadAdminEvents();
        }
    }, [isConnect, mail]);

    const handleLoginClick = () => {
        setShowLoginForm(true);
    };

    const handleRegisterForm = () => {
        setShowRegistreForm(true);
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
            <h1>Page d'accueil</h1>
            {isConnect && (
                <div>
                    <h2>Gérer mes événements</h2>
                    <ul>
                        {events.map((event, index) => (
                            <li key={index}>
                                <strong>Nom de l'événement:</strong> {event.nom} <br />
                                <strong>Date de début:</strong> {event.start_date} <br />
                                <strong>Date de fin:</strong> {event.end_date} <br />
                                <strong>Description:</strong> {event.description} <br />
                                {/* Ajoutez d'autres détails de l'événement ici si nécessaire */}
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
