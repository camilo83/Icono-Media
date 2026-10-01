import { useNavigate, useParams } from 'react-router-dom';
import './details.scss';
import { BasicLayout } from '../../components/layout/basicLayout';
import { Separator } from '../../components/shared/separator/separator';
import { useEffect, useState } from 'react';
import { ProjectImagesCarrousel } from '../../components/details/projectImagesCarrousel/projectImagesCarrousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { RepoEntities } from '../../api/entities';
import { Entity } from '../../model/entity';
import { ProjectImagesGallery } from '../../components/details/projectImagesGallery/projectImagesGallery';
import { Fade } from 'react-awesome-reveal';

const entityCtrl = new RepoEntities();

export default function Details() {
  const { type, title } = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState<string[]>([]);
  const [project, setProject] = useState<Entity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [embedVideo, setEmbedVideo] = useState<string>('');
  const [color, setColor] = useState<string>();

  useEffect(() => {
    const fetchEntity = async () => {
      if (type && title) {
        let entity;
        let color;
        if (type === 'entrevistas-documentales') {
          color = '#ee8c2d';
          entity = await entityCtrl.getItem('graphicArts', title);
        } else if (type === 'series-fotograficas') {
          color = '#266c66';
          entity = await entityCtrl.getItem('editorial', title);
        } else {
          color = '#ee8c2d';
          entity = await entityCtrl.getItem('digitalMedia', title);
        }

        setColor(color);
        setProject(entity);

        if (type === 'entrevistas-documentales') {
          if (entity?.acf) {
            setImages(
              [
                entity.acf?.carrousel_Image1 || '',
                entity.acf?.carrousel_Image2 || '',
                entity.acf?.carrousel_Image3 || '',
                entity.acf?.carrousel_Image4 || '',
                entity.acf?.carrousel_Image5 || '',
                entity.acf?.carrousel_Image6 || '',
                entity.acf?.carrousel_Image7 || '',
                entity.acf?.carrousel_Image8 || '',
              ].filter(Boolean)
            );
          }
        }

        if (type === 'series-fotograficas' && entity?.acf) {
          const images = [];
          for (let i = 1; i <= 30; i++) {
            const imageKey = `galleryImage_${i}` as keyof typeof entity.acf;
            const image = entity.acf[imageKey] || '';
            if (image) {
              images.push(image);
            }
          }
          setImages(images.map(String));
        }

        if (entity.acf?.video) {
          const videoId = entity.acf?.video.split('v=')[1].split('&')[0];
          setEmbedVideo(videoId);
        }

        setLoading(false);
      }
    };
    fetchEntity();
  }, [title]);

  const handleCategoryPage = () => {
    if (type === 'entrevistas-documentales') {
      navigate('/entrevistas-documentales');
    } else if (type === 'series-fotograficas') {
      navigate('/series-fotograficas');
    } else {
      navigate('/podcast');
    }
  };

  const renderDescription = (description: string) => {
    const descriptionArray = description
      .split('$')
      .map((paragraph, index) => <p key={index}>{paragraph}</p>);

    return descriptionArray;
  };

  if (loading) {
    return null;
  }

  return (
    <BasicLayout color={color}>
      <Separator height={50} backgroundColor={color}></Separator>
      <div
        className="details-background-container"
        style={{ backgroundColor: color }}
      >
        <div className="page-container">
          {project ? (
            <div className="details-page" style={{ backgroundColor: color }}>
              <section className="section-1">
                <button onClick={() => handleCategoryPage()}>
                  <FontAwesomeIcon icon={faChevronLeft} /> Atrás
                </button>
                <Separator height={40}></Separator>
                <Fade direction="left" triggerOnce>
                  <h2>{project.acf?.title || 'Título no disponible'}</h2>
                </Fade>

                <Fade delay={200} duration={2000} triggerOnce>
                  <img
                    className="png-image"
                    src={project.acf.banner_image}
                    alt=""
                  />
                </Fade>

                <Separator height={10} backgroundColor={color}></Separator>
              </section>
              <div className="relative-container">
                <img src="/wave.png" alt="" className="wave" />

                <section className="section-2">
                  <div>
                    <Fade direction="left" triggerOnce>
                      <p className="our-team">{project.acf.subtitle}</p>
                      <p className="description">
                        {project.acf?.description ? (
                          <div>
                            {renderDescription(project.acf.description)}
                          </div>
                        ) : (
                          'Descripción no disponible'
                        )}
                      </p>
                    </Fade>

                    <div className="little-images">
                      {type === 'entrevistas-documentales' && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="226"
                          viewBox="0 0 18 226"
                          fill="none"
                        >
                          <path
                            d="M2 1L16 15L2 29L16 43L2 57L16 71L2 85L16 99L2 113L16 127L2 141L16 155L2 169L16 183L2 197L16 211L2 225"
                            stroke="#3C3688"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                      )}
                      {type === 'entrevistas-documentales' && (
                        <Fade
                          direction="left"
                          triggerOnce
                          className="fade-video"
                        >
                          <section className="section-3">
                            <div className="video-container">
                              <iframe
                                src={`https://www.youtube.com/embed/${
                                  embedVideo || ''
                                }`}
                                title="YouTube video player"
                                allowFullScreen
                              ></iframe>
                            </div>
                            <p>Entrevista Completa</p>
                            <a
                              href={project.acf?.video || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {project.acf?.video || 'Video no disponible'}
                            </a>
                          </section>
                        </Fade>
                      )}
                      {type === 'podcast' && (
                        <>
                          <Separator height={100}></Separator>
                          <Fade
                            direction="up"
                            triggerOnce
                            delay={300}
                            className="fade-video"
                          >
                            <section className="section-5">
                              <iframe
                                src="https://open.spotify.com/embed/episode/3g2tOEtEvfHK9rS403SfBe"
                                width="300"
                                height="380"
                                frameBorder="0"
                                allowTransparency={true}
                                allow="encrypted-media"
                              ></iframe>
                            </section>
                          </Fade>
                        </>
                      )}
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="538"
                    height="981"
                    viewBox="0 0 538 981"
                    fill="none"
                    className="ear-svg"
                  >
                    <g clip-path="url(#clip0_86_645)">
                      <path
                        d="M635.565 242.965C627.464 214.778 614.03 184.606 597.83 158.006C567.207 107.984 526.706 68.6801 477.513 41.6837C423.578 12.1068 359.764 -2.5824 297.334 0.395144C227.989 3.76969 164.175 28.1855 112.611 71.2606C-23.3137 185.003 1.38188 364.052 2.3697 371.794C4.34535 385.49 16.9895 395.018 30.6215 392.835C44.2534 390.85 53.7365 378.146 51.5633 364.449C51.3657 362.662 45.4388 321.969 55.1195 269.168C67.1709 202.868 97.2008 149.272 144.419 109.77C241.225 28.9795 369.247 39.3017 453.212 85.5528C547.056 137.163 579.654 229.666 587.359 256.662C615.413 354.524 586.371 448.416 553.18 499.232C544.29 512.929 532.831 528.214 532.633 528.412C513.667 554.019 498.455 570.495 485.02 585.184C464.671 607.416 448.471 625.083 435.036 657.439C428.912 672.128 424.368 687.611 421.404 703.491C415.873 732.87 417.848 752.522 419.626 769.791C420.812 781.106 421.8 790.833 420.812 802.743C419.429 819.417 413.502 845.222 393.548 872.417C389.596 877.777 353.442 925.219 293.975 930.38C239.447 935.144 185.315 903.582 155.68 849.986C148.963 837.878 133.75 833.511 121.699 840.26C109.647 847.009 105.301 862.294 112.018 874.402C148.37 940.305 214.554 980.998 283.307 980.998C288.246 980.998 293.185 980.8 298.124 980.403C377.94 973.654 425.158 914.103 433.653 902.193C454.793 873.211 467.635 840.26 470.4 807.11C471.783 790.237 470.4 777.334 469.215 764.63C467.635 748.75 466.252 734.855 470.4 712.821C472.771 700.315 476.327 688.207 481.069 676.892C491.145 652.675 502.603 640.169 521.57 619.326C535.004 604.637 551.797 586.176 572.344 558.585C572.937 557.989 584.79 541.91 594.669 527.023C616.401 494.071 632.996 451.592 641.689 407.921C652.753 351.943 650.579 296.561 635.367 243.164L635.565 242.965Z"
                        fill="#3E3293"
                        fill-opacity="0.2"
                      />
                      <path
                        d="M493.714 374.971C507.544 374.971 518.805 364.054 519.002 350.158C519.2 332.492 516.632 240.982 443.533 183.218C367.273 123.071 251.105 128.034 184.328 193.937C131.776 245.944 121.897 323.559 134.937 373.979C136.122 378.544 137.505 382.911 137.703 383.705C142.839 399.387 156.669 441.271 193.811 457.151C216.926 466.878 245.178 465.091 267.503 452.189C290.618 438.889 297.928 419.039 303.262 404.548C307.806 392.439 310.374 385.889 318.277 380.331C332.106 370.604 351.665 371.2 364.704 376.162C381.3 382.514 389.993 396.409 393.154 401.571C405.6 421.818 406.588 449.807 396.117 480.575C390.783 495.859 386.041 500.623 377.151 509.159C367.668 518.29 356.012 529.605 342.775 553.425C326.377 582.803 321.043 607.616 316.696 627.467C311.56 650.691 308.794 661.411 296.149 671.137C292.593 673.916 282.913 681.261 271.059 681.261C252.29 681.261 231.348 662.205 219.099 633.62C213.567 620.916 198.948 615.159 186.304 620.519C173.659 626.077 167.93 640.766 173.264 653.47C193.811 701.508 231.348 731.283 271.059 731.283C299.706 731.283 319.66 715.999 326.179 711.036C354.036 689.796 359.765 663.594 365.297 638.384C369.446 619.923 373.595 600.867 386.239 578.039C395.92 560.77 403.427 553.425 411.725 545.485C422.196 535.361 434.247 523.848 443.335 496.852C458.745 451.792 455.979 408.717 435.63 375.368C430.493 367.031 414.886 341.424 382.09 329.316C351.072 317.802 314.918 321.772 289.63 339.439C268.688 354.128 261.576 373.383 256.439 387.278C251.895 399.387 249.722 404.747 242.609 408.915C233.917 413.878 221.668 414.87 212.975 411.099C196.577 404.151 188.082 378.147 184.723 368.222C184.723 367.627 183.538 364.451 182.747 361.473C174.845 330.705 177.808 270.36 218.902 229.866C267.503 181.63 356.209 178.454 412.318 222.72C467.043 265.795 468.821 335.866 468.623 349.563C468.623 363.458 479.49 374.773 493.319 374.971H493.714Z"
                        fill="#3E3293"
                        fill-opacity="0.2"
                      />
                      <path
                        d="M257.624 823.587C257.624 837.681 268.885 848.995 282.912 848.995C296.939 848.995 308.201 837.681 308.201 823.587C308.201 809.493 296.939 798.179 282.912 798.179C268.885 798.179 257.624 809.493 257.624 823.587Z"
                        fill="#3E3293"
                        fill-opacity="0.2"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_86_645">
                        <rect width="649" height="981" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </section>
                {type === 'artes-graficsas' && (
                  <ProjectImagesCarrousel
                    images={images}
                  ></ProjectImagesCarrousel>
                )}
                {type === 'series-fotograficas' && (
                  <>
                    <Separator height={60}></Separator>
                    <ProjectImagesGallery
                      images={images}
                    ></ProjectImagesGallery>
                    <Separator height={60}></Separator>
                  </>
                )}
                <section className="section-4">
                  {project.acf?.instagram && (
                    <div>
                      <Fade direction="up" triggerOnce>
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                        <a
                          href={`https://instagram.com/${project.acf.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.acf.instagram}
                        </a>
                      </Fade>
                    </div>
                  )}
                  {project.acf?.instagram_2 && (
                    <div>
                      <Fade direction="up" delay={400} triggerOnce>
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                        <a
                          href={`https://instagram.com/${project.acf.instagram_2}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.acf.instagram_2}
                        </a>
                      </Fade>
                    </div>
                  )}
                </section>
              </div>
            </div>
          ) : (
            <div>No se encontró el proyecto</div>
          )}
        </div>
      </div>
    </BasicLayout>
  );
}
