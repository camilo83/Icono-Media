import { Footer } from './footer/footer';
import { Header } from './header/header';
import { SmLinks } from './smLinks/smLinks';

type PropsType = {
  children: any;
  color?: string;
};

export function BasicLayout({ children, color }: PropsType) {
  return (
    <>
      <Header color={color}></Header>
      {children}
      <SmLinks></SmLinks>
      <Footer></Footer>
    </>
  );
}
