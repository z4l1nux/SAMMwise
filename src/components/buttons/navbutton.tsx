import { motion } from 'framer-motion';

interface NavButtonProps {
  name: string;
  state: boolean;
  onClick: () => void;
}

const NavButton = (props: NavButtonProps) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer group"
      onClick={props.onClick}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.15 }}
    >
      <button
        aria-label={props.name}
        className={
          props.state
            ? 'w-4 h-4 rounded-full border-[3px] border-cyan-400 bg-gradient-to-br from-cyan-400 to-purple-500 cursor-pointer shadow-[0_0_12px_rgba(0,229,255,0.5)] animate-pulse transition-all duration-200'
            : 'w-4 h-4 rounded-full border-[3px] border-slate-600 bg-transparent cursor-pointer transition-all duration-200 group-hover:border-cyan-400 group-hover:scale-110 group-hover:shadow-[0_0_8px_rgba(0,229,255,0.4)]'
        }
      />
      <label className="text-xs font-semibold text-slate-400 text-center select-none cursor-pointer transition-all duration-200 group-hover:text-cyan-400">
        {props.name}
      </label>
    </motion.div>
  );
};

export default NavButton;
