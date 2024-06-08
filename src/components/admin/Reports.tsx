import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Select, message, Typography } from 'antd';
import api from '../../config/axiosConfig';
import { Registro } from '../../interfaces/Registro';
import { Ong } from '../../interfaces/Ong';
import './Reports.css';

const { Option } = Select;
const { Title, Text } = Typography;

const Reports: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Registro[]>([]);
  const [ongs, setOngs] = useState<Ong[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.get('/registro/poluida'), api.get('/ongs')])
      .then(([poluidaResponse, ongsResponse]) => {
        setData(poluidaResponse.data);
        setOngs(ongsResponse.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar os registros e ONGs:', error);
        setError('Erro ao carregar os registros e ONGs');
        setLoading(false);
      });
  }, []);

  const handleChangeStatus = (id: number) => {
    api.put(`/registro/${id}/set-status-pendente?statusPendente=false`)
      .then(() => {
        message.success('Status atualizado com sucesso');
        setData(prevData => prevData.map(item => item.id === id ? { ...item, statusPendente: false } : item));
      })
      .catch(error => {
        console.error('Erro ao atualizar o status:', error);
        message.error('Erro ao atualizar o status:');
      });
  };

  const handleAssignOng = (id: number, ongId: number) => {
    api.put(`/registro/${id}/set-ong/${ongId}`)
      .then(() => {
        message.success('ONG atribuída com sucesso');
        setData(prevData => prevData.map(item => item.id === id ? { ...item, ong: { id: ongId, nome: ongs.find(ong => ong.id === ongId)?.nome || 'Desconhecida' } } : item));
      })
      .catch(error => {
        console.error('Erro ao atribuir ONG:', error);
        message.error('Erro ao atribuir ONG');
      });
  };

  const columns = [
    {
      title: 'Denunciante',
      dataIndex: 'nomePessoa',
      key: 'nomePessoa',
    },
    {
      title: 'Data do Reporte',
      dataIndex: 'dataReport',
      key: 'dataReport',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'statusPendente',
      key: 'statusPendente',
      render: (status: boolean, record: Registro) => (
        <Select 
          defaultValue={status ? 'Pendente' : 'Finalizado'} 
          onChange={() => handleChangeStatus(record.id)}
          disabled={!record.ong || !status} 
        >
          <Option value="Finalizado">Finalizado</Option>
        </Select>
      ),
    },
    {
      title: 'Praia',
      dataIndex: ['praia', 'nome'],
      key: 'praiaNome',
    },
    {
      title: 'Cidade',
      dataIndex: ['praia', 'cidade'],
      key: 'praiaCidade',
    },
    {
      title: 'Estado',
      dataIndex: ['praia', 'estado'],
      key: 'praiaEstado',
    },
    {
      title: 'ONG',
      dataIndex: 'ong',
      key: 'ong',
      width: 300,
      render: (ong: Ong | null, record: Registro) => (
        ong ? ong.nome : (
          <Select 
            placeholder="A definir"
            onChange={(value) => handleAssignOng(record.id, Number(value))}
          >
            {ongs.map((ong) => (
              <Option key={ong.id} value={ong.id}>
                {ong.nome}
              </Option>
            ))}
          </Select>
        )
      )
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
      <Title level={4}>Registros de Praias Poluídas</Title>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={record => record.id}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 400 }} 
      />
    </div>
  );
};

export default Reports;
