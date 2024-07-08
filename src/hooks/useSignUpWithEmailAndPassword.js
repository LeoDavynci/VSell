import { useCreateUserWithEmailAndPassword, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';

const useSignUpWithEmailAndPassword = () => {
    const [
        createUserWithEmailAndPassword,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification, sending, verificationError] = useSendEmailVerification(auth);
    const showToast = useShowToast()
    const loginUser = useAuthStore(state => state.login);

    const signup = async (inputs) => {
        // ... (existing validation code)

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if (!newUser && error) {
                showToast("Error", error.message, "error")
                return  
            }
            if (newUser) {
                // Send verification email
                await sendEmailVerification(newUser.user);

                const userDoc = {
                    uid: newUser.user.uid,
                    fullName: inputs.fullName,
                    username: inputs.username,
                    email: inputs.email,
                    profilePicURL: "",
                    posts: [],
                    createdAt: Date.now(),
                    emailVerified: false
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                showToast("Success", "Account created successfully. Please check your email to verify your account.", "success");
            }
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }
        
    return { loading, error, signup }
};

export default useSignUpWithEmailAndPassword;