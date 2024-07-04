import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import usePostStore from '../store/postStore';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import useUserProfileStore from '../store/userProfileStore';

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const authUser = useAuthStore();
    const showToast = useShowToast();
    const { setUserProfile } = useUserProfileStore();

    useEffect(() => {
        const getFeedPosts = async () => {
            setIsLoading(true);
            const q = query(collection(firestore, "posts"));

            try {
                const querySnapshot = await getDocs(q);
                const feedPosts = [];

                querySnapshot.forEach(doc => {
                    feedPosts.push({ id: doc.id, ...doc.data() });
                });

                feedPosts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(feedPosts);

            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        if (authUser) getFeedPosts();
    }, [authUser, showToast, setPosts, setUserProfile]);

    return { isLoading, posts };
};

export default useGetFeedPosts;
