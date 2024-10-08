import React, { useEffect } from "react";
import {
   Navigate,
   Route,
   Routes,
   useLocation,
   useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { Center, Spinner } from "@chakra-ui/react";
import { SearchProvider } from "./store/searchContext";
import ForgotPassword from "./components/AuthForm/ForgotPassword";
import { LandingPage } from "./pages/LandingPage/LandingPage";

function App() {
   const [authUser, loading] = useAuthState(auth);
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      if (!loading) {
         if (isFirstVisit() && authUser === null) {
            if (location.pathname !== "/welcome") {
               navigate("/welcome");
            }
            setHasVisited();
         }
      }
   }, [loading, authUser, navigate, location]);

   if (loading) {
      return (
         <Center h="100vh">
            <Spinner size="xl" />
         </Center>
      );
   }

   if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
         for (let registration of registrations) {
            registration.update();
         }
      });
   }

   return (
      <SearchProvider>
         <PageLayout>
            <Routes>
               <Route path="/forgot-password" element={<ForgotPassword />} />
               <Route path="/auth" element={<AuthPage />} />
               <Route path="/" element={<HomePage />} />
               <Route path="/:username" element={<ProfilePage />} />
               <Route path="/welcome" element={<LandingPage />} />
            </Routes>
         </PageLayout>
      </SearchProvider>
   );
}

export default App;

const isFirstVisit = () => {
   return !localStorage.getItem("hasVisited");
};

const setHasVisited = () => {
   localStorage.setItem("hasVisited", "true");
};
