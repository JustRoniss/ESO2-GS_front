import React from 'react';
import { Modal, Carousel, Image } from 'antd';
import praiaRio from '../../images/praia-rj.jpg';
import './InformacoesHomeModal.css';

interface InformacoesHomeModalProps {
  visible: boolean;
  onClose: () => void;
}

const InformacoesHomeModal: React.FC<InformacoesHomeModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      title="Como nós operamos?"
      open={visible}
      onCancel={onClose}
      footer={null}
      className="informacoes-home-modal"
      width="50%"
      centered
      closable={true}
      closeIcon={<span>&times;</span>}
      afterClose={() => console.log("Modal closed")}
    >
      <Carousel autoplay dotPosition="bottom" infinite={false}>
        <div className="carousel-slide">
          <Image src={praiaRio} alt="Imagem 1" className="carousel-image" />
          <p className="carousel-description">Texto genérico abaixo da imagem 1</p>
        </div>
        <div className="carousel-slide">
          <Image src={praiaRio} alt="Imagem 2" className="carousel-image" />
          <p className="carousel-description">Texto genérico abaixo da imagem 2</p>
        </div>
      </Carousel>
    </Modal>
  );
};

export default InformacoesHomeModal;
