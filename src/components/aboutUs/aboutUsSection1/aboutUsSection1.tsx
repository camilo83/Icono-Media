import { useEffect, useState } from 'react';
import { AboutUsEntry } from '../../../api/aboutUs';
import './aboutUsSection1.scss';

type Propstype = {
  entry: AboutUsEntry;
};

export default function AboutUsSection1({ entry }: Propstype) {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    const listText = entry.acf.list.split('*');
    setList(listText);
  }, []);

  return (
    <section className="section-about-us-1">
      <div className="section-intro">
        {entry.acf.title && <h3>{entry.acf.title}</h3>}
        {entry.acf.description && <p>{entry.acf.description}</p>}
        {entry.acf.list && (
          <ul>
            {list.map((item, index) => (
              <li key={index}>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="images">
        <img
          src={entry.acf.image1 ? entry.acf.image1 : '/aboutUs/aboutUs2.jpg'}
          alt={entry.acf.title}
        />
        <div>
          <img
            src={entry.acf.image2 ? entry.acf.image2 : '/aboutUs/aboutUs2.jpg'}
            alt={entry.acf.title}
          />
          <img
            src={entry.acf.image3 ? entry.acf.image3 : '/aboutUs/aboutUs2.jpg'}
            alt={entry.acf.title}
          />
        </div>
      </div>
    </section>
  );
}
