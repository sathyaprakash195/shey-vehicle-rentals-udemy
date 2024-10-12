"use client";
import { vehilcesCategories } from "@/constants";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function CategoryFilters() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const router = useRouter();

  const onCategorySelect = (category: string) => {
     setSelectedCategory(category);
     router.push(`/vehicles?category=${category}`);
  }

  return (
    <div className="mt-5 flex flex-wrap gap-5">
      <Button
        className={`${selectedCategory === "" ? "border border-primary" : ""}`}
        onClick={() => onCategorySelect("")}
      >
        <img src={`/all-categories.png`} className="w-10 h-8 cursor-pointer" />
      </Button>
      {vehilcesCategories.map((category) => (
        <Button
          key={category.value}
          className={`${
            selectedCategory === category.value ? "border border-primary" : ""
          }`}
          onClick={() => onCategorySelect(category.value)}
        >
          <img
            src={`/${category.icon}.png`}
            className="w-12 h-10 cursor-pointer"
          />
        </Button>
      ))}
    </div>
  );
}

export default CategoryFilters;
