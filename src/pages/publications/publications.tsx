import { Slide } from 'react-awesome-reveal';
import { BasicLayout } from '../../components/layout/basicLayout';
import { PublicationsCarrousel } from '../../components/publications/publicationsCarrousel/publicationsCarrousel';
import { Separator } from '../../components/shared/separator/separator';
import './publications.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Publications() {
  const navigate = useNavigate();
  return (
    <BasicLayout color="#266c66">
      <Separator height={20} backgroundColor="#266c66"></Separator>
      <div className="publications-page-container">
        <div className="page-container">
          <div className="publications-page">
            <button onClick={() => navigate('/')}>
              <FontAwesomeIcon icon={faChevronLeft} /> Atrás
            </button>
            <Slide direction="left" className="publications-fade" triggerOnce>
              <h2>Te invitamos a leer nuestras publicaciones</h2>
              <p>
                Descubre los textos y materiales más recientes de nuestro
                equipo, donde compartimos hallazgos e ideas que fomentan el
                conocimiento y la discusión. Cada entrada es una oportunidad
                para ampliar tu comprensión sobre temas relevantes.
              </p>
            </Slide>
            <Separator height={20}></Separator>
            <PublicationsCarrousel></PublicationsCarrousel>
          </div>
          <Separator height={20} backgroundColor="#266c66"></Separator>
        </div>
      </div>
    </BasicLayout>
  );
}
