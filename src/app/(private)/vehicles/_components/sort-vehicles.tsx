"use client";

import { Select } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function SortVehicles() {
  const [selectedSort, setSelectedSort] = React.useState<string>("");
  const router = useRouter();
  const options = [
    {
      label: "None",
      value: "",
    },
    {
      label: "Rent per hour: Low to High",
      value: "rentPerHour:asc",
    },
    {
      label: "Rent per hour: High to Low",
      value: "rentPerHour:desc",
    },
  ];

  const onSortValueSelect = (value: string) => {
    setSelectedSort(value);
    router.push(`/vehicles?sortBy=${value}`);
  };

  return (
    <div className="flex flex-col w-96">
      <label htmlFor="Sort By" className="text-sm">
        Sort By
      </label>
      <Select
        options={options}
        value={selectedSort}
        onChange={(value) => onSortValueSelect(value)}
      />
    </div>
  );
}

export default SortVehicles;
