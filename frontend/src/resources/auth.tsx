import { useSelector } from "@/redux/store";

type AuthContextProps = {
  token: string;
};

export var authContext = {
  token: "",
};

export function obterAutenticacao(): void {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  authContext = useSelector((state: any) => state.auth);
}

export function getAuth(hook?: boolean): AuthContextProps {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (hook) {
    obterAutenticacao();
    // eslint-disable-next-line react-hooks/rules-of-hooks
  }
  return authContext;
}
