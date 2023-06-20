import Link from "next/link";

import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from "react-icons/bs";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { FiMoreHorizontal } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Home() {
  const [ultimosLancamentos, setUltimosLancamentos] = useState([]);
  const [estoque, setEstoque] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("lancamentos");
    if (data) {
      const lancamentos = JSON.parse(data);
      const ultimosCinco = lancamentos.filter((_, index) => index >= lancamentos.length - 5);
      setUltimosLancamentos(ultimosCinco);
      const total = lancamentos.reduce(
        (total, registro) =>
          registro.tipo === 1 ? total + parseInt(registro.amount) : total - parseInt(registro.amount),
        0
      );
      setEstoque(total);
    }
  }, []);

  return (
    <main className="w-screen h-screen bg-slate-700 flex justify-center items-center">
      <section className="bg-white rounded shadow-md p-8 flex flex-col justify-center items-center gap-x-8 gap-y-4">
        <div className="flex flex-row justify-center items-center gap-8 pb-4">
          <Link
            href="/entrada"
            className="rounded shadow-md py-2 px-4 bg-emerald-500 hover:bg-emerald-400 text-white uppercase font-bold flex gap-4 justify-around items-center"
          >
            <span>
              <RiLoginBoxLine size={26} />
            </span>
            <span>Nova entrada</span>
          </Link>

          <Link
            href="/saida"
            className="rounded shadow-md py-2 px-4 bg-red-400 hover:bg-red-300 text-white uppercase font-bold flex gap-4 justify-around items-center"
          >
            <span>
              <RiLogoutBoxLine size={26} />
            </span>
            <span>Nova saída</span>
          </Link>
        </div>
        <hr className="w-full h-1 border-gray-400" />
        <div className="w-full">
          <div>
            <h1 className="text-center font-medium text-lg border-b pb-6">Estoque Total: {estoque}</h1>
          </div>
        </div>
        <div className="w-full">
          {ultimosLancamentos.length ? (
            <div>
              <h1 className="text-center font-medium text-lg mb-4">Últimos lançamentos:</h1>

              <ul>
                {ultimosLancamentos.map((registro) => (
                  <li
                    key={registro.id}
                    className="text-sm flex flex-row justify-between items-center border-b py-2 hover:bg-slate-100"
                  >
                    <span className="px-2">
                      {registro.tipo === 1 ? (
                        <BsFillArrowRightSquareFill className="text-emerald-600" />
                      ) : (
                        <BsFillArrowLeftSquareFill className="text-red-400" />
                      )}
                    </span>
                    <span className="border-r pr-2">{registro.data}</span>
                    <span className="w-full text-left border-r pl-2">
                      {registro.receiver
                        ? registro.receiver.slice(0, 16) + "..."
                        : registro.requester.slice(0, 16) + "..."}
                    </span>
                    <Link href={`/registro/${registro.id}`} className="px-2">
                      <FiMoreHorizontal />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </main>
  );
}
