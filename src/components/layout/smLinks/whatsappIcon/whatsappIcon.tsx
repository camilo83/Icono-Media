import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './whatsappIcon.scss';

export default function WhatsAppButton() {
  return (
    <div className="whatsapp-button">
      <button aria-label="Open-WhatsApp">
        <a
          href="https://wa.me/573136454010"
          aria-label="Open-WhatsApp"
          target="_blank"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
      </button>
    </div>
  );
}
