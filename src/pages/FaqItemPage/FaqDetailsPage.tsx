import { useState, useEffect } from "react";
import { Button, Card, Typography } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { fetchFaqById } from "../../api";
import { Faq } from "../../types";

const { Title, Paragraph } = Typography;

const FaqDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [faq, setFaq] = useState<Faq | null>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const loadFaq = async () => {
      try {
        const { data } = await fetchFaqById(Number(id));
        setFaq(data);
      } catch (error) {
        console.error("Error fetching FAQ:", error);
      }
    };

    loadFaq();
  }, [id]);

  if (!faq) return null;

  const isLang = (lang: string): lang is keyof typeof faq.question => {
    return lang in faq.question;
  };

  return (
    <Card
      title="FAQ Details"
      extra={<Button onClick={() => navigate(-1)}>Back</Button>}
    >
      <Title level={4}>{faq.question.ru}</Title>
      <Paragraph>{faq.answer.ru}</Paragraph>
      {showMore &&
        ["kz", "en", "zh"].map((lang) =>
          isLang(lang) ? (
            <div key={lang}>
              <Title level={5}>{`Question (${lang.toUpperCase()})`}</Title>
              <Paragraph>{faq.question[lang]}</Paragraph>
              <Title level={5}>{`Answer (${lang.toUpperCase()})`}</Title>
              <Paragraph>
                {faq.answer[lang as keyof Faq["answer"]] as string}
              </Paragraph>
            </div>
          ) : null
        )}
      <Button type="link" onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show Less" : "Show More"}
      </Button>
    </Card>
  );
};

export default FaqDetailsPage;
