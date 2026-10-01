import { useEffect, useState } from 'react';
import { BasicLayout } from '../../components/layout/basicLayout';
import { ProjectsGrid } from '../../components/shared/projectsGrid/projectsGrid';
import { Separator } from '../../components/shared/separator/separator';
import { Entity } from '../../model/entity';
import './editorials.scss';
import { RepoEntities } from '../../api/entities';
import { Slide } from 'react-awesome-reveal';
import { Banner } from '../../api/banners';
import { useBanners } from '../../hooks/useBanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const entityCtrl = new RepoEntities();

export default function Editorials() {
  const navigate = useNavigate();
  const color: string = '#266c66';
  const [galleries, setGalleries] = useState<Entity[]>([]);
  const [banner, setBanner] = useState<Banner>();
  const { bannersState } = useBanners();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraphicArts = async () => {
      const graphicArts = await entityCtrl.getItems('editorial');

      const sortedGraphicArts = graphicArts.sort(
        (a, b) => a.acf.order - b.acf.order
      );

      setGalleries(sortedGraphicArts);

      const galeriesBanner = bannersState.find(
        (banner: Banner) => banner.slug === 'series-fotograficas'
      );

      setBanner(galeriesBanner);
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
      <div className="editorials-background-container">
        <div className="page-container">
          <div className="editorials-page">
            <button onClick={() => navigate('/')}>
              <FontAwesomeIcon icon={faChevronLeft} /> Atrás
            </button>
            <div className="editorials-banner">
              <Slide direction="left" triggerOnce>
                <img src={banner?.acf.Banner} alt="" />
              </Slide>
            </div>
            <Separator height={120} backgroundColor={color}></Separator>
            <ProjectsGrid
              projects={galleries}
              type="series-fotograficas"
            ></ProjectsGrid>
            <Separator height={80} backgroundColor={color}></Separator>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}
