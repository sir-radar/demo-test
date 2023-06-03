import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="bg-[#F0F0F2]">
      {/* <div className="wheel">
        <div className="spinner"></div>
      </div> */}
      <Header />

      <div className="flex min-h-screen px-6 py-[20px]">
        <section>
          <h2>Available Items</h2>
        </section>
        <section></section>
      </div>
    </main>
  );
}
