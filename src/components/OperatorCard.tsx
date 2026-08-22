import { Terminal } from "lucide-react";

type Operator = { id: string; role: string; signal: string; type: string; name: string };

export function OperatorCard({ operator }: { operator: Operator }) {
  return (
    <article className="bg-white border-2 border-[#2D241E] p-4 flex flex-col relative shadow-[2px_2px_0px_#2D241E] hover:shadow-[4px_4px_0px_#2D241E] transition-all">
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-gray-300 border border-gray-500" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gray-300 border border-gray-500" />
      <div className="flex justify-between items-center mb-6 mt-2 border-b-2 border-gray-200 pb-2">
        <span className="text-[10px] font-bold bg-[#F4F1EA] px-2 py-0.5 border border-[#2D241E]">{operator.id}</span>
        <span className="text-[10px] font-bold text-[#D35400]">{operator.signal}</span>
      </div>
      <div>
        <div className="font-heavy text-2xl uppercase mb-1">{operator.role}</div>
        <div className="text-sm font-bold text-gray-600 mb-4">{operator.name}</div>
      </div>
      <div className="mt-auto flex items-center gap-2 bg-[#F4F1EA] p-2 border-2 border-[#2D241E] text-[10px] font-bold uppercase">
        <Terminal className="w-3 h-3 text-[#2E7D32]" />
        Type: {operator.type}
      </div>
    </article>
  );
}