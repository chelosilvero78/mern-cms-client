import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, Col, Row } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";

function Signin() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [loading, setLoading] = useState(false);
  // hooks
  const router = useRouter();
  // const [form] = Form.useForm();

  useEffect(() => {
    if (auth?.token) {
      router.push("/");
    }
  }, [auth]);

  const onFinish = async (values) => {
    // console.log("values => ", values);
    try {
      setLoading(true);
      const { data } = await axios.post("/signin", values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // console.log("signin response => ", data);
        // save user and token to context
        setAuth(data);
        // save user and token to local storage
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Inicio de Sesion Satisfactorio");
        // redirect user
        if (data?.user?.role === "Admin") {
          router.push("/admin");
        } else if (data?.user?.role === "Author") {
          router.push("/author");
        } else {
          router.push("/subscriber");
        }
        // form.resetFields();
      }
    } catch (err) {
      console.log("err => ", err);
      setLoading(false);
      toast.error("Fallo al Iniciar Sesion. Intente nuevamente.");
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px" }}>Iniciar Sesion</h1>

        <Form
          // form={form}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
            // email: "marcesilvero@gmail.com",
            email: "",
            //password: "123456",
            password: "",
          }}
          onFinish={onFinish}
        >
          {/* email */}
          <Form.Item name="email" rules={[{ type: "email" }]}>
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          {/* password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Link href="/forgot-password">
            <a>Olvide mi Contraseña</a>
          </Link>
          <br />
          <br />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Iniciar Sesion
            </Button>
            <br />
            O {" "}
            <Link href="/signup">
              <a>Registarme!</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Signin;
