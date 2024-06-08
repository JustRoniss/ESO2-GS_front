import React from "react";
import { Modal, Carousel, Image, Typography, Grid } from "antd";
import praiaRio from "../images/praia-rj.jpg";
import derramamentoOleo from "../images/derramamento-oleo.png";
import praiaSuja from "../images/praia-poluida.png";
import esgoto from "../images/esgoto.png";
import pontoReferencia from "../images/ponto-referencia.jpg";
import "./InformacoesHomeModal.css";

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface InformacoesHomeModalProps {
  visible: boolean;
  onClose: () => void;
}

const InformacoesHomeModal: React.FC<InformacoesHomeModalProps> = ({
  visible,
  onClose,
}) => {
  const screens = useBreakpoint();

  return (
    <Modal
      title="Saiba como nós operamos e saiba mais sobre como ajudar a salvar praias"
      open={visible}
      onCancel={onClose}
      footer={null}
      className="informacoes-home-modal"
      width={screens.xs ? "80%" : "50%"}
      centered
      closable={true}
      closeIcon={<span>&times;</span>}
      afterClose={() => console.log("Modal closed")}
    >
      <Carousel autoplay dotPosition="bottom">
        <div className="carousel-slide">
          <Image src={praiaRio} alt="Imagem 1" className="carousel-image" />
          <br />
          <Text className="carousel-description">
            O que são cenários de poluição? Os cenários de poluição da praia são
            situações em que a qualidade da água e do ambiente costeiro é
            comprometida devido à introdução de substâncias poluentes ou
            resíduos. Aqui estão alguns exemplos de cenários de poluição da
            praia:
            <ul>
              <li>Despejo de esgoto não tratado</li>
              <li>Derramamento de óleo</li>
              <li>Acúmulo de lixo na água e na orla</li>
            </ul>
          </Text>
        </div>
        <div className="carousel-slide">
          <Image src={derramamentoOleo} alt="Imagem 2" className="carousel-image" />
          <Text className="carousel-description">
            Derramamento de óleo no mar
          </Text>
        </div>
        <div className="carousel-slide">
          <Image src={praiaSuja} alt="Imagem 3" className="carousel-image" />
          <Text className="carousel-description">Lixo</Text>
        </div>
        <div className="carousel-slide">
          <Image src={esgoto} alt="Imagem 3" className="carousel-image" />
          <Text className="carousel-description">Esgoto</Text>
        </div>
        <div className="carousel-slide">
          <Image src={pontoReferencia} alt="Imagem 4" className="carousel-image" />
          <Text className="carousel-description">
            Para garantir um informe ideal que oriente adequadamente a ONG, é
            essencial incluir detalhes específicos que facilitem a localização
            do cenário descrito, como pontos de referência visíveis ou
            características distintivas da área.
          </Text>
        </div>
      </Carousel>
    </Modal>
  );
};

export default InformacoesHomeModal;
