import { Cpu, Code, Lightbulb, TrendingUp } from 'lucide-react';

const actionButtons = [
  {
    id: 'complex',
    icon: Cpu,
    title: 'Complex Topics',
    description: 'Explain quantum computing in simple terms',
  },
  {
    id: 'code',
    icon: Code,
    title: 'Develop & Code',
    description: 'Write a Python function to sort a list',
  },
  {
    id: 'brainstorm',
    icon: Lightbulb,
    title: 'Brainstorm Ideas',
    description: 'Ideate a new productivity app',
  },
  {
    id: 'trends',
    icon: TrendingUp,
    title: 'Current Trends',
    description: 'Summarize the latest AI news',
  },
];

export default function ActionButton({ button, onClick }) {
  const Icon = button.icon;

  return (
    <button
      onClick={() => onClick?.(button)}
      className="group relative w-full max-w-[240px] glass-strong rounded-xl p-4 text-left transition-all duration-300 hover:scale-105 hover:bg-white/10 active:scale-95"
    >
      {/* Purple glow on hover */}
      <div className="absolute inset-0 bg-purple-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative flex flex-col gap-2">
        {/* Icon */}
        <div className="w-9 h-9 rounded-lg bg-purple-600/20 flex items-center justify-center group-hover:bg-purple-600/30 transition-colors">
          <Icon className="w-4 h-4 text-purple-400" />
        </div>

        {/* Text */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">{button.title}</h3>
          <p className="text-sm text-gray-400">{button.description}</p>
        </div>
      </div>

      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-xl border border-purple-600/0 group-hover:border-purple-600/30 transition-colors duration-300"></div>
    </button>
  );
}

export { actionButtons };
