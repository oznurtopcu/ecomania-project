import { useSelector } from "react-redux";
import md5 from "md5";

export default function UserMenu() {
  //TODO: Gravatar yapısına tekrar bak, nasıl çalıştığını anla
  const { user } = useSelector((state) => state.client);

  if (!user || !user.email) return null;

  const hash = md5(user.email.toLowerCase().trim());
  const mail = `https://www.gravatar.com/avatar/${hash}?d=mp`;

  return (
    <div className="flex items-center gap-3">
      <img src={mail} alt="User avatar" className="w-8 h-8 rounded-full" />
      <span className="text-sm font-medium">{user.name}</span>
    </div>
  );
}
