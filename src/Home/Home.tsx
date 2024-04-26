import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { FC } from "react";
import { client } from "../client";
import { LoginView } from "../LoginView";
import { DisplayAuthenticatedUserView } from "../DisplayAuthenticatedUserView";

export const Home: FC = () => {
  const { auth } = useReactiveClient(client);

  if (auth.token) {
    return <DisplayAuthenticatedUserView />;
  }

  return <LoginView />;
};
