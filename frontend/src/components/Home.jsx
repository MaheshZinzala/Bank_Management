import { useState } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import {
  MenuOutlined,
  DashboardOutlined,
  UserOutlined,
  BankOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

function Home() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Customers",
    },
    {
      key: "3",
      icon: <BankOutlined />,
      label: "Accounts",
    },
    {
      key: "4",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  return (
    <Layout className="min-h-screen">
      {/* Desktop Sidebar */}
      <Sider width={250} className="hidden! md:block!">
        <div className="flex h-16 items-center justify-center">
          <h2 className="text-xl font-bold text-white">Bank Management</h2>
        </div>

        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>

      {/* Main Content */}
      <Layout>
        {/* Mobile Sidebar Button */}
        <div className="bg-white p-3 md:hidden">
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
          >
            Menu
          </Button>
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title="Bank Management"
          placement="left"
          width={250}
          open={open}
          onClose={() => setOpen(false)}
          styles={{
            body: {
              padding: 0,
            },
          }}
        >
          <Menu
            mode="inline"
            items={menuItems}
            onClick={() => setOpen(false)}
          />
        </Drawer>

        {/* Content */}
        <Content className="bg-gray-100 p-4 md:p-6">
          <div className="rounded-lg bg-white p-5 shadow">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            <p className="mt-2 text-gray-600">
              Welcome to Bank Management System
            </p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Home;
