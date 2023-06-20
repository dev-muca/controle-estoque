import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Entrada() {
  const Router = useRouter();
  const [id, setId] = useState(null);
  const [hoje, setHoje] = useState(null);

  const [registro, setRegistro] = useState({
    id: id,
    data: null,
    tipo: 1,
    receiver: "",
    description: "",
    amount: 0,
  });

  useEffect(() => {
    const data = new Date();
    const id = data.getTime();
    const dia = data.getDate();
    const mes = data.getMonth() < 9 ? `0${data.getMonth() + 1}` : data.getMonth();
    const ano = data.getFullYear();
    const hoje = `${dia}/${mes}/${ano}`;
    setId(id);
    setHoje(hoje);
    setRegistro({
      id: id,
      data: hoje,
      tipo: 1,
      receiver: "",
      description: "",
      amount: 0,
    });
  }, []);

  function handleInput(e) {
    const { name, value } = e.target;
    setRegistro((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { receiver, amount } = registro;

    if (!receiver || !amount) return alert("Informe quem conferiu e a quantidade!");

    const lancamentos = localStorage.getItem("lancamentos");

    if (!lancamentos) {
      localStorage.setItem("lancamentos", JSON.stringify([registro]));
      alert("Lançamento feito com sucesso!");
      return Router.push("/");
    }

    const lancamentosAnteriores = JSON.parse(lancamentos);
    const lista = [...lancamentosAnteriores, registro];
    localStorage.setItem("lancamentos", JSON.stringify(lista));
    alert("Lançamento feito com sucesso!");
    Router.push("/");
  }

  return (
    <main className="w-screen h-screen bg-slate-700 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-[600px] bg-white rounded shadow-md p-6">
        <h1 className="w-full text-center border-b pb-6 uppercase font-bold">Entrada: novo item para estoque</h1>
        <span className="w-full text-xs text-left my-4 border-b pb-4 flex flex-row justify-between items-center">
          <span>ID: {id}</span>
          <span>Data: {hoje}</span>
        </span>
        <div className="flex flex-col justify-center items-center gap-6">
          <label className="w-full flex gap-2 justify-center items-center">
            <span>Conferente:</span>
            <input
              type="text"
              name="receiver"
              placeholder="Digite aqui o nome de quem recebeu"
              className="w-full border-b-2 border-gray-300 px-2 py-1"
              value={registro.receiver}
              onChange={handleInput}
            />
          </label>
          <label className="w-full flex flex-row gap-2 justify-center items-center">
            <span>Quantidade:</span>
            <input
              type="number"
              name="amount"
              placeholder="Informe a quantidade recebida"
              className="w-full border-b-2 border-gray-300 px-2 py-1"
              value={registro.amount}
              onChange={handleInput}
            />
          </label>
          <label className="w-full flex flex-col gap-2 justify-center items-center">
            <span className="w-full text-left">Observações:</span>
            <textarea
              type="text"
              name="description"
              placeholder="Digite aqui qualquer observação que quiser"
              className="w-full border-b-2 border-gray-300 px-2 py-1 h-20"
              value={registro.description}
              onChange={handleInput}
            />
          </label>
        </div>
        <div className="pt-4 flex justify-between items-center">
          <Link href="/" className="hover:underline">
            Voltar
          </Link>
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-white uppercase font-bold px-4 py-2 rounded-md"
          >
            Registrar ✅
          </button>
        </div>
      </form>
    </main>
  );
}
