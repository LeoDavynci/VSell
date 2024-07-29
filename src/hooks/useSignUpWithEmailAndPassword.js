import { useNavigate } from "react-router-dom";
import {
   useCreateUserWithEmailAndPassword,
   useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import {
   collection,
   doc,
   getDocs,
   query,
   setDoc,
   where,
} from "firebase/firestore";
import useShowToast from "./useShowToast";

const useSignUpWithEmailAndPassword = () => {
   const navigate = useNavigate();
   const [createUserWithEmailAndPassword, user, loading, error] =
      useCreateUserWithEmailAndPassword(auth);
   const [sendEmailVerification, sending, verificationError] =
      useSendEmailVerification(auth);
   const showToast = useShowToast();

   const signup = async (inputs) => {
      if (
         !inputs.email ||
         !inputs.password ||
         !inputs.username ||
         !inputs.fullName
      ) {
         showToast("Error", "Please fill all the fields", "error");
         return;
      }

      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("username", "==", inputs.username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
         showToast("Error", "Username already exists", "error");
         return;
      }

      try {
         const newUser = await createUserWithEmailAndPassword(
            inputs.email,
            inputs.password
         );
         if (!newUser && error) {
            showToast("Error", error.message, "error");
            return;
         }
         if (newUser) {
            const userDoc = {
               uid: newUser.user.uid,
               email: inputs.email,
               username: inputs.username,
               fullName: inputs.fullName,
               profilePicURL: "",
               posts: [],
               createdAt: Date.now(),
               emailVerified: false,
               rating: "",
               reviews: [],
            };
            await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

            // Send verification email
            const success = await sendEmailVerification();
            if (success) {
               showToast(
                  "Success",
                  "Verification email sent. Please check your inbox and verify your email before logging in.",
                  "success"
               );
            } else {
               showToast(
                  "Error",
                  "Could not send verification email. Please try again later.",
                  "error"
               );
            }

            // Sign out the user
            await auth.signOut();

            // Redirect to the login page
            navigate("/auth");
         }
      } catch (error) {
         showToast("Error", error.message, "error");
      }
   };

   return {
      loading: loading || sending,
      error: error || verificationError,
      signup,
   };
};

export default useSignUpWithEmailAndPassword;
