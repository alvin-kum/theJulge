import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function withAuth<P extends React.JSX.IntrinsicAttributes>(
  Comp: React.ComponentType<P>
) {
  return function Wrapped(props: P) {
    const router = useRouter();
    const [ok, setOk] = useState(false);

    useEffect(() => {
      const t =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!t) router.replace("/login");
      else setOk(true);
    }, [router]);

    if (!ok) return null;

    return <Comp {...props} />;
  };
}