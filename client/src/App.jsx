import Footer from "@components/Footer";
import Header from "@components/Header";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-200">
      <Header />
      <div className="grow"></div>
      <Footer />
    </div>
  );
};

export default App;
