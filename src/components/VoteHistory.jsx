import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trash2 } from 'lucide-react';

const VoteHistory = ({ history, onDelete }) => {
  return (
    <div className="w-full max-w-md mt-8 mx-auto">
      <div className="flex items-center justify-center gap-2 text-white/60 mb-4 px-2">
        <Clock size={16} />
        <span className="text-sm font-medium uppercase tracking-wider">Historial de Votos</span>
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {history.map((vote, index) => (
            <motion.div
              key={vote.timestamp}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center justify-center w-8">
                  <span className="text-[10px] text-white/40 mb-0.5">#{history.length - index}</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white">
                    {vote.candidateNumber}
                  </div>
                </div>
                <span className="text-white font-medium">{vote.candidateName}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-white/40 font-mono">
                  {new Date(vote.timestamp).toLocaleTimeString()}
                </span>
                <button
                  onClick={() => onDelete(vote.timestamp, vote.candidateId)}
                  className="text-white/20 hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100"
                  title="Eliminar voto"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}

          {history.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-white/30 text-sm"
            >
              No hay votos aún. ¡Sé el primero!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VoteHistory;
