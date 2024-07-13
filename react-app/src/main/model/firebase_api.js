import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getDatabase, ref, get, query, orderByChild, equalTo, push, set, update } from "firebase/database";
import SHA256 from "crypto-js/sha256";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA4E2AMzI9smHtLbvjN3CEx0FW0-YU3zlM",
    authDomain: "mintyfiesta.firebaseapp.com",
    databaseURL: "https://mintyfiesta-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mintyfiesta",
    storageBucket: "mintyfiesta.appspot.com",
    messagingSenderId: "286902051464",
    appId: "1:286902051464:web:ed03e71a91721d848cf53d",
    measurementId: "G-J44V58NLLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, collection, addDoc };

// Function to get password by email
export async function getPwdByMail(mail) {
    try {
        const dbRef = ref(db, 'admins');
        const snapshot = await get(dbRef);
        const admins = snapshot.val();
        let admin = null;

        for (let key in admins) {
            if (admins[key].mail === mail) {
                admin = admins[key];
                break;
            }
        }
        if (admin) {
            return admin.password;
        } else {
            throw new Error(`No admin found with mail: ${mail}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getAdminEventsByMail(mail) {
    try {
        const dbRef = ref(db, 'admins');
        const snapshot = await get(dbRef);
        const admins = snapshot.val();
        let admin = null;

        for (let key in admins) {
            if (admins[key].mail === mail) {
                admin = admins[key];
                break;
            }
        }

        if (admin) {
            return admin.events;
        } else {
            throw new Error(`No admin found with mail: ${mail}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getEventByName(eventName) {
    try {
        const db = getDatabase();
        const eventsRef = query(ref(db, 'events'), orderByChild('infos/nom'), equalTo(eventName));
        const snapshot = await get(eventsRef);
        const eventData = snapshot.val();
        
        if (eventData) {
            // On retourne la première clé trouvée (en supposant que les noms d'événements sont uniques)
            const eventId = Object.keys(eventData)[0];
            return eventData[eventId];
// Function to get event by ID
export async function getEventById(id) {
    try {
        const eventRef = ref(db, `events/${id}`);
        const snapshot = await get(eventRef);
        const event = snapshot.val();
        if (event) {
            return event;
        } else {
            throw new Error(`No event found with name: ${eventName}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to get participant by email
export async function getParticipantByMail(mail, idEvent) {
    try {
        const participantsRef = ref(db, 'participants');
        const participantsSnapshot = await get(participantsRef);
        const participants = participantsSnapshot.val();

        let participant = null;
        let isInEvent = false;

        for (const key in participants) {
            if (participants[key].mail === mail) {
                participant = participants[key];
                break;
            }
        }

        if (!participant) {
            throw new Error(`Participant not found with email: ${mail}`);
        }

        const eventRef = ref(db, `events/${idEvent}/participants`);
        const eventSnapshot = await get(eventRef);
        const eventParticipants = eventSnapshot.val();

        if (eventParticipants && Object.values(eventParticipants).includes(participant.mail)) {
            isInEvent = true;
        }

        if (isInEvent) {
            return participant;
        } else {
            throw new Error(`Participant with email ${mail} is not part of event ${idEvent}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to get participant by wallet address
export async function getParticipantByWallet(wallet) {
    try {
        const participantsRef = query(ref(db, 'participants'), orderByChild('address'), equalTo(wallet));
        const snapshot = await get(participantsRef);
        const participants = snapshot.val();
        if (participants) {
            let participantKey = Object.keys(participants)[0];
            return participants[participantKey];
        } else {
            throw new Error('Participant not found');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to get all sponsors by event ID
export async function getAllSponsorsByEvent(event_id) {
    try {
        const sponsorsRef = query(ref(db, 'sponsors'), orderByChild('id_event'), equalTo(event_id));
        const snapshot = await get(sponsorsRef);
        const sponsors = snapshot.val();
        if (sponsors) {
            return Object.values(sponsors);
        } else {
            return [];
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to get sponsor by ID
export async function getSponsorById(id) {
    try {
        const sponsorRef = ref(db, `sponsors/${id}`);
        const snapshot = await get(sponsorRef);
        const sponsor = snapshot.val();
        if (sponsor) {
            return sponsor;
        } else {
            throw new Error(`No sponsor found with id: ${id}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to get contenue by ID
export async function getContenueById(id) {
    try {
        const contenueRef = ref(db, `contenus/${id}`);
        const snapshot = await get(contenueRef);
        return snapshot.val();
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to get NFT by ID
export async function getNftById(id) {
    try {
        const nftRef = ref(db, `nfts/${id}`);
        const snapshot = await get(nftRef);
        const nft = snapshot.val();
        if (nft) {
            return nft;
        } else {
            throw new Error(`No NFT found with id: ${id}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to get encheres by ID
export async function getEncheresById(id) {
    try {
        const enchRef = ref(db, `encheres/${id}`);
        const snapshot = await get(enchRef);
        const ench = snapshot.val();
        if (ench) {
            return ench;
        } else {
            throw new Error(`No bid found with id: ${id}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

// SETTERS

// Function to add a user to an event
export async function addUserOnEvent(eventId, mail) {
    try {
        const participantRef = push(ref(db, 'participants'));
        const participantId = participantRef.key;
        const code = SHA256(mail).toString();

        await set(participantRef, {
            code: code,
            mail: mail,
            nfts: [],
            id_event: eventId,
            address: ""
        });

        const eventParticipantsRef = ref(db, `events/${eventId}/participants`);
        await update(eventParticipantsRef, {
            [participantId]: mail
        });

        console.log(`Participant ${mail} added to event ${eventId}`);
    } catch (error) {
        console.error("Error adding participant to event:", error);
    }
}

// Function to set wallet by participant email
export async function setWalletByParticipantMail(mail, wallet) {
    try {
        const participant = await getParticipantByMail(mail);
        const participantKey = Object.keys(participant)[0];
        await update(ref(db, `participants/${participantKey}`), { address: wallet });
        return { success: true, message: 'Wallet updated successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
}