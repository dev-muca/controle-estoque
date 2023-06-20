import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Saida() {
  const Router = useRouter();
  const [id, setId] = useState(null);
  const [hoje, setHoje] = useState(null);

  const [registro, setRegistro] = useState({
    id: id,
    data: null,
    tipo: 2,
    requester: "",
    destiny: "",
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
      tipo: 2,
      requester: "",
      destiny: "",
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

    const { amount, destiny, requester } = registro;

    if (!amount || !destiny || !requester) return alert("Informe o solicitante, destino e quantidade!");

    const lancamentos = localStorage.getItem("lancamentos");
    const lancamentosAnteriores = JSON.parse(lancamentos);

    const total = lancamentosAnteriores.reduce(
      (total, registro) =>
        registro.tipo === 1 ? total + parseInt(registro.amount) : total - parseInt(registro.amount),
      0
    );

    if (amount > total)
      return alert(`Você não tem estoque o suficiente para dar saída\n\nEstoque: ${total}\n\nSaída: ${amount}`);

    if (!lancamentos) {
      localStorage.setItem("lancamentos", JSON.stringify([registro]));
      alert("Lançamento feito com sucesso!");
      return Router.push("/");
    }

    const lista = [...lancamentosAnteriores, registro];
    localStorage.setItem("lancamentos", JSON.stringify(lista));
    alert("Lançamento feito com sucesso!");
    Router.push("/");
  }

  return (
    <main className="w-screen h-screen bg-slate-700 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-[600px] bg-white rounded shadow-md p-6">
        <h1 className="w-full text-center border-b pb-6 uppercase font-bold">Saída: retirada de item de estoque</h1>
        <span className="w-full text-xs text-left my-4 border-b pb-4 flex flex-row justify-between items-center">
          <span>ID: {id}</span>
          <span>Data: {hoje}</span>
        </span>
        <div className="flex flex-col justify-center items-center gap-6">
          <label className="w-full flex gap-2 justify-center items-center">
            <span>Solicitante:</span>
            <input
              type="text"
              name="requester"
              placeholder="Digite aqui quem solicitou a retirada"
              className="w-full border-b-2 border-gray-300 px-2 py-1"
              value={registro.requester}
              onChange={handleInput}
            />
          </label>
          <label className="w-full flex flex-row gap-2 justify-center items-center">
            <span>Quantidade:</span>
            <input
              type="number"
              name="amount"
              placeholder="Informe a quantidade retirada"
              className="w-full border-b-2 border-gray-300 px-2 py-1"
              value={registro.amount}
              onChange={handleInput}
            />
          </label>
          <label className="w-full flex gap-2 justify-center items-center">
            <span>Destino:</span>
            <input
              type="text"
              name="destiny"
              placeholder="Digite aqui para onde se destina a retirada"
              className="w-full border-b-2 border-gray-300 px-2 py-1"
              value={registro.destiny}
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
            Retirar ✅
          </button>
        </div>
      </form>
    </main>
  );
}
