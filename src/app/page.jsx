
import { FaGoogleDrive } from "react-icons/fa";
import SigninPage from "./signin/page";
import { Apple, CircleFadingPlus } from "lucide-react";

export default function Home() {
  return (
    <main>
      <SigninPage />
    <FaGoogleDrive className="text-3xl text-red-600"/>
    <Apple />
    <CircleFadingPlus />
    </main>
  )
}