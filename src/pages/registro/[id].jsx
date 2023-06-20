import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Registro({ id }) {
  const Router = useRouter();

  const [registro, setRegistro] = useState({
    id: id,
    data: null,
    tipo: 0,
    receiver: "",
    requester: "",
    destiny: "",
    description: "",
    amount: 0,
  });

  useEffect(() => {
    const lancamentos = JSON.parse(localStorage.getItem("lancamentos"));
    const registro = lancamentos.find((registro) => registro.id == id);
    setRegistro(registro);
  }, []);

  function handleDelete() {
    const result = confirm("Tem certeza que deseja excluir este registro?");
    if (result) {
      const lancamentos = JSON.parse(localStorage.getItem("lancamentos"));
      const lancamentosRestantes = lancamentos.filter((registro) => registro.id != id);
      localStorage.setItem("lancamentos", JSON.stringify(lancamentosRestantes));
      alert("Registro Excluido!");
      return Router.push("/");
    }
  }

  return (
    <main className="w-screen h-screen bg-slate-700 flex justify-center items-center">
      <div className="bg-white rounded shadow-md p-6">
        <h1 className="w-full text-center border-b pb-6 mb-4 uppercase font-bold">Movimentação Nº: {registro.id}</h1>
        <div className="flex justify-around items-center border-b pb-4">
          <label className="text-sm">
            <span>Data: </span>
            <span>{registro.data}</span>
          </label>

          <label className="text-sm">
            <span>Tipo: </span>
            <span className={`font-bold ${registro.tipo === 1 ? "text-emerald-500" : "text-red-400"}`}>
              {registro && registro.tipo === 1 ? "Entrada" : "Saída"}
            </span>
          </label>
        </div>
        <div className="mt-4 flex flex-col justify-center items-start gap-4">
          <div className="flex flex-row justify-evenly items-center gap-8">
            <label className="flex justify-center items-center gap-2">
              <span>{registro.receiver ? "Conferente: " : "Solicitante: "}</span>
              <input
                type="text"
                className="border-b-2 px-2 py-1"
                name={registro.receiver ? "receiver" : "requester"}
                value={registro.receiver ? registro.receiver : registro.requester}
                readOnly={true}
              />
            </label>

            {registro.destiny && (
              <label>
                <span>Destino: </span>
                <input
                  type="text"
                  className="border-b-2 px-2 py-1"
                  name="destiny"
                  value={registro.destiny}
                  readOnly={true}
                />
              </label>
            )}
          </div>

          <label>
            <span>Quantidade: </span>
            <input
              className="border-b-2 px-2 py-1"
              type="number"
              name="amount"
              value={registro.amount}
              readOnly={true}
            />
          </label>

          <label className="w-full flex flex-col ">
            <span className="pb-2">Observações: </span>
            <textarea
              className="w-full border-b-2 border-gray-300 px-1 py-1 h-20"
              name="description"
              value={registro.description}
              readOnly={true}
            />
          </label>
        </div>

        <div className="pt-4 flex justify-between items-center border-t mt-4">
          <Link href="/" className="hover:underline">
            Voltar
          </Link>
          <button onClick={handleDelete} className="text-gray-300 hover:text-red-500 hover:font-bold">
            Excluir?
          </button>
        </div>
      </div>
    </main>
  );
}

export function getServerSideProps(context) {
  const id = context.query.id;

  return {
    props: {
      id: id,
    },
  };
}
