"use client";

import { Employer, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { getExistingUserOrCreateNewUser } from "@/server/actions/user.action";
import { getEmployerByUserId } from "@/server/actions/employer.action";

interface UserHook  extends User {
  isAuthenticated: boolean;
  employer: Employer | null;
}


function useUser() {
  const [user, setUser] = useState<UserHook | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const { user: dbUser } = await getExistingUserOrCreateNewUser();
      const employer = await getEmployerByUserId(dbUser?.id);
      if (dbUser) {
        setUser({
          ...dbUser,
          isAuthenticated: true,
          employer
        });
      }
      setLoading(false);
    }

    fetchUser();
  }, []);

  return { user, loading };
}

export default useUser;