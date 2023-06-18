import { Route, Routes } from "react-router-dom";
import { Main } from "../../pages/Main/Main";
import { Login } from "../../pages/Login/Login";
import { NotFound } from "../../pages/NotFound/NotFound";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

export const AppRoutes = ({user, id, setId, apiToken, setApiToken}) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setId={setId} setApiToken={setApiToken}/>} />
      <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
        <Route path="/" element={<Main id={id}
              setId={setId}
              apiToken={apiToken}
              setApiToken={setApiToken}/>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
