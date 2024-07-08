import Compressor from "compressorjs";
import Resizer from "react-image-file-resizer";

export const handleImageChange = (event, selectedFiles, setSelectedFiles, showToast) => {
   const files = Array.from(event.target.files);
   if (files.length + selectedFiles.length > 4) {
      showToast("Error", "You can only upload up to 4 images", "error");
      return;
   }

   files.forEach((file) => {
      Resizer.imageFileResizer(
         file,
         800, // max width
         800, // max height
         "JPEG", // output format
         80, // quality
         0, // rotation
         (uri) => {
            const blob = dataURLtoBlob(uri);
            new Compressor(blob, {
               quality: 0.8, // quality of the compressed image
               success: (compressedResult) => {
                  const compressedFile = new File(
                     [compressedResult],
                     file.name,
                     { type: compressedResult.type }
                  );
                  const fileReader = new FileReader();
                  fileReader.onload = () => {
                     setSelectedFiles((prev) => [
                        ...prev,
                        fileReader.result,
                     ]);
                  };
                  fileReader.readAsDataURL(compressedFile);
               },
            });
         },
         "base64" // output type
      );
   });
};

export const dataURLtoBlob = (dataurl) => {
   const arr = dataurl.split(",");
   const mime = arr[0].match(/:(.*?);/)[1];
   const bstr = atob(arr[1]);
   let n = bstr.length;
   const u8arr = new Uint8Array(n);
   while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
   }
   return new Blob([u8arr], { type: mime });
};