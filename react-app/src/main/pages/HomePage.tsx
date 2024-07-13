import React, { useState } from 'react';
import { getPwdByMail } from "../model/firebase_api.js";
import { SHA256 } from "crypto-js";

function HomePage() {
    const [isConnect, setIsConnect] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = () => {
        setShowLoginForm(true);
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
                </div>
            )}
            {!isConnect && !showLoginForm && (
                <div>
                    <p>Bonjour bienvenue sur notre site. Vous pouvez vous connecter ou demander à créer votre événement.</p>
                    <button onClick={handleLoginClick}>Se connecter</button>
                    <button>S'inscrire</button>
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
