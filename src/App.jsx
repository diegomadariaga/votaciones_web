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
    handleAddCandidate,
    handleDeleteVote,
    leaderId,
    resetVotes
  } = useVotingSystem();

  const totalVotes = candidates.reduce((acc, curr) => acc + curr.votes, 0);

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newName, setNewName] = React.useState('');
  const [newNumber, setNewNumber] = React.useState('');

  const onAddCandidate = (e) => {
    e.preventDefault();
    if (newName && newNumber) {
      handleAddCandidate(newName, newNumber);
      setNewName('');
      setNewNumber('');
      setShowAddForm(false);
    }
  };

  return (
    <Layout>
      <Header />

      <div className="mb-6 flex justify-center gap-4">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {showAddForm ? 'Cancelar' : 'Agregar Candidato'}
        </button>
        <button
          onClick={resetVotes}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Resetear Votos
        </button>
      </div>

      <div className="text-center mb-8">
        <span className="text-2xl font-bold bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 text-white">
          Total Votos: {totalVotes}
        </span>
      </div>

      {showAddForm && (
        <form onSubmit={onAddCandidate} className="mb-8 p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
          <h3 className="text-lg font-bold mb-4">Nuevo Candidato</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-base"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Número</label>
            <input
              type="number"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-base"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Guardar
          </button>
        </form>
      )}

      <div className="grid grid-cols-2 gap-4 w-full mb-8 max-w-4xl mx-auto">
        {candidates.map((candidate, index) => {
          const percentage = totalVotes === 0 ? 0 : Math.round((candidate.votes / totalVotes) * 100);
          const colors = ['#F59E0B', '#3B82F6', '#EF4444', '#10B981', '#8B5CF6', '#EC4899', '#6366F1'];
          const color = colors[index % colors.length];

          return (
            <div key={candidate.id} className="w-full">
              <CandidateCard
                candidate={candidate}
                percentage={percentage}
                onVote={handleVote}
                onUpdate={handleUpdateCandidate}
                isLeading={leaderId === candidate.id}
                color={color}
              />
            </div>
          );
        })}
      </div>

      <VoteHistory history={history} onDelete={handleDeleteVote} />
    </Layout>
  );
};

export default App;
