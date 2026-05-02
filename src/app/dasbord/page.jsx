import DeleteToken from "@/actions/logout";
import getSession from "@/actions/session";
import Image from "next/image";
import DataPage from "../readdata";

export default async function Dashboard() {
  const token = await getSession();

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <nav className="flex justify-between items-center px-6 md:px-20 py-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-yellow-400">BurgerHub</h1>

        <div className="flex gap-6 items-center">
          <a href="#" className="hover:text-yellow-400">
            Home
          </a>
          <a href="#" className="hover:text-yellow-400">
            Menu
          </a>
          <a href="#" className="hover:text-yellow-400">
            Contact
          </a>

          <button
            onClick={DeleteToken}
            className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300"
          >
            Logout
          </button>
        </div>
      </nav>

      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20">
        <div className="max-w-xl">
          <span className="text-yellow-400 uppercase text-xs tracking-widest font-bold">
            Fresh & Delicious
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mt-4 leading-tight">
            <span className="text-white">Bold</span>
            <br />
            <span className="text-yellow-400">Flavors</span> Real Beef
          </h1>

          <p className="text-gray-400 mt-6">
            Premium burgers, crispy fries, and unforgettable taste.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg font-semibold transition">
              View Menu
            </button>
            <button className="border border-gray-500 hover:border-white px-6 py-2 rounded-lg transition">
              Order Online
            </button>
          </div>
        </div>

        <img
          src="/images/img-one4.jpg"
          className="w-[280px] md:w-[400px] rounded-full mt-10 md:mt-0 shadow-[0_0_60px_rgba(255,200,0,0.3)] hover:scale-105 transition"
        />
      </section>

      <section className="px-6 md:px-20 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Featured Burgers
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Classic Hub",
              price: "$12.99",
              img: "/images/img-one3.png",
            },
            {
              name: "Spicy Inferno",
              price: "$15.49",
              img: "/images/img-one2.jpg",
            },
            {
              name: "Mushroom Melt",
              price: "$14.99",
              img: "/images/img-one1.jpg",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:scale-105 hover:border-yellow-400 transition duration-300"
            >
              <img src={item.img} className="w-full h-52 object-cover" />

              <div className="p-4">
                <h3 className="text-xl font-bold">{item.name}</h3>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-yellow-400 font-bold text-lg">
                    {item.price}
                  </span>

                  <button className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300">
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 text-center py-12 bg-yellow-500 text-black">
        {[
          { num: "14K+", label: "Customers" },
          { num: "7+", label: "Burgers" },
          { num: "98%", label: "Satisfaction" },
          { num: "9+", label: "Years" },
        ].map((stat, i) => (
          <div key={i}>
            <h2 className="text-3xl font-extrabold">{stat.num}</h2>
            <p className="text-sm uppercase">{stat.label}</p>
          </div>
        ))}
      </section>
      <section>
        <DataPage />
      </section>
    </main>
  );
}
