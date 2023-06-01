import React, { useState } from "react";
import { Layout, Menu, theme, Input, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { Header, Content, Sider } = Layout;
const list = [
  {
    key: "1",
    label: `菜单一`,
    children: [
      {
        key: "1-1",
        label: "子菜单1-1",
      },
      {
        key: "1-2",
        label: "子菜单1-2",
      },
    ],
  },
  {
    key: "2",
    label: `菜单二`,
    children: [
      {
        key: "2-1",
        label: "子菜单2-1",
      },
      {
        key: "2-2",
        label: "子菜单2-2",
      },
    ],
  },
];

function debounce(fn, wait = 500) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [menuList, setMenuList] = useState(list);
  const [value, setValue] = useState("子菜单1-1");
  const [defaultKeys, setDefaultKeys] = useState(["1-1"]);
  const [collapsed, setCollapsed] = useState(false);

  const changeMenu = () => {
    let key = defaultKeys[0];
    menuList[key.split("-")[0] - 1].children.find(
      (item) => item.key === key
    ).label = value.trim();
    setMenuList([...menuList]);
  };

  const selectMenu = ({ key }) => {
    const curMenu = menuList[key.split("-")[0] - 1].children.find(
      (item) => item.key === key
    );
    setValue(curMenu.label);
    setDefaultKeys([key]);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#fff",
        }}
      >
        <div className="demo-logo">react</div>
        <div>admin</div>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
          collapsed={collapsed}
        >
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ width: "100%", background: "#001500", borderRadius: "0" }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>

          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={defaultKeys}
            onClick={selectMenu}
            defaultOpenKeys={["1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={menuList}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Input
              style={{ width: "300px" }}
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <Button onClick={debounce(changeMenu)}>保存</Button>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
