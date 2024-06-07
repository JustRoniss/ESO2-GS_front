import { Modal, List, Typography, Alert, Spin } from "antd";
import React, { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import { Registro } from "../interfaces/Registro";
import './ReportsModal.css';

const { Title, Text } = Typography;

interface ReportsModalProps {
  visible: boolean;
  onClose: () => void;
}

const ReportsModal: React.FC<ReportsModalProps> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [poluidaRegistros, setPoluidaRegistros] = useState<Registro[]>([]);
  const [recentesRegistros, setRecentesRegistros] = useState<Registro[]>([]);

  useEffect(() => {
    if (visible) {
      setLoading(true);
      Promise.all([api.get("/registro/poluida"), api.get("/registro/recentes")])
        .then(([poluidaResponse, recentesResponse]) => {
          setPoluidaRegistros(poluidaResponse.data);
          setRecentesRegistros(recentesResponse.data);
        })
        .catch((error) => {
          console.error("Erro ao carregar os registros:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [visible]);

  return (
    <Modal open={visible} onCancel={onClose} title="Registros de Praias" footer={null}>
      {loading ? (
        <Spin />
      ) : (
        <div className="modal-content fade-in">
          <Title level={4}>Praias Poluídas</Title>
          {poluidaRegistros.length === 0 ? (
            <Alert message="Nenhum registro encontrado" type="info" showIcon className="alert-message" />
          ) : (
            <List
              itemLayout="vertical"
              dataSource={poluidaRegistros}
              renderItem={(item) => (
                <List.Item className="list-item">
                  <List.Item.Meta
                    title={<Text strong className="list-item-meta-title">{item.nomePessoa}</Text>}
                    description={
                      <div className="list-item-meta-description">
                        <Text>Data do Reporte: {new Date(item.dataReport).toLocaleDateString()}</Text>
                        <br />
                        <Text>Status: {item.statusPendente ? "Pendente" : "Finalizado"}</Text>
                        <br />
                        <Text>Praia: {item.praia.nome} ({item.praia.cidade} - {item.praia.estado})</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          )}

          <Title level={4}>Registros Recentes de Praias Limpas</Title>
          {recentesRegistros.length === 0 ? (
            <Alert message="Nenhum registro encontrado" type="info" showIcon className="alert-message" />
          ) : (
            <List
              itemLayout="vertical"
              dataSource={recentesRegistros}
              renderItem={(item) => (
                <List.Item className="list-item">
                  <List.Item.Meta
                    title={<Text strong className="list-item-meta-title">{item.nomePessoa}</Text>}
                    description={
                      <div className="list-item-meta-description">
                        <Text>Data do Reporte: {new Date(item.dataReport).toLocaleDateString()}</Text>
                        <br />
                        <Text>Data de Finalização: {item.dataFinalizado ? new Date(item.dataFinalizado).toLocaleDateString() : "N/A"}</Text>
                        <br />
                        <Text>Status: {item.statusPendente ? "Pendente" : "Finalizado"}</Text>
                        <br />
                        <Text>Praia: {item.praia.nome} ({item.praia.cidade} - {item.praia.estado})</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      )}
    </Modal>
  );
};

export default ReportsModal;
