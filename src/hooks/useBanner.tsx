import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { Banner } from '../api/banners';
import { setBanners } from '../redux/bannerSlice';

export function useBanners() {
  const dispatch = useDispatch<AppDispatch>();

  const bannersState = useSelector(
    (state: RootState) => state.bannersState.banners
  );

  const setBannersContext = (members: Banner[]) => {
    dispatch(setBanners(members));
  };

  return {
    bannersState,
    setBannersContext,
  };
}
