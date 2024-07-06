import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";

const db = getFirestore();

export const createMessage = async (
    sellerId,
    buyerId,
    postId,
    type,
    item,
    price,
    buyerName,
    info
) => {
  try {
    await addDoc(collection(db, "messages"), {
      senderId: buyerId,
      receiverId: sellerId,
      postId: postId,
      type: type,
      item: item,
      price: price,
      buyer: buyerName,
      info: info,
      status: "unread", 
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    });
    console.log("Message created successfully");
  } catch (error) {
    console.error("Error creating message: ", error);
  }
};