import { useEffect, useState } from "react";
import { getLoggedInUser, logOutUser } from "../../data/user.data";
import { NavigateFunction, useNavigate } from "react-router-dom";
type ProfileType = {
  className?: string;
};

const Profile = (props: ProfileType) => {
  const navigate: NavigateFunction = useNavigate();

  const [firstName, setFirstName] = useState<string | undefined>("");

  useEffect(() => {
    const handleFirstName = async () => {
      const loggedInUser = await getLoggedInUser();

      if (!loggedInUser?.name) return;
      let nameArray: string[] | undefined = loggedInUser?.name.split(" ");
      if (!nameArray) return;

      setFirstName(nameArray[0]);
    };

    handleFirstName();
  }, []);

  const handleLogOutUser = async () => {
    await logOutUser(navigate);
  };

  return (
    <div className={`${props.className} flex gap-x-10`}>
      <div className="flex flex-col items-end gap-y-3 max-lg:items-start">
        <p className="text-20 font-medium">Hello, {firstName}!</p>
        <a
          onClick={handleLogOutUser}
          className="cursor-pointer underline font-20 text-gray-1"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default Profile;
