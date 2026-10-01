import { useEffect, useState } from 'react';
import { RepoBanners } from '../../../api/banners';
import { Router } from '../router/router';
import { useBanners } from '../../../hooks/useBanner';

const bannerCtrl = new RepoBanners();

export function App() {
  const [loading, setLoading] = useState(true);
  const { setBannersContext } = useBanners();

  useEffect(() => {
    (async () => {
      const banners = await bannerCtrl.getBanners();

      setBannersContext(banners);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div>
      <Router />
    </div>
  );
}
