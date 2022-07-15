import { Modal, Form, Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const CategoryUpdateModal = ({
  visible,
  setVisible,
  handleUpdate,
  updatingCategory,
}) => {
  return (
    <Modal
      title="Actualizar Categoria"
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <Form
        onFinish={handleUpdate}
        fields={[{ name: ["name"], value: updatingCategory.name }]}
      >
        <Form.Item name="name">
          <Input
            prefix={<EditOutlined className="site-form-item-icon" />}
            placeholder="Asignale un nombre"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form>
    </Modal>
  );
};

export default CategoryUpdateModal;
