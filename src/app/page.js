import Banner from "./components/Banner";
import Header from "./components/Header";
import Main from "./components/Main";
import Theme from "./styles/theme";

export default function Home() {
  return (
    <Theme>
      <Header />
      <Banner />
      <Main />
    </Theme>
  );
}
