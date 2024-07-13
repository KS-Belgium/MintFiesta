import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat";
import "firebase/database";
import { SHA256 } from "crypto-js";

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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // si Firebase est déjà initialisé, réutilisation de l'instance existante
}

const db = firebase.database();

// GETTERS

export async function getPwdByMail(mail) {
    try {
        let snapshot = await db.ref(`admins/${mail}`).once('value');
        let admin = snapshot.val();
        if (admin) {
            return admin.password;
        } else {
            throw new Error(`No admin found with mail: ${mail}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getEventById(id) {
    try {
        let snapshot = await db.ref(`events/${id}`).once('value');
        let event = snapshot.val();
        if (event) {
            return event;
        } else {
            throw new Error(`No event found with id: ${id}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getCatById(id) {
    try {
        let snapshot = await db.ref(`categories/${id}`).once('value');
        let cat = snapshot.val();
        if (cat) {
            return cat;
        } else {
            throw new Error(`No category found with id: ${id}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getParticipantByMail(mail) {
    try {
        let snapshot = await db.ref('participants').orderByChild('mail').equalTo(mail).once('value');
        let participants = snapshot.val();
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

export async function getParticipantByWallet(wallet) {
    try {
        let snapshot = await db.ref('participants').orderByChild('wallet').equalTo(wallet).once('value');
        let participants = snapshot.val();
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
        let snapshot = await db.ref('sponsors').orderByChild('event_id').equalTo(event_id).once('value');
        let sponsors = snapshot.val();
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
        let snapshot = await db.ref(`sponsors/${id}`).once('value');
        let spon = snapshot.val();
        if (spon) {
            return spon;
        } else {
            throw new Error(`No sponsor found with id: ${id}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getContenueById(id) {
    try {
        let snapshot = await db.ref(`contenues/${id}`).once('value');
        return snapshot.val();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getNftById(id) {
    try {
        let snapshot = await db.ref(`nfts/${id}`).once('value');
        let nft = snapshot.val();
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
        let snapshot = await db.ref(`encheres/${id}`).once('value');
        let ench = snapshot.val();
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

export async function addUserOnEvent(eventId, mail){
    try {
        // Générer un identifiant unique pour le participant
        let participantRef = db.ref('participants').push();
        let participantId = participantRef.key;

        // Générer le code basé sur le hash de l'email
        let code = SHA256(mail).toString();

        // Ajouter le participant dans la table participants
        await participantRef.set({
            code: code,
            mail: mail,
            signature: "",
            wallet: ""
        });

        // Ajouter l'ID du participant à la liste des participants de l'événement
        let eventParticipantsRef = db.ref(`events/${eventId}/participants`);
        await eventParticipantsRef.update({
            [participantId]: true
        });

        console.log(`Participant ${mail} added to event ${eventId}`);
    } catch (error) {
        console.error("Error adding participant to event:", error);
    }
}

export async function setWalletByParticipantMail(mail, wallet) {
    try {
        let participant = await getParticipantByMail(mail);
        let participantKey = Object.keys(participant)[0];
        await db.ref(`participants/${participantKey}`).update({ wallet: wallet });
        return { success: true, message: 'Wallet updated successfully' };
        
    } catch (error) {
        throw new Error(error.message);
    }
}
