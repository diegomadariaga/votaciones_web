import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Vote, Pencil, Check, X } from 'lucide-react';

const CandidateCard = ({ candidate, percentage, onVote, onUpdate, isLeading, color }) => {
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

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        borderColor: isLeading ? color : 'rgba(255,255,255,0.1)',
        boxShadow: isLeading ? `0 0 30px ${color}40` : 'none'
      }}
      className={`relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300 ${!isLeading ? 'bg-white/5 hover:border-white/20 hover:bg-white/10' : 'bg-gradient-to-br from-white/10 to-transparent'}`}
    >
      {/* Edit Button */}
      <div className="absolute top-4 right-4 z-20">
        {isEditing ? (
          <div className="flex gap-2">
            <button onClick={handleSave} className="p-2 bg-green-500/20 text-green-500 rounded-full hover:bg-green-500/30 transition-colors">
              <Check size={16} />
            </button>
            <button onClick={handleCancel} className="p-2 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500/30 transition-colors">
              <X size={16} />
            </button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all">
            <Pencil size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Circular Progress SVG */}
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-white/10"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={color}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          <div className="flex flex-col items-center justify-center z-10">
            {isEditing ? (
              <input
                type="number"
                value={editNumber}
                onChange={(e) => setEditNumber(e.target.value)}
                className="w-20 bg-transparent text-center outline-none border-b-2 border-white/20 focus:border-white text-2xl font-bold text-white"
              />
            ) : (
              <>
                <span className="text-2xl font-bold text-white">{percentage}%</span>
                <span className="text-xs uppercase tracking-wider text-white/60 mb-1">votos</span>
                <span className="text-xl font-bold flex items-center gap-1" style={{ color: color }}>
                  {candidate.votes}
                  <Vote size={14} />
                </span>
              </>
            )}
          </div>

          {isLeading && !isEditing && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ backgroundColor: color }}
              className="absolute -top-0 -right-0 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg uppercase tracking-wider"
            >
              Líder
            </motion.div>
          )}
        </div>

        <div className="text-center w-full mt-2">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-transparent text-center text-xl font-bold text-white mb-1 outline-none border-b border-white/20 focus:border-white"
            />
          ) : (
            <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
              <span className="opacity-50 mr-2 text-lg">#{candidate.number}</span>
              {candidate.name}
            </h3>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onVote(candidate.id)}
          style={{
            backgroundColor: isLeading ? color : 'white',
            color: isLeading ? 'white' : 'black'
          }}
          className={`w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg hover:brightness-110`}
        >
          <Vote size={20} />
          Votar
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CandidateCard;
