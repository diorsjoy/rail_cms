import { useState, useEffect } from "react";
import {
  Button,
  Table,
  Tooltip,
  Typography,
  Modal,
  Space,
  Popconfirm,
  notification,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { fetchFaqs, createFaq, updateFaq, deleteFaq } from "../../api";
import FaqForm from "../FaqItemPage/FaqForm";
import { Faq } from "../../types";

const { Title } = Typography;

const FaqPage = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [loading, setLoading] = useState(false);

  const loadFaqs = async () => {
    setLoading(true);
    try {
      const { data } = await fetchFaqs();
      setFaqs(data.data.data || []);
    } catch (error) {
      notification.error({ message: "Error fetching FAQs" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleCreateOrUpdate = async (faq: Omit<Faq, "id">) => {
    try {
      if (editingFaq) {
        await updateFaq(editingFaq.id, faq);
        notification.success({ message: "FAQ updated successfully!" });
      } else {
        await createFaq(faq);
        notification.success({ message: "FAQ created successfully!" });
      }
      setModalVisible(false);
      setEditingFaq(null);
      loadFaqs();
    } catch (error) {
      notification.error({ message: "Error saving FAQ" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFaq(id);
      notification.success({ message: "FAQ deleted successfully!" });
      loadFaqs();
    } catch (error) {
      notification.error({ message: "Error deleting FAQ" });
    }
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: unknown, record: Faq) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingFaq(record);
              setModalVisible(true);
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
      <Table
        dataSource={faqs}
        columns={columns}
        rowKey="id"
        loading={loading}
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={4} style={{ margin: 0 }}>
              FAQ
            </Title>
            <Tooltip title="Add FAQ">
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={() => setModalVisible(true)}
              />
            </Tooltip>
          </div>
        )}
      />
      <Modal
        title={editingFaq ? "Edit FAQ" : "Create FAQ"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <FaqForm
          faq={editingFaq}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default FaqPage;
