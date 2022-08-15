

export const getEnvironmets = () => {

    // import.meta.env;

    return {
        VITE_FIREBASE_apiKey: import.meta.env.VITE_FIREBASE_apiKey,
        VITE_FIREBASE_authDomain: import.meta.env.VITE_FIREBASE_authDomain,
        VITE_FIREBASE_projectId: import.meta.env.VITE_FIREBASE_projectId,
        VITE_FIREBASE_storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
        VITE_FIREBASE_messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
        VITE_FIREBASE_appId: import.meta.env.VITE_FIREBASE_appId,
        VITE_FIREBASE_measurementId: import.meta.env.VITE_FIREBASE_measurementId,
    }
} 