import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import './Home.css';
import heroImage from '../images/img1.webp';
import logo from '../images/logo_sos.png'
import CountUp from 'react-countup';
import { AlertOutlined  , SearchOutlined , InfoCircleOutlined } from '@ant-design/icons';
import InformModal from '../components/modal/InformModal';
import InformacoesHomeModal from '../components/modal/InformacoesHomeModal';
import ReportsModal from '../components/modal/ReportsModal';


const { Meta } = Card;

const Home: React.FC = () => {
  const [counts, setCounts] = useState({
    beaches: false,
    ngos: false,
    cleaned: false
  });

  const [informModalVisible, setInformModalVisible] = useState(false);
  const [informacoesHomeModalVisible, setInformacoesHomeModalVisible] = useState(false);
  const [reporttsModalVisible, setReporttsModalVisible] = useState(false);


  const handleScrollToStats = () => {
    document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCardClick = (modalType: 'informModal' | 'reportsModal' | 'informacoesHome') => {
    if (modalType === 'informModal') {
      setInformModalVisible(true);
    } else if (modalType === 'informacoesHome') {
      setInformacoesHomeModalVisible(true);
    } else if (modalType === 'reportsModal') { 
      setReporttsModalVisible(true)
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');

      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
          if (reveal.classList.contains('beaches')) {
            setCounts((prevCounts) => ({ ...prevCounts, beaches: true }));
          }
          if (reveal.classList.contains('ngos')) {
            setCounts((prevCounts) => ({ ...prevCounts, ngos: true }));
          }
          if (reveal.classList.contains('cleaned')) {
            setCounts((prevCounts) => ({ ...prevCounts, cleaned: true }));
          }
          reveal.classList.add('active');
        } else {
          reveal.classList.remove('active');
          if (reveal.classList.contains('beaches')) {
            setCounts((prevCounts) => ({ ...prevCounts, beaches: false }));
          }
          if (reveal.classList.contains('ngos')) {
            setCounts((prevCounts) => ({ ...prevCounts, ngos: false }));
          }
          if (reveal.classList.contains('cleaned')) {
            setCounts((prevCounts) => ({ ...prevCounts, cleaned: false }));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
        <section className="hero">
                <div className="hero-content">
                 
                <div className="hero-text">
                  <div style={{marginLeft: '30px'}}>
                   
                  </div>
                    <h1 style={{color: '#081D18'}}>SAVE OUR SHORES</h1>
                    <p style={{color: '#081D18'}}>Nosso iniciativa visa promover ações integradas e unir esforços para preservar nossas praias, garantindo que possamos usufruir dessa riqueza natural e de seus recursos de maneira sustentável, responsável e respeitosa. 
                    </p>
                    <p style={{color: '#081D18'}}>Salvar a sua praia é a nossa praia.</p>

                    <button onClick={handleScrollToStats} style={{backgroundColor: '#081C18', borderRadius: '20px', width: '200px'}}>SAIBA COMO</button>
                </div>
                <div className="hero-image">
                    <img src={heroImage} alt="Hero" />
                </div>
                </div>
        </section>
      <section id="stats-section" className="stats reveal">
        <img src={logo} alt="" className='logo'/>
          <h2>Nossos dados</h2>
          <Row gutter={[16, 16]} className="reveal beaches">
            <Col span={8}>
              <Card>
                <Meta title={counts.beaches ? <CountUp end={30} duration={10} /> : '0'} description="Praias participantes" />
              </Card>
            </Col>
            <Col span={8} className="reveal ngos">
              <Card>
                <Meta title={counts.ngos ? <CountUp end={8} duration={10} /> : '0'} description="ONGs ativas" />
              </Card>
            </Col>
            <Col span={8} className="reveal cleaned">
              <Card>
                <Meta title={counts.cleaned ? <CountUp end={122} duration={10} /> : '0'} description="Praias limpas por nós" />
              </Card>
            </Col>
          </Row>
      </section>
      <section className="services reveal">
        <Row gutter={[16, 16]} justify="center">
          <Col span={8}>
            <Card hoverable onClick={() => handleCardClick('informModal')}>
              <div className="service-icon">
                <AlertOutlined style={{ fontSize: '64px', color: '#FF7C12' }} />
              </div>
              <Meta title="Viu um cenário de poluição na praia? " description="Reporte aqui." />
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable onClick={() => handleCardClick('reportsModal')}>
              <div className="service-icon">
                <SearchOutlined style={{ fontSize: '64px', color: '#FF7C12' }} />
              </div>
              <Meta title="Verificar informes" description="Acompanhe aqui os últimos informes de praias poluídas." />
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable onClick={() => handleCardClick('informacoesHome')}>
              <div className="service-icon">
                <InfoCircleOutlined style={{ fontSize: '64px', color: '#FF7C12' }} />
              </div>
              <Meta title="Mais informações" description="Saiba mais sobre o nosso funcionamento e abordagem." />
            </Card>
          </Col>
        </Row>
      </section>
      <InformModal
        visible={informModalVisible}
        onClose={() => setInformModalVisible(false)}
      />
       <InformacoesHomeModal
        visible={informacoesHomeModalVisible}
        onClose={() => setInformacoesHomeModalVisible(false)}
      />
      <ReportsModal 
        visible={reporttsModalVisible}
        onClose={() => setReporttsModalVisible(false)}
      />
    </div>
  );
};

export default Home;
