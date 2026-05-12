import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "../../features/auth/pages/Login";
import Signup from "../../features/auth/pages/Signup";
import Home from "../../features/Home/pages/Home";
import Layout from "../layout/Layout";
import NotFound from "../../features/Home/pages/NotFound";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);
