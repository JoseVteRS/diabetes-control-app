import Image from "next/image";
import { Inter } from "next/font/google";
import Form from "@/components/Form";
import { openDB } from "@/lib/db";

const inter = Inter({ subsets: ["latin"] });


export async function getServerSideProps() {
  const db = openDB();
  const data = db.prepare('SELECT * FROM users').all();
  db.close();
  return {
    props: { data },
  };
}

export default function Home() {
  return (
    <main>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
          <Form />
        </div>
      </div>
    </main>
  );
}


