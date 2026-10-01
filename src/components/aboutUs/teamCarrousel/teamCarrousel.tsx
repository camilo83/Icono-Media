import { useEffect, useState } from 'react';
import './teamCarrousel.scss';
import { Member } from '../../../model/entity';
import { RepoMembers } from '../../../api/members';

const teamCtrl = new RepoMembers();

export function TeamCarrousel() {
  const [team, setTeam] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const members = await teamCtrl.getMembers();

        // Ordenar por teammember.acf.order de mayor a menor
        const sortedMembers = members.sort(
          (a, b) => (a.acf.order ?? 0) - (b.acf.order ?? 0)
        );

        setTeam(sortedMembers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    fetchMembers();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevMember = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? team.length - 1 : prevIndex - 1
    );
  };

  const handleNextMember = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === team.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentMember = team[currentIndex];

  if (loading || team.length === 0) return null;
  return (
    <section className="carrousel">
      <div className="carrousel-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="49"
          viewBox="0 0 27 49"
          fill="none"
          onClick={handlePrevMember}
        >
          <path
            d="M0.856168 25.9706L23.4965 47.5425C23.8742 47.9026 24.3761 48.1035 24.898 48.1035C25.42 48.1035 25.9218 47.9026 26.2996 47.5425L26.324 47.5181C26.5077 47.3435 26.6541 47.1334 26.7541 46.9005C26.8541 46.6676 26.9056 46.4168 26.9056 46.1633C26.9056 45.9098 26.8541 45.659 26.7541 45.4261C26.6541 45.1932 26.5077 44.983 26.324 44.8084L5.00398 24.4959L26.324 4.19157C26.5077 4.01699 26.6541 3.80685 26.7541 3.57393C26.8541 3.34101 26.9056 3.09019 26.9056 2.83672C26.9056 2.58325 26.8541 2.33243 26.7541 2.09951C26.6541 1.8666 26.5077 1.65645 26.324 1.48188L26.2996 1.4575C25.9218 1.09738 25.42 0.896487 24.898 0.896487C24.3761 0.896487 23.8742 1.09738 23.4965 1.4575L0.856168 23.0294C0.657056 23.2191 0.498541 23.4473 0.390231 23.7C0.281922 23.9528 0.226073 24.225 0.226073 24.5C0.226073 24.775 0.281922 25.0472 0.390231 25.3C0.498541 25.5528 0.657056 25.7809 0.856168 25.9706Z"
            fill="#F0EDD6"
          />
        </svg>
        <div className="member-info">
          <div className="image-container">
            <img src={currentMember.acf.image} alt={currentMember.acf.name} />
          </div>
          <div className="info-container">
            <h3>{currentMember.acf.name}</h3>
            <p>{currentMember.acf.description}</p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="49"
          viewBox="0 0 27 49"
          fill="none"
          onClick={handleNextMember}
        >
          <path
            d="M26.1437 23.0294L3.5034 1.4575C3.12563 1.09738 2.62374 0.896483 2.10183 0.896483C1.57992 0.896483 1.07804 1.09738 0.700273 1.4575L0.675896 1.48187C0.492128 1.65645 0.345798 1.86659 0.245806 2.0995C0.145813 2.33242 0.0942477 2.58324 0.0942477 2.83671C0.0942477 3.09019 0.145813 3.34101 0.245806 3.57393C0.345798 3.80684 0.492128 4.01698 0.675896 4.19156L21.9959 24.5041L0.675894 44.8084C0.492126 44.983 0.345797 45.1932 0.245804 45.4261C0.145811 45.659 0.0942459 45.9098 0.0942458 46.1633C0.0942458 46.4168 0.145811 46.6676 0.245804 46.9005C0.345796 47.1334 0.492126 47.3435 0.675894 47.5181L0.700271 47.5425C1.07804 47.9026 1.57992 48.1035 2.10183 48.1035C2.62374 48.1035 3.12563 47.9026 3.50339 47.5425L26.1437 25.9706C26.3428 25.7809 26.5013 25.5527 26.6096 25.3C26.718 25.0472 26.7738 24.775 26.7738 24.5C26.7738 24.225 26.718 23.9528 26.6096 23.7C26.5013 23.4472 26.3428 23.2191 26.1437 23.0294Z"
            fill="#F0EDD6"
          />
        </svg>
      </div>
    </section>
  );
}
