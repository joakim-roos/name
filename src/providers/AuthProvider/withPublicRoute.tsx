"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { useUser } from "~/providers/AuthProvider/AuthProvider";

export const withPublicRoute = <T extends object>(
  WrappedComponent: React.FunctionComponent<T>,
) => {
  const ComponentwithPublicRoute = (props: T) => {
    const router = useRouter();
    const { isLoading, user } = useUser();
    const isUserDataLoaded = !isLoading;

    useEffect(() => {
      if (user && isUserDataLoaded) {
        router.push("/dashboard");
      }
    }, [user, isUserDataLoaded, router]);

    if (user ?? !isUserDataLoaded) return <p>Loading...</p>;

    return <WrappedComponent {...props} />;
  };

  return ComponentwithPublicRoute;
};
