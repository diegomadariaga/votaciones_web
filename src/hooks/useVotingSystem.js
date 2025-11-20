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

    const isTie = candidates[0].votes === candidates[1].votes;
    const leaderId = isTie ? null : leadingCandidateId;

    return {
        candidates,
        history,
        handleVote,
        handleUpdateCandidate,
        leaderId
    };
};
