import "../styles/HomePage.css";
import React, { useState } from 'react';
import {getPwdByMail} from "../model/firebase_api.js";

function HomePage() {
    const [isConnect, setIsConnect] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleLoginClick = () => {
        setShowLoginForm(true);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let pwd = getPwdByMail(e.mail);
        setIsConnect(true);
        setShowLoginForm(false); // Cacher le formulaire après connexion réussie
    };

    return (
        <div>
            <h1>Home Page</h1>
            {isConnect &&(
                <div>
                    <h2>Gérer mes événements</h2>
                </div>
            )}
            {!isConnect && !showLoginForm &&(
                <div>
                <p>Bonjour bienvenue sur notre site. Vous pouvez vous connecter ou demander à créer votre événement.</p>
                <button onClick={handleLoginClick}>Se connecter</button>
                <button>S'inscrire</button>
            </div>
            )}

            {!isConnect && showLoginForm && (
                <form onSubmit={handleFormSubmit}>
                    <input type="mail" placeholder="Mail" />
                    <input type="password" placeholder="Mot de passe" />
                    <button type="submit">Se connecter</button>
                </form>
            )}
        </div>
    );
}

export default HomePage;
