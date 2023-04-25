import Chat from "../components/chat/chat";
import Login from "../components/login/login";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/constants";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Login />
    }
]

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        Component: <Chat />
    }
]