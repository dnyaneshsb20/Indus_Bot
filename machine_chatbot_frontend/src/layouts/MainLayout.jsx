import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="h-[calc(100vh-64px)] bg-gray-950">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
