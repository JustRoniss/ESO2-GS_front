import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Button, Modal, Form, Input, message, Typography } from 'antd';
import api from '../../config/axiosConfig';
import { Ong } from '../../interfaces/Ong';
import './Ongs.css';

const { Title } = Typography;

const Ongs: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Ong[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchOngs();
  }, []);

  const fetchOngs = () => {
    setLoading(true);
    api.get('/ongs')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar as ONGs:', error);
        setError('Erro ao carregar as ONGs');
        setLoading(false);
      });
  };

  const handleAddOng = (values: any) => {
    api.post('/ongs', values)
      .then(() => {
        message.success('ONG adicionada com sucesso');
        fetchOngs();
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch(error => {
        console.error('Erro ao adicionar ONG:', error);
        message.error('Erro ao adicionar ONG');
      });
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Área de Atuação',
      dataIndex: 'areaAtuacao',
      key: 'areaAtuacao',
    },
    {
      title: 'Status',
      dataIndex: 'estaAtuando',
      key: 'estaAtuando',
      render: (status: boolean) => (status ? 'Atuando' : 'Não Atuando'),
    },
  ];

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <div className="table-container">
      <Title level={4}>ONGs</Title>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
        Adicionar ONG
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={record => record.id}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 400 }} 
      />
      <Modal
        title="Adicionar ONG"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleAddOng}>
          <Form.Item name="nome" label="Nome" rules={[{ required: true, message: 'Por favor, insira o nome da ONG' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="areaAtuacao" label="Área de Atuação" rules={[{ required: true, message: 'Por favor, insira a área de atuação' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Ongs;
