import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface DropButtonProps {
  name: string;
  state: boolean;
  onClick: (state: boolean) => void;
}

const DropButton = (props: DropButtonProps) => {
  const tA11y = useTranslations('a11y');

  return (
    <motion.div
      className="flex justify-between items-center w-full px-5 py-4 my-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:border-cyan-400/40 hover:bg-white/8 hover:shadow-[0_4px_12px_rgba(0,229,255,0.1)]"
      onClick={() => props.onClick(!props.state)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
    >
      <span className="flex-1 text-center text-slate-200 font-semibold text-base">
        {props.name}
      </span>
      <span className="flex items-center justify-center w-8 h-8">
        <Image
          src={props.state ? '/uparrow.png' : '/downarrow.png'}
          width={30}
          height={30}
          style={{ width: 'auto', height: 'auto' }}
          alt={props.state ? tA11y('collapse') : tA11y('expand')}
        />
      </span>
    </motion.div>
  );
};

export default DropButton;
