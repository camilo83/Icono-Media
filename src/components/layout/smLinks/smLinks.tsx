import './smLinks.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export function SmLinks() {
  return (
    <div className="sm-links">
      <button aria-label="Open Instagram">
        <a
          href="https://www.instagram.com/iconomediasemillero/"
          aria-label="Visit Instagram Profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </button>

      <button aria-label="Open YouTube">
        <a
          href="https://www.youtube.com/@semilleroiconomedia"
          aria-label="Visit YouTube Channel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </button>

      <button aria-label="Send Email">
        <a
          href="mailto:iconomediasemillero@gmail.com"
          aria-label="Send an Email"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </button>
    </div>
  );
}
