import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import CreatePostButton from "./CreatePostButton";
import CreatePostModal from "./CreatePostModal";
import useCreatePostForm from "../../hooks/useCreatePostForm";
import useCreatePost from "../../hooks/useCreatePost";
import useShowToast from "../../hooks/useShowToast";

const CreatePost = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const formProps = useCreatePostForm();
   const { isLoading, handleCreatePost } = useCreatePost();
   const showToast = useShowToast();
   const [formState, setFormState] = useState({
      itemName: "",
      price: "",
      isOBO: false,
      pickupLocation: "",
      caption: "",
      itemQuality: "",
      category: "",
      selectedFiles: [],
   });

   const handleInputChange = (field, value) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
   };

   const handlePostCreation = async () => {
      try {
         await handleCreatePost(formProps.formState);
         onClose();
         formProps.resetForm();
      } catch (error) {
         showToast("Error", error.message, "error");
      }
   };

   return (
      <>
         <CreatePostButton onOpen={onOpen} />
         <CreatePostModal
            isOpen={isOpen}
            onClose={onClose}
            {...formProps}
            isLoading={isLoading}
            handlePostCreation={handlePostCreation}
            formState={formState}
            handleInputChange={handleInputChange}
         />
      </>
   );
};

export default CreatePost;
