"use client";

import { vehilcesCategories } from "@/constants";
import { uploadFilesToFirebaseAndReturnUrls } from "@/helpers/firebase-helpers";
import { Button, Form, Input, message, Select, Upload } from "antd";
import React from "react";
interface IVehicleFormProps {
  type: "add" | "edit";
  vehicleData: any; // we will update this later
}

function VehicleForm({ type, vehicleData }: IVehicleFormProps) {
  const [uploadedFiles, setUploadedFiles] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      values.media = await uploadFilesToFirebaseAndReturnUrls(uploadedFiles);
      console.log(values);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
        <div className="col-span-4">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item
          name="Category"
          label="Category"
          rules={[{ required: true, message: "Please select the category!" }]}
        >
          <Select placeholder="Select Category" options={vehilcesCategories} />
        </Form.Item>

        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: "Please input the brand!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="model"
          label="Model"
          rules={[{ required: true, message: "Please input the model!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="rentPerHour"
          label="Rent Per Hour"
          rules={[
            { required: true, message: "Please input the rent per hour!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <div className="col-span-4">
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setUploadedFiles([...uploadedFiles, file]);
              return false;
            }}
          >
            <span className="text-xs">Upload media</span>
          </Upload>
        </div>

        <div className="col-span-4 flex justify-end gap-5">
          <Button>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default VehicleForm;
