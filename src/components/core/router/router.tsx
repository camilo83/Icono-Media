import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ScrollToTop } from '../../shared/scrollToTop';

const Home = lazy(() => import('../../../pages/homePage/homePage'));
const AboutUs = lazy(() => import('../../../pages/aboutUs/aboutUs'));
const Publications = lazy(
  () => import('../../../pages/publications/publications')
);
const GraphicArts = lazy(
  () => import('../../../pages/graphicArts/graphicArts')
);
const Editorials = lazy(() => import('../../../pages/editorials/editorials'));
const DigitalMedia = lazy(
  () => import('../../../pages/digitalMedia/digitalMedia')
);
const DetailsPage = lazy(() => import('../../../pages/details/details'));

export function Router() {
  return (
    <main>
      <Suspense fallback={<div></div>}>
        <ScrollToTop />
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={3000}>
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/nosotros" element={<AboutUs></AboutUs>}></Route>
              <Route
                path="/publicaciones"
                element={<Publications></Publications>}
              ></Route>
              <Route
                path="/entrevistas-documentales"
                element={<GraphicArts></GraphicArts>}
              ></Route>
              <Route
                path="/:type/:title"
                element={<DetailsPage></DetailsPage>}
              ></Route>

              <Route
                path="/series-fotograficas"
                element={<Editorials></Editorials>}
              ></Route>
              <Route
                path="/podcast"
                element={<DigitalMedia></DigitalMedia>}
              ></Route>
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Suspense>
    </main>
  );
}
