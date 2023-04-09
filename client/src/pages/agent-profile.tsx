import { useOne } from "@pankod/refine-core";
import { useParams } from "@pankod/refine-react-router-v6";
import React from "react";

import { Profile } from "components";

const AgentProfile = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });

  //console.log(user);

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

export default AgentProfile;
