import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Spin, Alert, Typography } from 'antd';
import api from '../../config/axiosConfig';
import { Praia } from '../../interfaces/Praia';
import './Beaches.css';

const { Title } = Typography;

const Beaches: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Praia[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPraias();
  }, []);

  const fetchPraias = async () => {
    try {
      const response = await api.get('/praias');
      setData(response.data);
    } catch (error) {
      console.error('Erro ao carregar as praias:', error);
      setError('Erro ao carregar as praias');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (values: any) => {
    try {
      setLoading(true);
      await api.post('/praias', values);
      message.success('Praia criada com sucesso');
      fetchPraias();
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Erro ao criar a praia:', error);
      message.error('Erro ao criar a praia');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Cidade',
      dataIndex: 'cidade',
      key: 'cidade',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Status',
      dataIndex: 'poluida',
      key: 'poluida',
      render: (poluida: boolean) => (poluida ? 'Poluída' : 'Limpa'),
    },
  ];

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <div className="beaches-container">
      <Title level={4}>Gerenciamento de Praias</Title>
      <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
        Inserir praia
      </Button>
      <Table columns={columns} dataSource={data} rowKey={record => record.id} pagination={{ pageSize: 10 }} />
      <Modal
        title="Criar Nova Praia"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleCreate}>
          <Form.Item name="nome" label="Nome" rules={[{ required: true, message: 'Por favor, insira o nome da praia' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="cidade" label="Cidade" rules={[{ required: true, message: 'Por favor, insira a cidade' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="estado" label="Estado" rules={[{ required: true, message: 'Por favor, insira o estado' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Beaches;
