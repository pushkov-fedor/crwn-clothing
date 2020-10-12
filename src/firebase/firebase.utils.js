import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
    apiKey: "AIzaSyA5Cz9CyZRNdQEmIfC0nEsUNnTafvpk37s",
    authDomain: "crwn-db-ffe41.firebaseapp.com",
    databaseURL: "https://crwn-db-ffe41.firebaseio.com",
    projectId: "crwn-db-ffe41",
    storageBucket: "crwn-db-ffe41.appspot.com",
    messagingSenderId: "317549102829",
    appId: "1:317549102829:web:faca3a3c89c5e82b6aeee4"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    
    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName, 
                email, 
                createdAt, 
                ...additionalData
            })
        } catch (err) {
            console.log('error creating user', err.message)
        }
    }

    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase