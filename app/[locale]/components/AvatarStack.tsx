'use client';

import { motion } from 'framer-motion';

const AVATARS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', alt: 'User 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', alt: 'User 2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', alt: 'User 3' },
  { id: 4, src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', alt: 'User 4' },
  { id: 5, src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80', alt: 'User 5' },
  { id: 6, src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', alt: 'User 6' },
  { id: 7, src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', alt: 'User 7' },
  { id: 8, src: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80', alt: 'User 8' }
];

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 220,
      damping: 18,
    },
  },
};

export default function AvatarStack() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center bg-[#0d0d0d]/80 border border-white/[0.06] rounded-full px-3 py-1.5 gap-1 shadow-2xl backdrop-blur-md mb-8 inline-flex"
    >
      <div className="flex -space-x-2">
        {AVATARS.map((avatar) => (
          <motion.div
            key={avatar.id}
            variants={itemVariants}
            className="relative"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar.src}
              alt={avatar.alt}
              className="w-7 h-7 rounded-full border border-[#0a0a0a] object-cover shadow-sm select-none"
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        variants={itemVariants}
        className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-900 border border-white/[0.08] text-white text-[10px] font-medium cursor-pointer hover:bg-zinc-800 transition-colors ml-1.5 shadow-sm"
      >
        +
      </motion.div>
    </motion.div>
  );
}
