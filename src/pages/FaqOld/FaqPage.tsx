import { useState, useEffect } from "react";
import FaqCreate from "./FaqCreate";
import FaqEdit from "./FaqEdit";
import FaqDelete from "./FaqDelete";
import { Button, Table, notification } from "antd";
import { api } from "../../api/axios";

interface Faq {
  id: number;
  question: {
    ru: string;
    kz: string;
    en: string;
    zh: string;
  };
  answer: {
    ru: string;
    kz: string;
    en: string;
    zh: string;
  };
}

export const FaqPage = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);

  const fetchFaqs = async () => {
    try {
      const response = await api.get("/Faqs");
      setFaqs(response.data);
    } catch (error) {
      notification.error({
        message: "Error fetching FAQs",
      });
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const columns = [
    {
      title: "Question (RU)",
      dataIndex: ["question", "ru"],
      key: "questionRu",
    },
    {
      title: "Answer (RU)",
      dataIndex: ["answer", "ru"],
      key: "answerRu",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: string, record: Faq) => (
        <span>
          <Button
            type="link"
            onClick={() => {
              setEditingFaqId(record.id.toString());
              setIsEditDrawerVisible(true);
            }}
          >
            Edit
          </Button>
          <FaqDelete faqId={record.id.toString()} onFaqDeleted={fetchFaqs} />
          <Button type="link" onClick={() => console.log("Show advanced data")}>
            More
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1>FAQs</h1>
      <Button
        type="primary"
        onClick={() => setIsCreateDrawerVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Create Question and Answer
      </Button>
      <Table columns={columns} dataSource={faqs} rowKey="id" />
      <FaqCreate
        visible={isCreateDrawerVisible}
        onClose={() => setIsCreateDrawerVisible(false)}
        onFaqCreated={fetchFaqs}
      />
      {editingFaqId && (
        <FaqEdit
          faqId={editingFaqId}
          visible={isEditDrawerVisible}
          onClose={() => setIsEditDrawerVisible(false)}
          onFaqUpdated={fetchFaqs}
        />
      )}
    </div>
  );
};

export default FaqPage;
