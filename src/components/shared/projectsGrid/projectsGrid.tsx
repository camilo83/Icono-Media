import { useState } from 'react';
import './projectsGrid.scss';
import { useNavigate } from 'react-router-dom';
import { Entity } from '../../../model/entity';

type PropsType = {
  projects: Entity[];
  type: string;
};

export function ProjectsGrid({ projects, type }: PropsType) {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const renderProject = (project: Entity, index: number) => {
    if (hoveredIndex === index) {
      return (
        <img
          onClick={() => handleDetailsPage(project.slug)}
          src={
            project.acf.image ? project.acf.image : '/photos-coming-soon.jpg'
          }
          alt={project.acf.title}
        />
      );
    } else if (
      hoveredIndex !== null &&
      ((hoveredIndex % 2 === 0 && index === hoveredIndex + 1) ||
        (hoveredIndex % 2 !== 0 && index === hoveredIndex - 1))
    ) {
      const isEven = hoveredIndex % 2 === 0;
      return (
        <div className="info-box">
          {isEven ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="226"
                viewBox="0 0 18 226"
                fill="none"
                className="snake-svg"
              >
                <path
                  d="M2 1L16 15L2 29L16 43L2 57L16 71L2 85L16 99L2 113L16 127L2 141L16 155L2 169L16 183L2 197L16 211L2 225"
                  stroke="#F0EDD6"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <div>
                <h3>{projects[hoveredIndex].acf.title}</h3>
                <p>{projects[hoveredIndex].acf.short_description}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3>{projects[hoveredIndex].acf.title}</h3>
                <p>{projects[hoveredIndex].acf.short_description}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="226"
                viewBox="0 0 18 226"
                fill="none"
                className="snake-svg"
              >
                <path
                  d="M2 1L16 15L2 29L16 43L2 57L16 71L2 85L16 99L2 113L16 127L2 141L16 155L2 169L16 183L2 197L16 211L2 225"
                  stroke="#F0EDD6"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </>
          )}
        </div>
      );
    } else {
      return <div className="empty-div"></div>;
    }
  };

  const handleDetailsPage = (title: string) => {
    navigate(`/${type}/${title}`);
  };

  return (
    <div className="projects-container">
      {hoveredIndex === null ? (
        <ul className="projects-list">
          {projects.map((project, index) => (
            <li
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={
                  project.acf.image
                    ? project.acf.image
                    : '/photos-coming-soon.jpg'
                }
                alt={project.acf.title}
                onClick={() => handleDetailsPage(project.slug)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="projects-list">
          {projects.map((project, index) => (
            <li
              key={project.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {renderProject(project, index)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
