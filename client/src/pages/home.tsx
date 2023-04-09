import React from "react";
import { useList } from "@pankod/refine-core";
import { Typography, Box, Stack } from "@pankod/refine-mui";

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent,
} from "components";

const Home = () => {
  // Using useList to fetch data.
  const { data, isLoading, isError } = useList({
    resource: "properties",
    config: { pagination: { pageSize: 4 } },
  });
  const latestProperties = data?.data ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D"></Typography>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for Sale"
          value={684}
          series={[75, 25]}
          colors={["#472be8", "#c4e8ef"]}
        ></PieChart>
        <PieChart
          title="Properties for Sale"
          value={550}
          series={[60, 40]}
          colors={["#472be8", "#c4e8ef"]}
        ></PieChart>{" "}
        <PieChart
          title="Total Customers"
          value={4684}
          series={[75, 25]}
          colors={["#472be8", "#c4e8ef"]}
        ></PieChart>{" "}
        <PieChart
          title="Total cities"
          value={555}
          series={[75, 25]}
          colors={["#472be8", "#c4e8ef"]}
        ></PieChart>
      </Box>
      <Stack
        mt="25px"
        width="100%"
        gap={4}
        direction={{ xs: "column", lg: "row" }}
      >
        <TotalRevenue></TotalRevenue>
        <PropertyReferrals></PropertyReferrals>
      </Stack>
      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          Latest Properties
        </Typography>
        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {latestProperties.map((property) => {
            return (
              <PropertyCard
                key={property._id}
                id={property._id}
                title={property.title}
                location={property.location}
                price={property.price}
                photo={property.photo}
              ></PropertyCard>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
