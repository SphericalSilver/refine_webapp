import { useGetIdentity, useOne } from "@pankod/refine-core";
import React from "react";

import { Profile } from "components";

const MyProfile = () => {
  const { data: user } = useGetIdentity();

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: user?.userid,
  });

  console.log(user);

  const myProfile = data?.data ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <Profile
      type="My"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    ></Profile>
  );
};

export default MyProfile;
