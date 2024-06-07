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
  const [showAdditionalFields, setShowAdditionalFields] = useState<boolean>(false);

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

  const handleFinish = async (values: any) => {
    if (selectedBeachId === null) {
      console.error("Nenhuma praia selecionada");
      return;
    }

    setLoading(true);

    if (isBeachPolluted) {
      console.error("Praia já está poluída");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/registro/salvar', {
        nomePessoa: values.nomePessoa,
        cpf: values.cpf,
        descricao: values.descricao,
        praia: { id: selectedBeachId },
        dataReport: new Date(),
      });

      if (response.status === 201) {
        console.log("Criado com sucesso");
        handleReset();
        onClose();
      } else {
        console.log('Falha ao criar o registro');
      }
    } catch (error) {
      console.error('Erro ao criar o registro', error);
      console.log('Erro ao criar o registro');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (value: string) => {
    const selectedBeach = beaches.find((beach: Praia) => beach.nome === value);
    if (selectedBeach) {
      setSelectedBeachId(selectedBeach.id);
      setIsBeachPolluted(selectedBeach.poluida);
      form.setFieldsValue({
        cidade: selectedBeach.cidade,
        estado: selectedBeach.estado
      });

      if (!selectedBeach.poluida) {
        setShowAdditionalFields(true);
      } else {
        setShowAdditionalFields(false);
      }
    }
  };

  const handleReset = () => {
    setSelectedBeachId(null);
    setIsBeachPolluted(false);
    setShowAdditionalFields(false);
    form.resetFields();
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal open={visible} onCancel={handleClose} title="Informar Praia Suja" footer={null}>
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

        {showAdditionalFields && (
          <>
            <Form.Item name="nomePessoa" label="Qual o seu nome? " rules={[{ required: true, message: 'Por favor, insira seu nome' }]}>
              <Input />
            </Form.Item>

            <Form.Item name="cpf" label="Informe o seu CPF" rules={[{ required: true, message: 'Por favor, insira seu CPF' }]}>
              <Input />
            </Form.Item>

            <Form.Item name="descricao" label="Informe mais detalhes" rules={[{ required: true, message: 'Por favor, insira uma descrição' }]}>
              <Input.TextArea placeholder="Dê maiores detalhes sobre o tipo de poluição que está vendo, e nos informe mais detalhes do local da praia. Ajude as ONGs a localizar o local da sua denuncia" rows={4} />
            </Form.Item>
          </>
        )}

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
