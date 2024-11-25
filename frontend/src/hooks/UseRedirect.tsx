
import { useLocation } from "react-router-dom";

export const useRedirect = (defaultPath: string = "/") => {
  const location = useLocation();
  const redirectPath = (location.state as { from?: { pathname: string } })?.from?.pathname || defaultPath;
  return redirectPath;
};
