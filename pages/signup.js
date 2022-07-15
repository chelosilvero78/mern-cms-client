import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, Col, Row } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";

function Signup() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hook
  const router = useRouter();
  console.log(router);
  // state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.token) {
      router.push("/");
    }
  }, [auth]);

  const onFinish = async (values) => {
    // console.log("values => ", values);
    setLoading(true);
    try {
      const { data } = await axios.post(`/signup`, values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // console.log("signup response => ", data);
        // save in context
        setAuth(data);
        // save in local storage
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Inicio de Sesion satisfactorio");
        setLoading(false);
        // redirect
        router.push("/admin");
      }
    } catch (err) {
      toast.error("Fallo al iniciar sesion. Intente nuevamente.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px" }}>Iniciar Sesion</h1>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {/* name */}
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Por favor ingrese su nombre!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          {/* email */}
          <Form.Item name="email" rules={[{ type: "email",required:true,message:"Por favor ingrese un email valido" }]}>
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          {/* password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Por favor ingrese su Contraseña!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Contraseña"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Registrarse
            </Button>
            <br />
            Or{" "}
            <Link href="/signin">
              <a>Ingresar ahora!</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Signup;
