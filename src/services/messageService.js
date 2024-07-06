import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";

const db = getFirestore();

export const createMessage = async (type, amount, postId, receiverId) => {
  try {
    await addDoc(collection(db, "messages"), {
      senderId: authUser.uid,
      receiverId: receiverId,
      postId: postId,
      type: type,
      amount: amount,
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    });
    console.log("Message created successfully");
  } catch (error) {
    console.error("Error creating message: ", error);
  }
};