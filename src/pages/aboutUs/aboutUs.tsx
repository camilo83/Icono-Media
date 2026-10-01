import { Fade } from 'react-awesome-reveal';
import { AboutUsNumbers } from '../../components/aboutUs/aboutUsNumbers/aboutUsNumbers';
import AboutUsSection1 from '../../components/aboutUs/aboutUsSection1/aboutUsSection1';
import AboutUsSection2 from '../../components/aboutUs/aboutUsSection2/aboutUsSection2';
import { TeamCarrousel } from '../../components/aboutUs/teamCarrousel/teamCarrousel';
import { BasicLayout } from '../../components/layout/basicLayout';
import { Separator } from '../../components/shared/separator/separator';
import './aboutUs.scss';
import { useEffect, useState } from 'react';
import { AboutUsEntry, RepoAboutUs } from '../../api/aboutUs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Banner } from '../../api/banners';
import { useBanners } from '../../hooks/useBanner';

const publicationCtrl = new RepoAboutUs();

export default function AboutUs() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<AboutUsEntry[]>([]);
  const [banner, setBanner] = useState<Banner>();
  const { bannersState } = useBanners();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const entriesList = await publicationCtrl.getEntries();
        const orderedEntries = entriesList.sort((a, b) => {
          return parseFloat(a.acf.indice) - parseFloat(b.acf.indice);
        });

        setEntries(orderedEntries);

        const documentalsBanner = bannersState.find(
          (banner: Banner) => banner.slug === 'about-us'
        );
        setBanner(documentalsBanner);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching publications List:', error);
      }
    };
    fetchPublications();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <BasicLayout color="#ee8c2d">
      <Separator height={80} backgroundColor="#ee8c2d"></Separator>
      <div className="about-us-page-container">
        <div className="page-container">
          <div className="about-us-page">
            <button onClick={() => navigate('/')}>
              <FontAwesomeIcon icon={faChevronLeft} /> Atrás
            </button>
            <Fade direction="left" className="fade-class" triggerOnce>
              <img src={banner?.acf.Banner} alt="" className="about-us-img" />
              <Separator height={40}></Separator>

              <h2>Somos Iconomediáticos</h2>
              <p>
                Diseñaremos una estrategia de comunicación transmedia para la
                difusión de proyectos asociados a los sectores editorial, medios
                digitales y diseño de las industrias creativas y culturales de
                Medellín para fortalecer la formación de públicos.
              </p>
            </Fade>
            <Separator height={100}></Separator>
            <AboutUsNumbers></AboutUsNumbers>
            <Separator height={100}></Separator>
            <Fade direction="left" triggerOnce>
              <AboutUsSection1 entry={entries[0]}></AboutUsSection1>
              <Separator height={100}></Separator>
              <AboutUsSection2 entry={entries[1]}></AboutUsSection2>
              <Separator height={100}></Separator>
            </Fade>
          </div>
          <TeamCarrousel></TeamCarrousel>
          <Separator height={100}></Separator>
          <div className="about-us-page">
            <Fade direction="left" triggerOnce>
              <AboutUsSection1 entry={entries[2]}></AboutUsSection1>
            </Fade>
          </div>
          <div className="about-us-page">
            <Separator height={120}></Separator>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}
