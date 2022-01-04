import { useAppSelector } from "app-store";
import { Contact } from "models/Clubs";
import { User } from "models/User";

const useSession = () => {
  const session = useAppSelector((state) => state.session);
  return { user: User.Load(session), contact: new Contact(session.contact), flags: session.flags };
};

export default useSession;
