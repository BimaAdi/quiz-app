import Footer from "@/client/components/home/Footer";
import Navbar from "@/client/components/home/Navbar";
import { appRouter } from "@/server/router";


export default async function HomePage() {
  const result = await appRouter.createCaller({ user: null, session: null }).hello();

  return (
    <div className="min-w-screen min-h-screen relative bg-slate-200">
      <Navbar />
      <main className="p-5">
        <p>{result}</p>
      </main>
      <Footer />
    </div>
  )
}
