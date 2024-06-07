import { Modal, Form, Input, Button, Select, Alert } from "antd";
import { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import { Praia } from "../interfaces/Praia";

interface InformModalProps {
  visible: boolean;
  onClose: () => void;
}

const InformModal: React.FC<InformModalProps> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [beaches, setBeaches] = useState<Praia[]>([]);
  const [form] = Form.useForm();
  const [selectedBeachId, setSelectedBeachId] = useState<number | null>(null);
  const [isBeachPolluted, setIsBeachPolluted] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      api.get("/praias")
        .then((response) => {
          setBeaches(response.data);
        })
        .catch((error) => {
          console.error("Erro ao carregar as praias:", error);
        });
    }
  }, [visible]);

  const handleFinish = (values: any) => {
    if (selectedBeachId === null) {
      console.error("Nenhuma praia selecionada");
      return;
    }

    setLoading(true);
    api.put(`/praias/poluida/${selectedBeachId}`)
      .then(response => {
        console.log('Praia marcada', response);
        setLoading(false);
        onClose();
      })
      .catch(error => {
        console.error('Erro', error);
        setLoading(false);
      });
  };

  const handleChange = (value: string) => {
    const selectedBeach = beaches.find((beach: Praia) => beach.nome === value);
    if (selectedBeach) {
      setSelectedBeachId(selectedBeach.id);
      setIsBeachPolluted(selectedBeach.poluida); 
      form.setFieldsValue({
        cidade: selectedBeach.cidade,
        estado: selectedBeach.estado
      });
    }
  };

  return (
    <Modal open={visible} onCancel={onClose} title="Informar Praia Suja" footer={null}>
      {isBeachPolluted && (
        <Alert message="Já foi informado que essa praia está poluída." type="warning" showIcon />
      )}
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item name="nome" rules={[{ required: true, message: 'Selecione uma praia' }]}>
          <Select placeholder="Selecione uma praia" onChange={handleChange}>
            {beaches.map((praia: Praia) => (
              <Select.Option key={praia.id} value={praia.nome}>
                {praia.nome}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="cidade" rules={[{ required: true, message: 'Por favor, insira a cidade' }]}>
          <Input placeholder="Cidade" disabled />
        </Form.Item>

        <Form.Item name="estado" rules={[{ required: true, message: 'Por favor, insira o estado' }]}>
          <Input placeholder="Estado" disabled />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} disabled={isBeachPolluted}>
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InformModal;
