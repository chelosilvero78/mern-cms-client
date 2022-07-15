import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, Col, Row } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

function ContactForm() {
  // state
  const [loading, setLoading] = useState(false);
  // hooks
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // console.log("values => ", values);
    setLoading(true);
    try {
      const { data } = await axios.post("/contact", values);
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success("Su mensaje a sido enviado, agradecemos su sugerencia... :) ");
        form.resetFields();
        setLoading(false);
      }
    } catch (err) {
      console.log("err => ", err);
      setLoading(false);
      toast.error("Fallo de Email. Intente nuevamente.");
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px" }}>Contacto</h1>

        <Form
          form={form}
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          {/* name */}
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Por favor ingresar sus nombres y apellidos completos" }]}
            hasFeedback
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Tus nombres"
            />
          </Form.Item>
          {/* email */}
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Por favor Ingrese un email valido" }]}
            hasFeedback
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Tu email"
            />
          </Form.Item>
          {/* message */}
          <Form.Item
            name="message"
            rules={[{ required: true, message: "Por favor ingrese su mensaje" }]}
            hasFeedback
          >
            <Input.TextArea
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Escribe tu mensaje aqui.."
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default ContactForm;
