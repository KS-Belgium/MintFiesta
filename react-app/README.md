# User Manual

## Database Installation

If you already have an online Firebase database connection, you can skip this step.

### Setting Up Firebase Realtime Database

If you do not have a Firebase Realtime Database set up yet, follow these steps:

1. **Create a Realtime Database on Firebase:**
   - Go to Firebase and create a new Realtime Database.

2. **Import JSON File:**
   - Import the JSON file located at `react-app/public/MintyFiesta_database_export.json` into your newly created Firebase Realtime Database.

3. **Configure Project Settings:**
   - Navigate to "Project Overview" and then to "Project Settings" in Firebase.
   - Under the "General" tab, scroll down to your apps and copy the `firebaseConfig` object:
     ```javascript
     const firebaseConfig = {
         apiKey: "",
         authDomain: "",
         databaseURL: "",
         projectId: "",
         storageBucket: "",
         messagingSenderId: "",
         appId: "",
         measurementId: ""
     };
     ```
   - Replace the current `firebaseConfig` in the file `react-app/src/model/firebase_api.json` with this copied configuration.

## dApp Explanation

### User Section
By scanning the QR code (the test QR codes can be found in public/qrToCode.jpg) of the event or a sponsor for the first time, you can enter your email and the unique code received to validate that you are a participant in this event. A test account is pre-configured in the template database with the following credentials:
- Email: participant1@mail.com
- Password: test

After validation, you can connect your wallet. Your next login can be done with it. Note that you must be logged in to access internal event pages. On the event or sponsor page, you are free to retrieve free NFTs, bid on exclusives, etc. A QR code scanner is integrated on each page. You also have your profile tab to view all event NFTs and determine which ones you need to complete your collection 😉

You can also share your progress and acquired NFTs on social networks like Farcaster (not yet implemented).
### Organizer Section

Upon visiting the main URL, you will have the option to either create an account (not yet implemented) or log in to an existing account in the template database. A test account is pre-configured with the following credentials:
- Email: admin1@mail.com
- Password: test

Once logged in, you can view and modify the test event, including adding NFTs, sponsors, and participants, or create a new event (not yet implemented).

