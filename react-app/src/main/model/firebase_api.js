// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, query, orderByChild, equalTo, set, update, push } from "firebase/database";
import { SHA256 } from "crypto-js";

// Your web app's Firebase configuration
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

// GETTERS

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
        } else {
            throw new Error(`No event found with name: ${eventName}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getCatById(id) {
    try {
        const catRef = ref(db, `categories/${id}`);
        const snapshot = await get(catRef);
        const cat = snapshot.val();
        if (cat) {
            return cat;
        } else {
            throw new Error(`No category found with id: ${id}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getParticipantByMail(mail, idEvent) {
    try {
        // Récupérer tous les participants
        const participantsRef = ref(db, 'participants');
        const participantsSnapshot = await get(participantsRef);
        const participants = participantsSnapshot.val();

        let participant = null;
        let isInEvent = false;

        // Recherche du participant par email
        for (const key in participants) {
            if (participants[key].mail === mail) {
                participant = participants[key];
                break;
            }
        }

        // Vérifier s'il existe un participant avec cet email
        if (!participant) {
            throw new Error(`Participant not found with email: ${mail}`);
        }

        // Vérifier s'il participe à l'événement spécifié
        const eventRef = ref(db, `events/${idEvent}/participants`);
        const eventSnapshot = await get(eventRef);
        const eventParticipants = eventSnapshot.val();

        if (eventParticipants && eventParticipants.includes(participant.id)) {
            isInEvent = true;
        }

        // Si le participant est dans l'événement, le retourner
        if (isInEvent) {
            return participant;
        } else {
            throw new Error(`Participant with email ${mail} is not part of event ${idEvent}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getParticipantByWallet(wallet) {
    try {
        const participantsRef = query(ref(db, 'participants'), orderByChild('wallet'), equalTo(wallet));
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

export async function getAllSponsorsByEvent(event_id) {
    try {
        const sponsorsRef = query(ref(db, 'sponsors'), orderByChild('event_id'), equalTo(event_id));
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

export async function getContenueById(id) {
    try {
        const contenueRef = ref(db, `contenues/${id}`);
        const snapshot = await get(contenueRef);
        return snapshot.val();
    } catch (error) {
        throw new Error(error.message);
    }
}

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

export async function addUserOnEvent(eventId, mail) {
    try {
        // Générer un identifiant unique pour le participant
        const participantRef = push(ref(db, 'participants'));
        const participantId = participantRef.key;

        // Générer le code basé sur le hash de l'email
        const code = SHA256(mail).toString();

        // Ajouter le participant dans la table participants
        await set(participantRef, {
            code: code,
            mail: mail,
            signature: "",
            wallet: ""
        });

        // Ajouter l'ID du participant à la liste des participants de l'événement
        const eventParticipantsRef = ref(db, `events/${eventId}/participants`);
        await update(eventParticipantsRef, {
            [participantId]: true
        });

        console.log(`Participant ${mail} added to event ${eventId}`);
    } catch (error) {
        console.error("Error adding participant to event:", error);
    }
}

export async function setWalletByParticipantMail(mail, wallet) {
    try {
        const participant = await getParticipantByMail(mail);
        const participantKey = Object.keys(participant)[0];
        await update(ref(db, `participants/${participantKey}`), { wallet: wallet });
        return { success: true, message: 'Wallet updated successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
}
