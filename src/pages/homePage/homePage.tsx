import { useState } from 'react';
import { BasicLayout } from '../../components/layout/basicLayout';
import './homePage.scss';
import { Fade } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';

export type EntityType = {
  id: number;
  name: string;
  path: string;
  bgColor: string;
  description: string;
  projects: string[];
};

export default function HomePage() {
  const navigate = useNavigate();
  const images = [
    {
      id: 1,
      name: '',
      path: '/homePrincipal.png',
      bgColor: '#3c3688',
      description: '',
      projects: [],
    },
    {
      id: 2,
      name: 'Podcast',
      path: '/digitalMedia.png',
      bgColor: '#ee8c2d',
      description:
        'Encuentra inspiración en creativos de nuestra ciudad, conoce sus métodos y el proceso que hace de cada proyecto algo único.',
      projects: ['Proyecto 1', 'Proyecto 2'],
    },
    {
      id: 3,
      name: 'Series fotográficas',
      path: '/editorials.png',
      bgColor: '#266c66',
      description:
        'Conoce a los artistas detrás de diferentes empresas en las industrias creativas, sus ideas, lo que les rodea y lo que les inspira.',
      projects: ['Proyecto 1', 'Proyecto 2'],
    },
    {
      id: 4,
      name: '¿Quiénes somos?',
      path: '/aboutUs.png',
      bgColor: '#ee8c2d',
      description:
        'Descubre quiénes somos, quiénes hacen parte de nuestro equipo y qué queremos lograr.',
      projects: ['Proyecto 1', 'Proyecto 2'],
    },
    {
      id: 5,
      name: 'Publicaciones',
      path: '/publications.png',
      bgColor: '#266c66',
      description:
        'Dale un vistazo a nuestras publicaciones y ensayos de investigación.',
      projects: ['Proyecto 1', 'Proyecto 2'],
    },
    {
      id: 6,
      name: 'Entrevistas documentales',
      path: '/graphicArts.png',
      bgColor: '#ee8c2d',
      description:
        'Recorre y conoce las diferentes casas gráficas de la ciudad de Medellín. Explora, descubre y conecta con ellas.',
      projects: ['Proyecto 1', 'Proyecto 2'],
    },
  ];

  const [currentContent, setCurrentContent] = useState(images[0]);

  const handleMouseEnter = (item: EntityType) => {
    setCurrentContent(item);
  };

  const handleMouseLeave = () => {
    setCurrentContent(images[0]);
  };

  return (
    <BasicLayout color={currentContent.bgColor}>
      <div
        className="home-page"
        style={{ backgroundColor: currentContent.bgColor }}
      >
        <div className="image-container">
          <Fade direction="up" className="fade-class">
            <img
              src={currentContent.path}
              alt={currentContent.name}
              className={`main-image ${
                currentContent.name === '¿Quiénes Somos?' ? 'aboutus' : ''
              }`}
            />
          </Fade>
          <div
            className="digital-media"
            onMouseEnter={() => handleMouseEnter(images[1])}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate('/podcast')}
          ></div>
          <div
            className="editorials"
            onMouseEnter={() => handleMouseEnter(images[2])}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate('/series-fotograficas')}
          ></div>
          <div
            className="about-us"
            onMouseEnter={() => handleMouseEnter(images[3])}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate('/nosotros')}
          ></div>
          <div
            className="publications"
            onMouseEnter={() => handleMouseEnter(images[4])}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate('/publicaciones')}
          ></div>
          <div
            className="graphic-arts"
            onMouseEnter={() => handleMouseEnter(images[5])}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate('/entrevistas-documentales')}
          ></div>
        </div>
        <div className="content-description">
          <Fade direction="right" className="fade-class-right">
            <h1>{currentContent.name}</h1>
          </Fade>
          <p>{currentContent.description}</p>
        </div>
      </div>
    </BasicLayout>
  );
}
