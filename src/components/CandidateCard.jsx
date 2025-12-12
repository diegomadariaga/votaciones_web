import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Vote, Pencil, Check, X } from 'lucide-react';

const CandidateCard = ({ candidate, percentage, onVote, onUpdate, isLeading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(candidate.name);
  const [editNumber, setEditNumber] = useState(candidate.number);

  const handleSave = () => {
    onUpdate(candidate.id, editName, editNumber);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(candidate.name);
    setEditNumber(candidate.number);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300 ${isLeading
        ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.3)]'
        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
        }`}
    >
      {/* Edit Button */}
      <div className="absolute top-4 right-4 z-20">
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="p-2 bg-green-500/20 text-green-500 rounded-full hover:bg-green-500/30 transition-colors"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500/30 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            <Pencil size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold border-2 ${isLeading ? 'border-yellow-500 text-yellow-500' : 'border-white/20 text-white/60'
            }`}>
            {isEditing ? (
              <input
                type="number"
                value={editNumber}
                onChange={(e) => setEditNumber(e.target.value)}
                className="w-16 bg-transparent text-center outline-none border-b border-white/20 focus:border-white"
              />
            ) : (
              <span className="text-2xl">{percentage}%</span>
            )}
          </div>
          {isLeading && !isEditing && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full"
            >
              LEADER
            </motion.div>
          )}
        </div>

        <div className="text-center w-full">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-transparent text-center text-xl font-bold text-white mb-1 outline-none border-b border-white/20 focus:border-white"
            />
          ) : (
            <h3 className="text-xl font-bold text-white mb-1">{candidate.name}</h3>
          )}
          <p className="text-sm text-white/50">Candidate #{candidate.number}</p>
        </div>

        <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 my-2">
          {candidate.votes}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onVote(candidate.id)}
          className={`w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${isLeading
            ? 'bg-yellow-500 text-black hover:bg-yellow-400'
            : 'bg-white text-black hover:bg-gray-200'
            }`}
        >
          <Vote size={20} />
          Vote Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CandidateCard;
