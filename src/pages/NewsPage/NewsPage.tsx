import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Tooltip,
  Typography,
  Drawer,
  Space,
  Popconfirm,
  notification,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import NewsForm from "./NewsForm";
import { News } from "../../types";
import { fetchNewsList, createNews, updateNews, deleteNews } from "../../api";

const { Title } = Typography;

const NewsPage = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(false);

  const loadNews = async () => {
    setLoading(true);
    try {
      const response = await fetchNewsList();
      console.log("API Response:", response); // Log the API response
      const formattedData = response.data.data.map((newsItem) => ({
        ...newsItem,
        title: newsItem.title || {}, // Ensure title is an object
        textContent: newsItem.textContent || {}, // Ensure textContent is an object
        description: newsItem.description || {}, // Ensure description is an object
      }));
      console.log("Formatted Data:", formattedData); // Log formatted data
      setNewsList(formattedData);
    } catch (error) {
      notification.error({ message: "Error fetching news" });
      console.error("Error details:", error); // Log error details
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleCreateOrUpdate = async (news: Omit<News, "id">) => {
    try {
      if (editingNews) {
        await updateNews(editingNews.id, news);
        notification.success({ message: "News updated successfully!" });
      } else {
        await createNews(news);
        notification.success({ message: "News created successfully!" });
      }
      setDrawerVisible(false);
      setEditingNews(null);
      loadNews();
    } catch (error) {
      notification.error({ message: "Error saving news" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNews(parseInt(id, 10));
      notification.success({ message: "News deleted successfully!" });
      loadNews();
    } catch (error) {
      notification.error({ message: "Error deleting news" });
    }
  };

  const columns = [
    {
      title: "Title (RU)",
      dataIndex: ["title", "ru"],
      key: "titleRu",
      render: (title) => title || "N/A", // Handle empty titles
    },
    {
      title: "Content (RU)",
      dataIndex: ["textContent", "ru"],
      key: "contentRu",
      render: (content) => content || "N/A", // Handle empty content
    },
    {
      title: "Description (RU)",
      dataIndex: ["description", "ru"],
      key: "descriptionRu",
      render: (description) => description || "N/A", // Handle empty descriptions
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text, record: News) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingNews(record);
              setDrawerVisible(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          News
        </Title>
        <Tooltip title="Add News">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingNews(null);
              setDrawerVisible(true);
            }}
          />
        </Tooltip>
      </div>
      <Table
        dataSource={newsList}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
      <Drawer
        title={editingNews ? "Edit News" : "Add News"}
        width={720}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <NewsForm
          news={editingNews}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setDrawerVisible(false)}
        />
      </Drawer>
    </div>
  );
};

export default NewsPage;
