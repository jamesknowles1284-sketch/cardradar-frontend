      .sort((a, b) => Number(b[sortBy] || 0) - Number(a[sortBy] || 0));
  }, [activePlayers, clubFilter, playerQuery, sortBy]);
  const playerA = activePlayers.find((p) => p.id === playerAId) || activePlayers[0] || null;
                <div className="rounded-2xl border border-slate-800 bg-[#0D1528] p-4 space-y-3">
                    <div className="flex items-center justify-between">
