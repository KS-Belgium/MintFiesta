import React, { useState, useEffect } from 'react';
import "../styles/HomePage.css";
import { getPwdByMail, getAdminEventsByMail, getEventByName, getSponsorsByEvent } from "../model/firebase_api.js";
import { SHA256 } from "crypto-js";

function HomePage() {
    const [isConnect, setIsConnect] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegistreForm, setShowRegistreForm] = useState(false);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [events, setEvents] = useState([]); // Array to store event details
    const [sponsors, setSponsors] = useState([]); // Array to store sponsor details

    useEffect(() => {
        const loadAdminEventsAndSponsors = async () => {
            try {
                const adminEvents = await getAdminEventsByMail(mail); // Get admin events by email
                let eventsList = [];
                let sponsorsList = [];

                // Loop through the retrieved events
                for (const eventId of adminEvents) {
                    const eventDetails = await getEventByName(eventId);
                    if (eventDetails) {
                        eventsList.push(eventDetails); // Add event details to the list
                        const eventSponsors = await getSponsorsByEvent(eventDetails.id);
                        sponsorsList = sponsorsList.concat(eventSponsors); // Add event sponsors to the sponsors list
                    }
                }

                // Update the state with the events and sponsors list
                setEvents(eventsList);
                setSponsors(sponsorsList);
            } catch (error) {
                console.error("Error loading admin events and sponsors:", error);
            }
        };

        if (isConnect && mail) { // Ensure mail is not empty before loading events
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
                alert("Login error");
                return;
            }
            setIsConnect(true);
            setShowLoginForm(false); // Hide the form after successful login
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>MintyFiesta</h1>
            {isConnect && (
                <div>
                    <h2>Manage My Events</h2>
                    <ul>
                        {events.map((event, index) => (
                            <li key={index}>
                                <strong>Event Name:</strong> {event.name} <br />
                                <strong>Start Date:</strong> {event.start_date} <br />
                                <strong>End Date:</strong> {event.end_date} <br />
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
                    <button>Create a new event</button>
                </div>
            )}
            
            {!isConnect && !showLoginForm && !showRegistreForm && (
                <div>
                    <button onClick={handleRegisterForm}>Sign Up</button>
                    <button onClick={handleLoginClick}>Log In</button>
                </div>
            )}

            {!isConnect && showRegistreForm && (
                <div>
                    <p>Registration Form</p>
                </div>
            )}

            {!isConnect && showLoginForm && (
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Log In</button>
                </form>
            )}
        </div>
    );
}

export default HomePage;
