import { useState } from 'react';

export const useVotingSystem = () => {
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
            candidateId: candidate.id,
            candidateName: candidate.name,
            candidateNumber: candidate.number,
            timestamp: Date.now(),
        };

        setHistory((prev) => [newVote, ...prev]);
    };

    const handleDeleteVote = (timestamp, candidateId) => {
        setHistory((prev) => prev.filter((vote) => vote.timestamp !== timestamp));
        setCandidates((prev) =>
            prev.map((c) => (c.id === candidateId ? { ...c, votes: Math.max(0, c.votes - 1) } : c))
        );
    };

    const handleUpdateCandidate = (id, newName, newNumber) => {
        setCandidates((prev) =>
            prev.map((c) =>
                c.id === id ? { ...c, name: newName, number: parseInt(newNumber) } : c
            )
        );
    };

    const handleAddCandidate = (name, number) => {
        const newCandidate = {
            id: Date.now(), // Simple ID generation
            name,
            number: parseInt(number),
            votes: 0
        };
        setCandidates((prev) => [...prev, newCandidate]);
    };

    // Calculate leader
    const getLeaderId = () => {
        if (candidates.length === 0) return null;

        const sorted = [...candidates].sort((a, b) => b.votes - a.votes);

        // If only one candidate, they are the leader if they have votes (optional logic, but let's assume yes)
        // Or if we strictly follow "tie" logic:
        if (candidates.length === 1) return sorted[0].id;

        // Check for tie between top 2
        if (sorted[0].votes === sorted[1].votes) {
            return null; // Tie
        }

        return sorted[0].id;
    };

    const leaderId = getLeaderId();

    return {
        candidates,
        history,
        handleVote,
        handleDeleteVote,
        handleUpdateCandidate,
        handleAddCandidate,
        leaderId
    };
};
