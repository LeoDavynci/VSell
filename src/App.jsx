import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { Center, Spinner } from "@chakra-ui/react";

function App() {
   const [authUser, loading] = useAuthState(auth);

   if (loading) {
      return (
         <Center h="100vh">
            <Spinner size="xl" />
         </Center>
      );
   }

   return (
      <PageLayout>
         <Routes>
            <Route
               path="/auth"
               element={!authUser ? <AuthPage /> : <Navigate to="/" />}
            />
            <Route
               path="/"
               element={authUser ? <HomePage /> : <Navigate to="/auth" />}
            />
            <Route path="/:username" element={<ProfilePage />} />
         </Routes>
      </PageLayout>
   );
}

export default App;
