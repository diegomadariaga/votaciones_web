import React from 'react';
import CandidateCard from './components/CandidateCard';
import VoteHistory from './components/VoteHistory';
import Header from './components/Header';
import Layout from './components/Layout';
import { useVotingSystem } from './hooks/useVotingSystem';

const App = () => {
  const {
    candidates,
    history,
    handleVote,
    handleUpdateCandidate,
    leaderId
  } = useVotingSystem();

  return (
    <Layout>
      <Header />

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
    </Layout>
  );
};

export default App;
