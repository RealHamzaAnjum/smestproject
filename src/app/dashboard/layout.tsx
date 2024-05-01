"use client";

import type { Metadata } from "next";
import { GetUserData, auth } from "@/utils/firebase";
import { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import LoadingIndicator from "@/components/LoadingIndicator";
import { onAuthStateChanged } from "firebase/auth";
import Header from "@/components/Dashboard/Header";
import SideBar from "@/components/Dashboard/SideBar";
import toast from "react-hot-toast";

export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [fetchingUserData, setFetchingUserData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        GetUserData(user.uid)
          .then((res) => {
            if (res.userData?.userRole !== "admin") {
              setIsAdmin(false);
              router.push("/");
              toast.error("You are not an admin user!");
            } else {
              setIsAdmin(true);
            }
            setFetchingUserData(false);
            setUser(res.userData);
          })
          .catch((error) => {
            setUser(null);
            router.push("/login");
          });
      } else {
        setUser(null);
        router.push("/login");
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, isAdmin: isAdmin }}>
      {fetchingUserData ? (
        <main className="h-[80vh] w-full flex justify-center items-center">
          <LoadingIndicator
            showText={false}
            text=""
            loaderClassNames="w-14 h-14 border-t-black dark:border-t-white"
          />
        </main>
      ) : isAdmin ? (
        <main>
          <Header userData={user} />
          <section className="grid grid-cols-12 gap-x-5">
            <SideBar />
            <section className="col-span-10 pt-20">{children}</section>
          </section>
        </main>
      ) : (
        <main className="flex justify-center items-center w-full h-screen">
          <p>Not An Admin User</p>
        </main>
      )}
    </AuthContext.Provider>
  );
}
