import { useEffect, useState } from 'react';
import { BasicLayout } from '../../components/layout/basicLayout';
import { ProjectsGrid } from '../../components/shared/projectsGrid/projectsGrid';
import { Separator } from '../../components/shared/separator/separator';
import './graphicArts.scss';
import { RepoEntities } from '../../api/entities';
import { Entity } from '../../model/entity';
import { Slide } from 'react-awesome-reveal';
import { Banner } from '../../api/banners';
import { useBanners } from '../../hooks/useBanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const entityCtrl = new RepoEntities();

export default function GraphicArts() {
  const navigate = useNavigate();
  const color: string = '#ee8c2d';
  const [graphicArts, setGraphicArts] = useState<Entity[]>([]);
  const [banner, setBanner] = useState<Banner>();
  const { bannersState } = useBanners();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraphicArts = async () => {
      const graphicArts = await entityCtrl.getItems('graphicArts');

      const sortedGraphicArts = graphicArts.sort((a, b) => {
        return a.acf.order - b.acf.order;
      });

      setGraphicArts(sortedGraphicArts);

      const documentalsBanner = bannersState.find(
        (banner: Banner) => banner.slug === 'entrevistas-documentales'
      );
      setBanner(documentalsBanner);
      setLoading(false);
    };
    fetchGraphicArts();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <BasicLayout color={color}>
      <Separator height={50} backgroundColor={color}></Separator>
      <div className="ga-background-container">
        <div className="page-container">
          <div className="graphic-arts-page">
            <button onClick={() => navigate('/')}>
              <FontAwesomeIcon icon={faChevronLeft} /> Atrás
            </button>
            <div className="graphic-arts-banner">
              <Slide direction="left" triggerOnce>
                <img src={banner?.acf.Banner} alt="" />
              </Slide>
            </div>
            <Separator height={120} backgroundColor={color}></Separator>
            <ProjectsGrid
              projects={graphicArts}
              type="entrevistas-documentales"
            ></ProjectsGrid>
            <Separator height={80} backgroundColor={color}></Separator>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}
