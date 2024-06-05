import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import './Home.css';
import heroImage from '../images/img1.webp';
import logo from '../images/logo_sos.png'
import CountUp from 'react-countup';
import { AlertOutlined  , SearchOutlined , InfoCircleOutlined } from '@ant-design/icons';


const { Meta } = Card;

const Home: React.FC = () => {
  const [counts, setCounts] = useState({
    beaches: false,
    ngos: false,
    cleaned: false
  });

  const handleScrollToStats = () => {
    document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' });
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
                    <h1>Save Our Shores</h1>
                    <p>Salvando as praias a milhares de décadas. Dê seu apoio para manter nossas praias limpas e seguras.</p>
                    <button onClick={handleScrollToStats}>Pinto</button>
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
            <Card hoverable>
              <div className="service-icon">
                <AlertOutlined style={{ fontSize: '64px', color: '#FF7C12' }} />
              </div>
              <Meta title="Informar praia suja" description="Informe qual praia está poluída" />
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable>
              <div className="service-icon">
                <SearchOutlined style={{ fontSize: '64px', color: '#FF7C12' }} />
              </div>
              <Meta title="Verificar informes" description="Veja aqui qual praia está poluida." />
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable>
              <div className="service-icon">
                <InfoCircleOutlined style={{ fontSize: '64px', color: '#FF7C12' }} />
              </div>
              <Meta title="Mais informações" description="Obtenha mais informações sobre nossa forma operacional" />
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Home;
