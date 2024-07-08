import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast"
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useLogin = () => {
    const showToast = useShowToast()
    const [
        signInWithEmailAndPassword,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login)
    
    const login = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            return showToast("Error", "Please fill all the fields", "error")
        }
        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)

            if (userCred) {
                if (!userCred.user.emailVerified) {
                    showToast("Error", "Please verify your email before logging in.", "error");
                    await auth.signOut();
                    return;
                }

                const docRef = doc(firestore, "users", userCred.user.uid)
                const docSnap = await getDoc(docRef)
                const userData = docSnap.data();
                
                if (!userData.emailVerified) {
                    // Update the user's emailVerified status in Firestore
                    await updateDoc(docRef, { emailVerified: true });
                    userData.emailVerified = true;
                }

                localStorage.setItem("user-info", JSON.stringify(userData))
                loginUser(userData)
                showToast("Success", "Logged in successfully", "success");
            }
        } catch (err) {
            showToast("error", err.message, "error")
        }
    }

    return {loading, error, login}
}

export default useLogin