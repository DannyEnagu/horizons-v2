import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { getExistingUserOrCreateNewUser } from "@/server/actions/user.action";

function useUser() {
  const [user, setUser] = useState<User | undefined>(undefined);


  useEffect(() => {
    async function fetchUser() {
      const { isUserAuthenticated, user } = await getExistingUserOrCreateNewUser();
      if (isUserAuthenticated) {
        setUser(user);
      }
    }

    fetchUser();
  }, []);

  return {isAuthenticated: !!user, user};
}

export default useUser;