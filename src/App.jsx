import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import useAuthStore from "./store/authStore";
import { auth } from "./firebase/firebase";

function App() {
   const authUser = useAuthStore(auth);
   return (
      <PageLayout>
         <Routes>
            <Route
               path="/"
               element={authUser ? <HomePage /> : <Navigate to="/auth" />}
            />
            <Route
               path="/auth"
               element={!authUser ? <AuthPage /> : <Navigate to="/" />}
            />
            <Route path="/:username" element={<ProfilePage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
         </Routes>
      </PageLayout>
   );
}

export default App;
