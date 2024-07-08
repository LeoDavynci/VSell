import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast"
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { useState } from "react";

const useLogin = () => {
    const showToast = useShowToast();
    const [signInWithEmailAndPassword, , loading, authError] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login);
    const [firestoreLoading, setFirestoreLoading] = useState(false);
    
    const login = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            showToast("Error", "Please fill all the fields", "error");
            return;
        }
        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

            if (userCred) {
                setFirestoreLoading(true);
                if (!userCred.user.emailVerified) {
                    showToast("Error", "Please verify your email before logging in.", "error");
                    await auth.signOut();
                    setFirestoreLoading(false);
                    return;
                }

                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    showToast("Error", "User data not found", "error");
                    await auth.signOut();
                    setFirestoreLoading(false);
                    return;
                }

                const userData = docSnap.data();
                
                if (userCred.user.emailVerified && !userData.emailVerified) {
                    await updateDoc(docRef, { emailVerified: true });
                    userData.emailVerified = true;
                }

                localStorage.setItem("user-info", JSON.stringify(userData));
                loginUser(userData);
                showToast("Success", "Logged in successfully", "success");
            }
        } catch (err) {
            showToast("Error", err.message, "error");
        } finally {
            setFirestoreLoading(false);
        }
    };

    return { 
        loading: loading || firestoreLoading, 
        error: authError, 
        login 
    };
};

export default useLogin;