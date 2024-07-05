import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

const useEditProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

	const showToast = useShowToast();

	const editProfile = async (inputs, selectedFile) => {
		if (isUpdating || !authUser) {
            showToast("Error", "User is not authenticated", "error");
            return;
        }
		setIsUpdating(true);

		const storageRef = ref(storage, `profilePics/${authUser.uid}`);
		const userDocRef = doc(firestore, "users", authUser.uid);

		try {
			let URL = authUser.profilePicURL;
			if (selectedFile) {
				await uploadString(storageRef, selectedFile, "data_url");
				URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
			}

			const userDoc = await getDoc(userDocRef);
			if (!userDoc.exists()) {
				throw new Error("User does not exist");
			}
			const userData = userDoc.data();

			const updatedUser = {
				...userData,
				fullName: inputs.fullName || authUser.fullName,
				username: inputs.username || authUser.username,
				profilePicURL: URL,

			};
			console.log("Updated User Data: ", updatedUser)

			await updateDoc(userDocRef, updatedUser);
			localStorage.setItem("user-info", JSON.stringify(updatedUser));
			setAuthUser(updatedUser);
			setUserProfile(updatedUser);
			showToast("Success", "Profile updated successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
            setIsUpdating(false);
        }
	};

	return { editProfile, isUpdating };
};

export default useEditProfile;