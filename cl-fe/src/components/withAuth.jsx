import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function withAuth(Component) {
  return function AuthWrapper(props) {
    const { user } = useContext(UserContext);
    return <Component {...props} user={user} />;
  };
}
