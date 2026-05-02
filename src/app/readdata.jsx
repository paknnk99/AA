
import ReadData from "@/operation/read";
import Image from "next/image";
import Link from "next/link";
import DeletePage from "./components/delete";

export default async function DataPage() {
  const data = await ReadData();
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center bg-gradient-to-br from-gray-800 to-black text-white">
      <h1 className="text-4xl font-bold">Data Page</h1>
      <div className="grid grid-cols-3 gap-5">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-4 bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <Image
              src={item.image}
              alt="Profile"
              width={150}
              height={150}
              className="rounded-full border-2 border-yellow-400"
            />

            <p className="text-lg font-semibold">
              Name: <span className="text-yellow-400">{item.name}</span>
            </p>
            <div>
                <Link href={`/update/${item.id}`} className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300">Update</Link>
                <DeletePage id={item.id} />
            </div>
          </div>
          
        ))}
      </div>
    </div>
  );
}
