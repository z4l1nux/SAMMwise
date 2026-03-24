import { motion } from 'framer-motion';

interface SurveyButtonProps {
  name: string;
  id?: string;
  state?: boolean;
  onClick: (state: boolean) => void;
}

const SurveyButton = (props: SurveyButtonProps) => {
  return (
    <motion.button
      className="px-8 py-3 rounded-xl border border-cyan-400/50 bg-cyan-500/10 text-cyan-400 font-semibold text-base cursor-pointer transition-all duration-200 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_16px_rgba(0,229,255,0.3)] active:scale-95 min-w-[150px]"
      id={props.id}
      onClick={() => props.onClick(!props.state)}
      whileTap={{ scale: 0.95 }}
    >
      {props.name}
    </motion.button>
  );
};

export default SurveyButton;
