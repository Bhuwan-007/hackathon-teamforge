import { AlertTriangle, Cable, Cpu } from "lucide-react";
import { OperatorCard } from "./OperatorCard";

const operators = [
  {
    id: "OP-01",
    role: "Frontend",
    signal: "92Hz",
    type: "Visual",
    name: "Alice C.",
  },
  {
    id: "OP-02",
    role: "Backend",
    signal: "88Hz",
    type: "Logic",
    name: "Bob W.",
  },
  {
    id: "OP-03",
    role: "Data/ML",
    signal: "75Hz",
    type: "Compute",
    name: "Charlie D.",
  },
  {
    id: "OP-04",
    role: "Product",
    signal: "95Hz",
    type: "Router",
    name: "Diana M.",
  },
];

export function AssemblyDashboard({ onReset }: { onReset: () => void }) {
  return (
    <section className="w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-end justify-between mb-4">
        <h2 className="font-heavy text-2xl uppercase border-b-4 border-[#2D241E] pb-1 pr-4 inline-block">
          Assembly Rendered
        </h2>
        <button
          onClick={onReset}
          className="text-xs font-bold text-[#D35400] hover:text-[#2D241E] uppercase underline decoration-2 underline-offset-4"
        >
          Disconnect &amp; Reset
        </button>
      </div>
      <div className="bg-[#FAF9F6] border-4 border-[#2D241E] hard-shadow w-full flex flex-col">
        <div className="border-b-4 border-[#2D241E] bg-[#D8D1C5] p-4 flex flex-col md:flex-row gap-6 md:gap-12 justify-between items-start md:items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#2D241E] rounded-full flex items-center justify-center">
              <Cable className="w-6 h-6 text-[#4ADE80]" />
            </div>
            <div>
              <h3 className="font-heavy text-xl uppercase leading-none mb-1">
                Circuit Beta-09
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]">
                  Signal Stable
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-8">
            <Gauge
              label="Bandwidth (Coverage)"
              value="92%"
              color="text-[#2E7D32]"
            />
            <Gauge
              label="Resonance (Bond)"
              value="88%"
              color="text-[#D35400]"
            />
          </div>
        </div>
        <div className="p-6 md:p-8">
          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Cpu className="w-3 h-3" />
            Connected Operators
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {operators.map((operator) => (
              <OperatorCard key={operator.id} operator={operator} />
            ))}
          </div>
        </div>
        <div className="border-t-4 border-[#2D241E] bg-[#F4D03F] p-6 flex flex-col md:flex-row items-start gap-4">
          <div className="bg-[#2D241E] p-3 shadow-[4px_4px_0px_#D35400]">
            <AlertTriangle className="w-8 h-8 text-[#F4D03F]" />
          </div>
          <div className="flex-1">
            <h4 className="font-heavy text-xl uppercase mb-2 text-[#2D241E]">
              Open Circuit Detected
            </h4>
            <p className="text-sm font-bold text-[#2D241E] leading-relaxed max-w-3xl">
              This assembly lacks a{" "}
              <span className="bg-[#D35400] text-white px-1.5 py-0.5">
                Design (UX)
              </span>{" "}
              operator. The interface signal may degrade upon output. Recommend
              patching in a Design node to stabilize the user experience before
              deployment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gauge({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
        {label}
      </span>
      <span className={`font-heavy text-3xl ${color}`}>{value}</span>
    </div>
  );
}
