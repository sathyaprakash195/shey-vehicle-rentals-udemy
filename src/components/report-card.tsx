import React from "react";

interface IReportCardProps {
  label: string;
  value: number;
  isCurrency?: boolean;
  description?: string;
}

function ReportCard({
  label,
  value,
  isCurrency,
  description,
}: IReportCardProps) {
  return (
    <div className="border border-solid border-primary p-5 bg-gray-100 rounded-sm flex flex-col gap-7">
      <h1 className="text-sm font-bold">{label}</h1>
      <h1 className="text-4xl font-bold text-center">{isCurrency ? `$${value}` : value}</h1>
      <p className="text-xs">{description}</p>
    </div>
  );
}

export default ReportCard;
