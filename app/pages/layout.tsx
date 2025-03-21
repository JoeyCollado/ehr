import Navbar from "../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="h-screen flex flex-col">
        <Navbar/>
        <main className="flex-grow">{children}</main>
      </div>
    );
  }
  
