import React, { useState } from 'react';
import CandidateCard from './components/CandidateCard';
import VoteHistory from './components/VoteHistory';

const App = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Candidate A', number: 1, votes: 0 },
    { id: 2, name: 'Candidate B', number: 2, votes: 0 },
  ]);

  const [history, setHistory] = useState([]);

  const handleVote = (id) => {
    const candidate = candidates.find((c) => c.id === id);
    if (!candidate) return;

    // Update votes
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, votes: c.votes + 1 } : c))
    );

    // Add to history
    const newVote = {
      candidateName: candidate.name,
      candidateNumber: candidate.number,
      timestamp: Date.now(),
    };

    setHistory((prev) => [newVote, ...prev].slice(0, 5));
  };

  const handleUpdateCandidate = (id, newName, newNumber) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, name: newName, number: parseInt(newNumber) } : c
      )
    );
  };

  const leadingCandidateId = candidates.reduce((prev, current) => 
    (prev.votes > current.votes) ? prev : current
  ).id;
  
  // If it's a tie, no one is leading in a binary choice unless we want to show both or neither.
  // For simplicity, if votes are equal, we can say no one is leading or just pick first.
  // Let's say no one is leading if equal.
  const isTie = candidates[0].votes === candidates[1].votes;
  const leaderId = isTie ? null : leadingCandidateId;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-4xl flex flex-col items-center text-center">
        <header className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            VOTE 2025
          </h1>
          <p className="text-white/40 font-medium uppercase tracking-widest text-sm">
            Official Counting System
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-6 w-full mb-8">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="w-full max-w-xs">
              <CandidateCard
                candidate={candidate}
                onVote={handleVote}
                onUpdate={handleUpdateCandidate}
                isLeading={leaderId === candidate.id}
              />
            </div>
          ))}
        </div>

        <VoteHistory history={history} />
      </div>
    </div>
  );
};

export default App;
