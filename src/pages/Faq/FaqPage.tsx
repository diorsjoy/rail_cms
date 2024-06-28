import { useState, useEffect } from "react";
import FaqCreate from "./FaqCreate";
import FaqEdit from "./FaqEdit";
import FaqDelete from "./FaqDelete";
import FaqRead from "./FaqRead";
import { Button, notification } from "antd";
import { api } from "../../api/axios";

interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface Response {
  isSuccess: boolean;
  code: string;
  title: string | null;
  text: string | null;
  data: Data;
  exception: string | null;
}

export interface Data {
  records: number;
  lastPage: number;
  last_page: number;
  currentPage: number;
  loadedCount: number;
  isAll: boolean;
  data: Faq[];
}

export const FaqPage = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);

  const [editingFaqId, setEditingFaqId] = useState<number | null>(null);

  const fetchFaqs = async () => {
    try {
      api.get<Response>("/Faqs").then((res) => {
        setFaqs(res.data.data.data);
      });
    } catch (error) {
      notification.error({
        message: "Error fetching FAQs",
      });
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <div>
      <h1>FAQs</h1>
      <FaqCreate onFaqCreated={fetchFaqs} />
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id}>
              <td>{faq.question}</td>
              <td>{faq.answer}</td>
              <td>
                <Button onClick={() => setEditingFaqId(faq.id)}>Edit</Button>
                <FaqDelete faqId={faq.id.toString()} onFaqDeleted={fetchFaqs} />
                <FaqRead faqId={faq.id.toString()} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingFaqId && (
        <FaqEdit
          faqId={editingFaqId?.toString()}
          onFaqUpdated={() => {
            setEditingFaqId(null);
            fetchFaqs();
          }}
        />
      )}
    </div>
  );
};

export default FaqPage;
