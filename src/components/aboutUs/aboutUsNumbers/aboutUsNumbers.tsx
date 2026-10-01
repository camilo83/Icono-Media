import { useEffect, useRef, useState } from 'react';
import { CountUp } from 'countup.js';
import './aboutUsNumbers.scss';
import { RepoEntities } from '../../../api/entities';
import { Entity, Publication } from '../../../model/entity';
import { Fade } from 'react-awesome-reveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { RepoPublications } from '../../../api/publications';

const entityCtrl = new RepoEntities();
const publicationCtrl = new RepoPublications();

export function AboutUsNumbers() {
  const [interviews, setInterviews] = useState<Entity[]>([]);
  const [galleries, setGalleries] = useState<Entity[]>([]);
  const [podcasts, setPodcasts] = useState<Entity[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [popUpContent, setPopUpContent] = useState<Entity[] | Publication[]>(
    []
  );
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [selectedEntitySlug, setSelectedEntitySlug] = useState<string | null>(
    null
  );

  const countUpRef1 = useRef<HTMLParagraphElement>(null);
  const countUpRef2 = useRef<HTMLParagraphElement>(null);
  const countUpRef3 = useRef<HTMLParagraphElement>(null);
  const countUpRef4 = useRef<HTMLParagraphElement>(null);
  const popUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEntities = async () => {
      const interviewsList = await entityCtrl.getItems('graphicArts');
      const galleriesList = await entityCtrl.getItems('editorial');
      const podcastsList = await entityCtrl.getItems('digitalMedia');
      const publicationsList = await publicationCtrl.getPublications();

      setInterviews(interviewsList);
      setGalleries(galleriesList);
      setPodcasts(podcastsList);
      setPublications(publicationsList);

      const options = { enableScrollSpy: true, duration: 7, startVal: 0 };
      if (countUpRef1.current)
        new CountUp(
          countUpRef1.current,
          interviewsList.length,
          options
        ).start();
      if (countUpRef2.current)
        new CountUp(countUpRef2.current, galleriesList.length, options).start();
      if (countUpRef3.current)
        new CountUp(countUpRef3.current, podcastsList.length, options).start();
      if (countUpRef4.current)
        new CountUp(
          countUpRef4.current,
          publicationsList.length,
          options
        ).start();
    };
    fetchEntities();
  }, []);

  const openPopUp =
    (entities: Entity[] | Publication[], type: string) => () => {
      setPopUpContent(entities);
      setSelectedEntity(type);
      setSelectedEntitySlug(
        type === 'Entrevistas Documentales'
          ? 'entrevistas-documentales'
          : type === 'Series Fotográficas'
          ? 'series-fotograficas'
          : type === 'podcast'
          ? 'podcast'
          : 'publicaciones'
      );
      setShowPopUp(true);
    };

  const closePopUp = () => setShowPopUp(false);

  return (
    <section className="section-numbers">
      <Fade triggerOnce direction="up" className="fade-number">
        <div onClick={openPopUp(interviews, 'Entrevistas Documentales')}>
          <div>
            <p className="number" ref={countUpRef1}></p>
          </div>
          <p>Entrevistas Documentales</p>
        </div>
      </Fade>
      <Fade triggerOnce direction="up" delay={200} className="fade-number">
        <div onClick={openPopUp(galleries, 'Series Fotográficas')}>
          <div>
            <p className="number" ref={countUpRef2}></p>
          </div>
          <p>Series Fotográficas</p>
        </div>
      </Fade>
      <Fade triggerOnce direction="up" delay={200} className="fade-number">
        <div onClick={openPopUp(podcasts, 'Podcast')}>
          <div>
            <p className="number" ref={countUpRef3}></p>
          </div>
          <p>Podcast</p>
        </div>
      </Fade>
      <Fade triggerOnce direction="up" delay={200} className="fade-number">
        <div onClick={openPopUp(publications, 'Publications')}>
          <div>
            <p className="number" ref={countUpRef4}></p>
          </div>
          <p>Publicaciones</p>
        </div>
      </Fade>
      {showPopUp && (
        <Fade direction="up" className="fade-class-numbers">
          <div className="popup" ref={popUpRef}>
            <span className="close" onClick={closePopUp}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <h3>{selectedEntity}</h3>
            <div className="projects-list">
              {popUpContent.map((entity, index) => (
                <div key={index} className="project-item">
                  <FontAwesomeIcon icon={faChevronRight} />
                  <a
                    href={
                      selectedEntitySlug === 'publicaciones'
                        ? `/${selectedEntitySlug}`
                        : `/${selectedEntitySlug}/${
                            'slug' in entity ? entity.slug : ''
                          }`
                    }
                    className="popup-item"
                  >
                    {entity.acf.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      )}
    </section>
  );
}
