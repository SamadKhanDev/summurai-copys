import React from "react";

interface StatItem {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: StatItem[];
  logos?: string[];
  className?: string;
}

export function StatsBar({ stats, logos, className = "" }: StatsBarProps) {
  return (
    <div
      className={`bg-background-tertiary border-t border-b border-card-border py-6 px-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-6">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-text-main">
                {stat.value}
              </div>
              <div className="text-xs text-text-secondary mt-1">{stat.label}</div>
            </div>
            {index < stats.length - 1 && (
              <div className="w-px h-10 bg-card-border" />
            )}
          </React.Fragment>
        ))}
        {logos && logos.length > 0 && (
          <>
            <div className="w-px h-10 bg-card-border" />
            <div className="flex items-center gap-4 flex-wrap">
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className="bg-card-bg border border-card-border rounded-md px-4 py-1.5 text-xs font-semibold text-text-secondary"
                >
                  {logo}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


// import React from "react";

// interface StatItem {
//   value: string;
//   label: string;
// }

// interface StatsBarProps {
//   stats: StatItem[];
//   logos?: string[];
//   className?: string;
// }

// export function StatsBar({ stats, logos, className = "" }: StatsBarProps) {
//   return (
//     <div
//       className={`relative overflow-hidden bg-background-tertiary ${className}`}
//     >
//       {/* Subtle top red glow */}
//       <div
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           background:
//             "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(225,29,72,0.07), transparent 70%)",
//         }}
//       />

//       {/* Top border with red tint */}
//       <div
//         className="absolute top-0 left-0 right-0 h-px"
//         style={{
//           background:
//             "linear-gradient(90deg, transparent, rgba(225,29,72,0.4) 50%, transparent)",
//         }}
//       />

//       <div className="relative z-10 max-w-7xl mx-auto px-8 py-10 flex items-center  justify-between flex-wrap gap-8">

//         {/* Stats */}
//         {stats.map((stat, index) => (
//           <React.Fragment key={index}>
//             <div className="flex flex-col items-center group">
//               <span
//                 className="font-space-grotesk text-[2.2rem] font-bold text-white mb-1 transition-colors duration-300 group-hover:text-[#E11D48] leading-none"
//               >
//                 {stat.value}
//               </span>
//               <span
//                 className="text-[0.6rem] font-bold tracking-[0.2em] uppercase"
//                 style={{ color: "rgba(148,163,184,0.5)" }}
//               >
//                 {stat.label}
//               </span>
//             </div>

//             {index < stats.length - 1 && (
//               <div
//                 className="w-px h-10 shrink-0"
//                 style={{ background: "rgba(255,255,255,0.06)" }}
//               />
//             )}
//           </React.Fragment>
//         ))}

//         {/* Logos */}
//         {logos && logos.length > 0 && (
//           <>
//             <div
//               className="w-px h-10 shrink-0"
//               style={{ background: "rgba(255,255,255,0.06)" }}
//             />
//             <div className="flex items-center gap-3 flex-wrap">
//               {logos.map((logo, index) => (
//                 <div
//                   key={index}
//                   className="px-4 py-1.5 rounded-full text-[0.65rem] font-bold tracking-[0.12em] uppercase transition-all duration-200 hover:border-[#E11D48]/40 hover:text-white font-['Space_Grotesk',sans-serif]"
//                   style={{
//                     border: "1px solid rgba(255,255,255,0.08)",
//                     background: "rgba(255,255,255,0.03)",
//                     color: "rgba(148,163,184,0.6)",
//                   }}
//                 >
//                   {logo}
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Bottom border */}
//       <div
//         className="absolute bottom-0 left-0 right-0 h-px"
//         style={{ background: "rgba(255,255,255,0.05)" }}
//       />
//     </div>
//   );
// }