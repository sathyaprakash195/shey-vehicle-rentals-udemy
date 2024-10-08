import { Button, Input, Select } from "antd";

export default function Home() {
  return (
    <div className="p-5 uppercase font-bold flex flex-col gap-5 w-max">
      <h1>Shey Vehicle Rentals</h1>

      <Button type="primary">Ant Design Primary Button</Button>
      <Button type="default">Ant Design Default Button</Button>

      <Input placeholder="Basic input" />

      <Select
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      />
    </div>
  );
}
