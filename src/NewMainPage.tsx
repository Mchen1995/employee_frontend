import React from "react";
import { Flex, Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const NewMainPage: React.FC = () => (
  <Layout>
    <Header>Header</Header>
    <Layout>
      <Sider width="100%">Sider</Sider>
      <Content>Content</Content>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
);

export default NewMainPage;
