"use client";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IVehicle } from "@/interfaces";
import { Button, message, Table } from "antd";
import { Edit2, Trash2 } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteVehicleById } from "@/server-actions/vehicles";

interface IVehiclesTableProps {
  vehicles: IVehicle[];
}

function VehiclesTable({ vehicles }: IVehiclesTableProps) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const { success } = await deleteVehicleById(id);
      if (success) {
        message.success("Vehicle deleted successfully");
      } else {
        message.error("Failed to delete vehicle");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render : (category: string) => category.toUpperCase()
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Rent Per Hour",
      dataIndex: "rentPerHour",
      key: "rentPerHour",
      render : (rentPerHour: number) => `$${rentPerHour}`
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => getDateTimeFormat(date),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: IVehicle) => (
        <div className="flex gap-5">
          <Button
            size="small"
            onClick={() => router.push(`/admin/vehicles/edit/${record._id}`)}
          >
            <Edit2 size={14} />
          </Button>

          <Button size="small" onClick={() => handleDelete(record._id)}>
            <Trash2 size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={vehicles}
      columns={columns}
      loading={loading}
      rowKey="_id"
    />
  );
}

export default VehiclesTable;
