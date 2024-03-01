import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    //removing user from storage
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
