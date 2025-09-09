import { useRouter } from "next/router";
import { useEffect, useState } from "react";
<<<<<<< HEAD

export function withAuth<P>(Comp: React.ComponentType<P>) {
  return function Wrapped(props: P) {
    const router = useRouter();
    const [ok, setOk] = useState(false);
=======
import React from "react";

export function withAuth<P extends object>(Comp: React.ComponentType<P>) {
  return function Wrapped(props: P) {
    const router = useRouter();
    const [ok, setOk] = useState(false);

>>>>>>> JHY
    useEffect(() => {
      const t =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!t) router.replace("/login");
      else setOk(true);
    }, [router]);
<<<<<<< HEAD
    if (!ok) return null;
=======

    if (!ok) return null;

>>>>>>> JHY
    return <Comp {...props} />;
  };
}
