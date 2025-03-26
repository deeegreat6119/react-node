import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Home";
import Signin from "./Signin";
import Profile from "./Profile";
import AuthGuard from "./AuthGuard";
import Chat from "./Chat";

const App = () => {
  return (
    <div className="profile-box">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="Signin" element={<Signin />} />
          <Route path="chat" element={<Chat />} />
          <Route
            path="profile"
            element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
