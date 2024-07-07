import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";

const db = getFirestore();

export const createMessage = async (
    sellerId,
    buyerId,
    postId,
    type,
    item,
    price,
    sellerName,
    buyerName,
    info
) => {
  try {
    await addDoc(collection(db, "messages"), {
      receiverId: sellerId,
      senderId: buyerId,
      postId: postId,
      type: type,
      item: item,
      price: price,
      seller: sellerName,
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