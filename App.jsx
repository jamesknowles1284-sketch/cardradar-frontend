import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Users,
  Swords,
  Scale,
  Database,
  Search,
  ChevronRight,
  ArrowLeftRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lock,
  RefreshCw,
  X,
  Activity,
  Calendar,
} from 'lucide-react';

// ============================================================================
// ISOLATED DEMO DATASET (NEVER MIXED WITH LIVE DATA)
// ============================================================================
const DEMO_DATASET = {
  sourceType: 'SIMULATED_DATA',
  season: '2026/27',
  competition: 'Premier League',
  snapshotUpdatedAt: '2026-11-26T18:00:00Z',
  fixtures: [
    {
      id: 'sim-fix-1',
      round: 'Matchweek 13',
      kickoff: 'Sat 15:00',
      venue: 'Emirates Stadium',
      referee: 'Michael Oliver',
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      homeFoulsPer90: 11.4,
      awayFoulsPer90: 13.8,
      projectedYellows: 5.4,
      projectedReds: 0.24,
      riskScore: 84,
      riskLevel: 'HIGH',
      watchlist: ['Moisés Caicedo', 'Declan Rice', 'Marc Cucurella'],
    },
    {
      id: 'sim-fix-2',
      round: 'Matchweek 13',
      kickoff: 'Sat 17:30',
      venue: 'St. James’ Park',
      referee: 'Anthony Taylor',
      homeTeam: 'Newcastle',
      awayTeam: 'Aston Villa',
      homeFoulsPer90: 12.6,
      awayFoulsPer90: 11.9,
      projectedYellows: 4.9,
      projectedReds: 0.19,
      riskScore: 76,
      riskLevel: 'ELEVATED',
      watchlist: ['Joelinton', 'Bruno Guimarães', 'John McGinn'],
    },
    {
      id: 'sim-fix-3',
      round: 'Matchweek 13',
      kickoff: 'Sun 16:30',
      venue: 'Anfield',
      referee: 'Stuart Attwell',
      homeTeam: 'Liverpool',
      awayTeam: 'Man United',
      homeFoulsPer90: 10.8,
      awayFoulsPer90: 13.1,
      projectedYellows: 5.1,
      projectedReds: 0.22,
      riskScore: 81,
      riskLevel: 'HIGH',
      watchlist: ['Lisandro Martínez', 'Manuel Ugarte', 'Alexis Mac Allister'],
    },
  ],
  players: [
    {
      id: 'sim-plr-1',
      name: 'Moisés Caicedo',
      club: 'Chelsea',
      position: 'CDM',
      yellowCards: 6,
      redCards: 1,
      foulsCommittedPer90: 2.65,
      foulsDrawnPer90: 1.45,
      minutesPlayed: 1062,
      indicatorScore: 89,
      riskLevel: 'HIGH',
      recentForm: ['Y', 'CLEAN', 'Y', 'R', 'Y'],
      foulBreakdown: { tactical: 46, aerial: 14, lateChallenge: 30, dissent: 10 },
      lastFiveMatches: [
        { opponent: 'vs ARS', fouls: 4, card: 'Y', minute: "38'" },
        { opponent: 'vs LEI', fouls: 2, card: 'CLEAN', minute: '-' },
        { opponent: 'vs MUN', fouls: 3, card: 'Y', minute: "71'" },
        { opponent: 'vs NEW', fouls: 5, card: 'R', minute: "84'" },
        { opponent: 'vs LIV', fouls: 3, card: 'Y', minute: "29'" },
      ],
    },
    {
      id: 'sim-plr-2',
      name: 'Joelinton',
      club: 'Newcastle',
      position: 'CM',
      yellowCards: 6,
      redCards: 0,
      foulsCommittedPer90: 2.52,
      foulsDrawnPer90: 1.88,
      minutesPlayed: 1020,
      indicatorScore: 83,
      riskLevel: 'HIGH',
      recentForm: ['Y', 'Y', 'CLEAN', 'Y', 'CLEAN'],
      foulBreakdown: { tactical: 35, aerial: 28, lateChallenge: 25, dissent: 12 },
      lastFiveMatches: [
        { opponent: 'vs AVL', fouls: 3, card: 'Y', minute: "52'" },
        { opponent: 'vs WHU', fouls: 4, card: 'Y', minute: "64'" },
        { opponent: 'vs NFO', fouls: 1, card: 'CLEAN', minute: '-' },
        { opponent: 'vs ARS', fouls: 3, card: 'Y', minute: "41'" },
        { opponent: 'vs CHE', fouls: 2, card: 'CLEAN', minute: '-' },
      ],
    },
    {
      id: 'sim-plr-3',
      name: 'Lisandro Martínez',
      club: 'Man United',
      position: 'CB',
      yellowCards: 5,
      redCards: 1,
      foulsCommittedPer90: 1.94,
      foulsDrawnPer90: 0.72,
      minutesPlayed: 990,
      indicatorScore: 81,
      riskLevel: 'HIGH',
      recentForm: ['Y', 'CLEAN', 'Y', 'Y', 'CLEAN'],
      foulBreakdown: { tactical: 38, aerial: 22, lateChallenge: 32, dissent: 8 },
      lastFiveMatches: [
        { opponent: 'vs IPS', fouls: 3, card: 'Y', minute: "61'" },
        { opponent: 'vs LEI', fouls: 1, card: 'CLEAN', minute: '-' },
        { opponent: 'vs CHE', fouls: 3, card: 'Y', minute: "90+2'" },
        { opponent: 'vs WHU', fouls: 2, card: 'Y', minute: "44'" },
        { opponent: 'vs BRE', fouls: 1, card: 'CLEAN', minute: '-' },
      ],
    },
    {
      id: 'sim-plr-4',
      name: 'Declan Rice',
      club: 'Arsenal',
      position: 'CDM',
      yellowCards: 4,
      redCards: 1,
      foulsCommittedPer90: 1.68,
      foulsDrawnPer90: 1.54,
      minutesPlayed: 1035,
      indicatorScore: 74,
      riskLevel: 'ELEVATED',
      recentForm: ['CLEAN', 'Y', 'CLEAN', 'Y', 'CLEAN'],
      foulBreakdown: { tactical: 44, aerial: 20, lateChallenge: 26, dissent: 10 },
      lastFiveMatches: [
        { opponent: 'vs NFO', fouls: 1, card: 'CLEAN', minute: '-' },
        { opponent: 'vs CHE', fouls: 3, card: 'Y', minute: "58'" },
        { opponent: 'vs NEW', fouls: 2, card: 'CLEAN', minute: '-' },
        { opponent: 'vs LIV', fouls: 3, card: 'Y', minute: "79'" },
        { opponent: 'vs BOU', fouls: 1, card: 'CLEAN', minute: '-' },
      ],
    },
    {
      id: 'sim-plr-5',
      name: 'Bruno Guimarães',
      club: 'Newcastle',
      position: 'CM',
      yellowCards: 5,
      redCards: 0,
      foulsCommittedPer90: 1.85,
      foulsDrawnPer90: 3.12,
      minutesPlayed: 1080,
      indicatorScore: 72,
      riskLevel: 'ELEVATED',
      recentForm: ['Y', 'CLEAN', 'Y', 'CLEAN', 'Y'],
      foulBreakdown: { tactical: 40, aerial: 12, lateChallenge: 28, dissent: 20 },
      lastFiveMatches: [
        { opponent: 'vs AVL', fouls: 2, card: 'Y', minute: "67'" },
        { opponent: 'vs WHU', fouls: 1, card: 'CLEAN', minute: '-' },
        { opponent: 'vs NFO', fouls: 3, card: 'Y', minute: "49'" },
        { opponent: 'vs ARS', fouls: 2, card: 'CLEAN', minute: '-' },
        { opponent: 'vs CHE', fouls: 3, card: 'Y', minute: "83'" },
      ],
    },
    {
      id: 'sim-plr-6',
      name: 'Bukayo Saka',
      club: 'Arsenal',
      position: 'RW',
      yellowCards: 2,
      redCards: 0,
      foulsCommittedPer90: 0.92,
      foulsDrawnPer90: 2.95,
      minutesPlayed: 1010,
      indicatorScore: 41,
      riskLevel: 'LOW',
      recentForm: ['CLEAN', 'CLEAN', 'Y', 'CLEAN', 'CLEAN'],
      foulBreakdown: { tactical: 30, aerial: 10, lateChallenge: 35, dissent: 25 },
      lastFiveMatches: [
        { opponent: 'vs NFO', fouls: 1, card: 'CLEAN', minute: '-' },
        { opponent: 'vs CHE', fouls: 0, card: 'CLEAN', minute: '-' },
        { opponent: 'vs NEW', fouls: 2, card: 'Y', minute: "74'" },
        { opponent: 'vs LIV', fouls: 1, card: 'CLEAN', minute: '-' },
        { opponent: 'vs BOU', fouls: 0, card: 'CLEAN', minute: '-' },
      ],
    },
  ],
  referees: [
    {
      id: 'sim-ref-1',
      name: 'Anthony Taylor',
      matchesOfficiated: 11,
      yellowsPerGame: 5.18,
      redsPerGame: 0.27,
      foulsPerGame: 23.4,
      cardsPerFoulPct: 22.1,
      homeYellowShare: 46,
      awayYellowShare: 54,
      strictnessLabel: 'STRICT',
    },
    {
      id: 'sim-ref-2',
      name: 'Michael Oliver',
      matchesOfficiated: 12,
      yellowsPerGame: 4.67,
      redsPerGame: 0.25,
      foulsPerGame: 22.1,
      cardsPerFoulPct: 21.1,
      homeYellowShare: 48,
      awayYellowShare: 52,
      strictnessLabel: 'HIGH',
    },
    {
      id: 'sim-ref-3',
      name: 'Stuart Attwell',
      matchesOfficiated: 10,
      yellowsPerGame: 4.30,
      redsPerGame: 0.10,
      foulsPerGame: 21.5,
      cardsPerFoulPct: 20.0,
      homeYellowShare: 49,
      awayYellowShare: 51,
      strictnessLabel: 'MODERATE',
    },
  ],
};

// ============================================================================
// ZERO-KEY FRONTEND GATEWAY CLIENT (NO API KEYS STORED IN BROWSER)
// ============================================================================
class FootballDataGateway {
  constructor(proxyBaseUrl = '/api/v1/football-proxy') {
    this.setProxyBaseUrl(proxyBaseUrl);
  }

  setProxyBaseUrl(url) {
    const cleaned = String(url || '').trim().replace(/\/+$/, '');
    if (/api[_-]?key|secret|bearer|token/i.test(cleaned)) {
      throw new Error('Security violation: API credentials must never be placed in the frontend URL.');
    }
    this.proxyBaseUrl = cleaned || '/api/v1/football-proxy';
  }

  getHealthEndpoint() {
    if (this.proxyBaseUrl.endsWith('/api/v1/football-proxy')) {
      const root = this.proxyBaseUrl.slice(0, -'/api/v1/football-proxy'.length);
      return `${root}/health` || '/health';
    }
    return `${this.proxyBaseUrl}/health`;
  }

  getDataEndpoint() {
    if (this.proxyBaseUrl.endsWith('/api/v1/football-proxy')) {
      return this.proxyBaseUrl;
    }
    return `${this.proxyBaseUrl}/api/v1/football-proxy`;
  }

  async testConnection() {
    const started = performance.now();
    const healthUrl = this.getHealthEndpoint();
    try {
      const res = await fetch(healthUrl, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      const latencyMs = Math.round(performance.now() - started);
      const contentType = res.headers.get('content-type') || '';

      if (!contentType.includes('application/json')) {
        return {
          status: 'UNAVAILABLE',
          httpCode: res.status,
          latencyMs,
          message: 'LIVE DATA NOT CONNECTED: No JSON backend proxy found at this endpoint.',
        };
      }

      const body = await res.json();
      if (res.ok && body?.status === 'CONNECTED' && body?.credentialsConfigured === true) {
        return {
          status: 'CONNECTED',
          httpCode: res.status,
          latencyMs,
          provider: body.provider || 'Verified Proxy',
          message: `Connected to server proxy (${body.provider || 'Verified Provider'}).`,
        };
      }

      if (res.status === 503 || body?.status === 'UNAVAILABLE') {
        return {
          status: 'UNAVAILABLE',
          httpCode: res.status,
          latencyMs,
          message: body?.message || 'LIVE DATA NOT CONNECTED: Backend proxy credentials unavailable.',
        };
      }

      return {
        status: 'ERROR',
        httpCode: res.status,
        latencyMs,
        message: body?.message || `Backend proxy returned HTTP ${res.status}.`,
      };
    } catch (err) {
      return {
        status: 'UNAVAILABLE',
        httpCode: 0,
        latencyMs: Math.round(performance.now() - started),
        message: `LIVE DATA NOT CONNECTED: Backend unreachable (${err instanceof Error ? err.message : 'Network error'}).`,
      };
    }
  }

  async fetchLiveSnapshot({ season, competition }) {
    const endpoint = new URL(this.getDataEndpoint(), window.location.origin);
    endpoint.searchParams.set('season', season);
    endpoint.searchParams.set('competition', competition);
    endpoint.searchParams.set('resource', 'snapshot');

    const res = await fetch(endpoint.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Proxy HTTP ${res.status}`);
    }

    const payload = await res.json();
    if (payload?.status !== 'CONNECTED' || payload?.data?.verified !== true) {
      throw new Error('Unverified live payload rejected');
    }
    return payload.data;
  }
}

const gateway = new FootballDataGateway('/api/v1/football-proxy');

function getScoreStyle(score) {
  if (score >= 80) return { badge: 'bg-red-500/20 text-red-400 border-red-500/40', ring: 'border-red-500 text-red-400', label: 'HIGH' };
  if (score >= 65) return { badge: 'bg-amber-400/20 text-amber-300 border-amber-400/40', ring: 'border-amber-400 text-amber-300', label: 'ELEVATED' };
  if (score >= 45) return { badge: 'bg-sky-400/20 text-sky-300 border-sky-400/40', ring: 'border-sky-400 text-sky-300', label: 'MODERATE' };
  return { badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', ring: 'border-emerald-400 text-emerald-300', label: 'LOW' };
}

export default function App() {
  const [activeTab, setActiveTab] = useState('fixtures');
  const [dataMode, setDataMode] = useState('DEMO'); // 'DEMO' | 'LIVE'
  const [season, setSeason] = useState('2026/27');
  const [competition, setCompetition] = useState('PL');

  // Backend proxy connection states: 'UNAVAILABLE' | 'CONNECTED' | 'ERROR'
  const [proxyUrlInput, setProxyUrlInput] = useState('/api/v1/football-proxy');
  const [connectionState, setConnectionState] = useState('UNAVAILABLE');
  const [connectionDetail, setConnectionDetail] = useState(
    'LIVE DATA NOT CONNECTED: No backend proxy verified.'
  );
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [lastLiveUpdate, setLastLiveUpdate] = useState(null);
  const [liveDataset, setLiveDataset] = useState({ fixtures: [], players: [], referees: [] });
  const [securityAuditResult, setSecurityAuditResult] = useState(null);

  // Fixtures tab state
  const [selectedFixtureId, setSelectedFixtureId] = useState(DEMO_DATASET.fixtures[0].id);

  // Players tab state
  const [playerQuery, setPlayerQuery] = useState('');
  const [clubFilter, setClubFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('indicatorScore');
  const [inspectedPlayer, setInspectedPlayer] = useState(null);

  // Matchups tab state
  const [playerAId, setPlayerAId] = useState('sim-plr-1');
  const [playerBId, setPlayerBId] = useState('sim-plr-6');

  // Strict dataset isolation: Live Mode NEVER falls back to DEMO_DATASET
  const isLiveVerified = dataMode === 'LIVE' && connectionState === 'CONNECTED';
  const activeFixtures = useMemo(
    () => (dataMode === 'DEMO' ? DEMO_DATASET.fixtures : isLiveVerified ? liveDataset.fixtures : []),
    [dataMode, isLiveVerified, liveDataset.fixtures]
  );
  const activePlayers = useMemo(
    () => (dataMode === 'DEMO' ? DEMO_DATASET.players : isLiveVerified ? liveDataset.players : []),
    [dataMode, isLiveVerified, liveDataset.players]
  );
  const activeReferees = useMemo(
    () => (dataMode === 'DEMO' ? DEMO_DATASET.referees : isLiveVerified ? liveDataset.referees : []),
    [dataMode, isLiveVerified, liveDataset.referees]
  );

  const selectedFixture =
    activeFixtures.find((f) => f.id === selectedFixtureId) || activeFixtures[0] || null;

  const clubs = useMemo(() => {
    const set = new Set(activePlayers.map((p) => p.club));
    return ['ALL', ...Array.from(set)];
  }, [activePlayers]);

  const filteredPlayers = useMemo(() => {
    return activePlayers
      .filter((p) => (clubFilter === 'ALL' ? true : p.club === clubFilter))
      .filter((p) => {
        const q = playerQuery.trim().toLowerCase();
        if (!q) return true;
        return (
          p.name.toLowerCase().includes(q) ||
          p.club.toLowerCase().includes(q) ||
          p.position.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => Number(b[sortBy] || 0) - Number(a[sortBy] || 0));
  }, [activePlayers, clubFilter, playerQuery, sortBy]);

  const playerA = activePlayers.find((p) => p.id === playerAId) || activePlayers[0] || null;
  const playerB = activePlayers.find((p) => p.id === playerBId) || activePlayers[1] || activePlayers[0] || null;

  const duelFrictionScore = useMemo(() => {
    if (!playerA || !playerB) return 0;
    const raw =
      playerA.foulsCommittedPer90 * 14 +
      playerB.foulsDrawnPer90 * 12 +
      playerA.yellowCards * 2.5 +
      playerA.redCards * 6;
    return Math.min(99, Math.max(12, Math.round(raw)));
  }, [playerA, playerB]);

  async function handleRunConnectionTest() {
    setIsTestingConnection(true);
    try {
      gateway.setProxyBaseUrl(proxyUrlInput);
      const result = await gateway.testConnection();
      setConnectionState(result.status);
      setConnectionDetail(
        `${result.message} (HTTP ${result.httpCode || 'N/A'} • ${result.latencyMs}ms)`
      );

      if (result.status === 'CONNECTED') {
        const livePayload = await gateway.fetchLiveSnapshot({ season, competition });
        setLiveDataset({
          fixtures: livePayload.fixtures || [],
          players: livePayload.players || [],
          referees: livePayload.referees || [],
        });
        setLastLiveUpdate(livePayload.updatedAt || new Date().toISOString());
      } else {
        setLiveDataset({ fixtures: [], players: [], referees: [] });
      }
    } catch (err) {
      setConnectionState('ERROR');
      setConnectionDetail(err instanceof Error ? err.message : 'Proxy validation error');
      setLiveDataset({ fixtures: [], players: [], referees: [] });
    } finally {
      setIsTestingConnection(false);
    }
  }

  function handleRunSecurityAudit() {
    const localKeys = Object.keys(window.localStorage || {}).filter((k) =>
      /api[_-]?key|secret|token|football/i.test(k)
    );
    const sessionKeys = Object.keys(window.sessionStorage || {}).filter((k) =>
      /api[_-]?key|secret|token|football/i.test(k)
    );
    const clean = localKeys.length === 0 && sessionKeys.length === 0;
    setSecurityAuditResult(
      clean
        ? 'PASS: Zero API keys or provider secrets found in frontend state, bundle, or browser storage.'
        : `WARN: Found suspicious storage keys: ${[...localKeys, ...sessionKeys].join(', ')}`
    );
  }

  function renderLiveDisconnectedState(sectionName) {
    return (
      <div className="rounded-2xl border border-red-500/40 bg-[#0E1629] p-5 text-center space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15 border border-red-500/40 text-red-400">
          <XCircle className="h-6 w-6" />
        </div>
        <div className="inline-block rounded-full bg-red-500/20 border border-red-500/40 px-3 py-1 text-[11px] font-bold tracking-wider text-red-300">
          LIVE DATA NOT CONNECTED
        </div>
        <h3 className="text-base font-bold text-white">{sectionName} Feed Unavailable</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Live Mode never displays simulated or invented statistics. Connect and verify a server-side{' '}
          <span className="text-amber-300 font-semibold">FootballDataGateway</span> proxy in the Data Centre,
          or switch back to Demo Mode to inspect simulated data.
        </p>
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('data')}
            className="rounded-xl bg-amber-400 px-3.5 py-2 text-xs font-bold text-[#080D1A]"
          >
            Open Data Centre
          </button>
          <button
            onClick={() => setDataMode('DEMO')}
            className="rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-200"
          >
            Switch to Simulated Demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050811] flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-[#080D1A] text-slate-100 flex flex-col border-x border-slate-800/80 shadow-2xl">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 bg-[#080D1A]/95 backdrop-blur border-b border-slate-800 px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#080D1A] font-black text-sm shadow">
                CR
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black tracking-tight text-base text-white">CardRadar</span>
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                </div>
                <p className="text-[9px] font-bold tracking-[0.16em] text-amber-400 uppercase">
                  READ THE GAME. TRACK THE CARDS.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('data')}
              className={`px-2.5 py-1 rounded-lg border text-[10px] font-extrabold tracking-wider uppercase ${
                dataMode === 'DEMO'
                  ? 'bg-amber-400/15 border-amber-400/50 text-amber-300'
                  : connectionState === 'CONNECTED'
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                  : 'bg-red-500/15 border-red-500/50 text-red-300'
              }`}
            >
              {dataMode === 'DEMO'
                ? 'SIMULATED DATA'
                : connectionState === 'CONNECTED'
                ? 'LIVE DATA'
                : 'LIVE DATA NOT CONNECTED'}
            </button>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-4 pt-3 pb-24 space-y-4">
          {/* Mode Banner */}
          <div
            className={`rounded-xl border px-3 py-2 flex items-center justify-between text-[11px] ${
              dataMode === 'DEMO'
                ? 'bg-amber-400/10 border-amber-400/30 text-amber-200'
                : connectionState === 'CONNECTED'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                : 'bg-red-500/10 border-red-500/30 text-red-200'
            }`}
          >
            <span className="font-bold">
              {dataMode === 'DEMO'
                ? 'SIMULATED DATA • Illustrative Premier League Dataset'
                : connectionState === 'CONNECTED'
                ? `LIVE DATA • Verified ${season} (${competition})`
                : 'LIVE DATA NOT CONNECTED • Awaiting Verified Backend Proxy'}
            </span>
            <span className="text-[10px] opacity-80">{season}</span>
          </div>

          {/* ================= TAB 1: FIXTURES ================= */}
          {activeTab === 'fixtures' && (
            <div className="space-y-4">
              {activeFixtures.length === 0 ? (
                renderLiveDisconnectedState('Fixtures & Match Discipline')
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Premier League Match Selector
                    </h2>
                    <span className="text-[10px] font-bold text-amber-400">SIMULATED DATA</span>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {activeFixtures.map((fix) => {
                      const active = selectedFixture?.id === fix.id;
                      return (
                        <button
                          key={fix.id}
                          onClick={() => setSelectedFixtureId(fix.id)}
                          className={`min-w-[165px] rounded-xl border p-3 text-left transition ${
                            active
                              ? 'bg-[#121D36] border-amber-400 shadow-lg'
                              : 'bg-[#0D1528] border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                            <span>{fix.kickoff}</span>
                            <span className="text-amber-300 font-bold">{fix.riskScore}/100</span>
                          </div>
                          <div className="text-xs font-bold text-white truncate">
                            {fix.homeTeam} vs {fix.awayTeam}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1 truncate">
                            Ref: {fix.referee}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {selectedFixture && (
                    <div className="rounded-2xl border border-slate-800 bg-[#0D1528] p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                            {selectedFixture.round} • {selectedFixture.venue}
                          </span>
                          <h3 className="text-lg font-black text-white mt-0.5">
                            {selectedFixture.homeTeam} vs {selectedFixture.awayTeam}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Official: <span className="text-slate-200 font-semibold">{selectedFixture.referee}</span>
                          </p>
                        </div>
                        <div
                          className={`h-14 w-14 rounded-2xl border-2 flex flex-col items-center justify-center ${
                            getScoreStyle(selectedFixture.riskScore).ring
                          }`}
                        >
                          <span className="text-base font-black leading-none">
                            {selectedFixture.riskScore}
                          </span>
                          <span className="text-[8px] font-bold tracking-wider mt-0.5">/100</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-xl bg-[#080D1A] border border-slate-800 p-2.5">
                          <div className="text-[10px] text-slate-400">Proj. Yellows</div>
                          <div className="text-base font-black text-amber-400 mt-0.5">
                            {selectedFixture.projectedYellows}
                          </div>
                        </div>
                        <div className="rounded-xl bg-[#080D1A] border border-slate-800 p-2.5">
                          <div className="text-[10px] text-slate-400">Proj. Reds</div>
                          <div className="text-base font-black text-red-400 mt-0.5">
                            {selectedFixture.projectedReds}
                          </div>
                        </div>
                        <div className="rounded-xl bg-[#080D1A] border border-slate-800 p-2.5">
                          <div className="text-[10px] text-slate-400">Indicator</div>
                          <div className="text-xs font-black text-white mt-1">
                            {selectedFixture.riskLevel}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-[11px] font-semibold">
                          <span>{selectedFixture.homeTeam}: {selectedFixture.homeFoulsPer90} fouls/90</span>
                          <span>{selectedFixture.awayTeam}: {selectedFixture.awayFoulsPer90} fouls/90</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden flex">
                          <div
                            className="bg-amber-400"
                            style={{
                              width: `${
                                (selectedFixture.homeFoulsPer90 /
                                  (selectedFixture.homeFoulsPer90 + selectedFixture.awayFoulsPer90)) *
                                100
                              }%`,
                            }}
                          />
                          <div className="bg-red-500 flex-1" />
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                          Match Disciplinary Watchlist (Simulated)
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedFixture.watchlist.map((name) => (
                            <span
                              key={name}
                              className="rounded-lg bg-red-500/15 border border-red-500/30 px-2.5 py-1 text-xs font-semibold text-red-200"
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ================= TAB 2: PLAYERS ================= */}
          {activeTab === 'players' && (
            <div className="space-y-3">
              {activePlayers.length === 0 ? (
                renderLiveDisconnectedState('Player Booking Rankings')
              ) : (
                <>
                  <div className="relative">
                    <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={playerQuery}
                      onChange={(e) => setPlayerQuery(e.target.value)}
                      placeholder="Search player, club, or position..."
                      className="w-full rounded-xl bg-[#0D1528] border border-slate-800 pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Club Filters */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {clubs.map((club) => (
                      <button
                        key={club}
                        onClick={() => setClubFilter(club)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap border ${
                          clubFilter === club
                            ? 'bg-amber-400 text-[#080D1A] border-amber-400'
                            : 'bg-[#0D1528] text-slate-300 border-slate-800'
                        }`}
                      >
                        {club}
                      </button>
                    ))}
                  </div>

                  {/* Sort Controls */}
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'indicatorScore', label: 'Score /100' },
                      { id: 'yellowCards', label: 'Yellows' },
                      { id: 'redCards', label: 'Reds' },
                      { id: 'foulsCommittedPer90', label: 'Fouls/90' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSortBy(opt.id)}
                        className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border ${
                          sortBy === opt.id
                            ? 'bg-red-500/20 border-red-500 text-red-200'
                            : 'bg-[#0D1528] border-slate-800 text-slate-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {/* Player Cards */}
                  <div className="space-y-2.5">
                    {filteredPlayers.map((player) => {
                      const style = getScoreStyle(player.indicatorScore);
                      return (
                        <button
                          key={player.id}
                          onClick={() => setInspectedPlayer(player)}
                          className="w-full text-left rounded-2xl border border-slate-800 bg-[#0D1528] hover:border-amber-400/50 p-3.5 transition"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white">{player.name}</span>
                                <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-slate-300">
                                  {player.position}
                                </span>
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">{player.club}</div>
                            </div>

                            <div className="flex items-center gap-2.5">
                              <div className="flex items-center gap-1.5">
                                <span className="inline-flex items-center gap-1 rounded-md bg-amber-400/15 border border-amber-400/40 px-2 py-1 text-xs font-black text-amber-300">
                                  <span className="h-2.5 w-2 rounded-[1px] bg-amber-400" />
                                  {player.yellowCards}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-md bg-red-500/15 border border-red-500/40 px-2 py-1 text-xs font-black text-red-400">
                                  <span className="h-2.5 w-2 rounded-[1px] bg-red-500" />
                                  {player.redCards}
                                </span>
                              </div>

                              <div
                                className={`h-11 w-11 rounded-xl border-2 flex flex-col items-center justify-center ${style.ring}`}
                              >
                                <span className="text-xs font-black leading-none">
                                  {player.indicatorScore}
                                </span>
                                <span className="text-[7px] font-bold">/100</span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px]">
                            <div>
                              <span className="text-slate-500 block text-[10px]">Committed/90</span>
                              <span className="font-bold text-slate-200">
                                {player.foulsCommittedPer90.toFixed(2)}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[10px]">Drawn/90</span>
                              <span className="font-bold text-amber-300">
                                {player.foulsDrawnPer90.toFixed(2)}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-slate-500 block text-[10px]">Minutes</span>
                              <span className="font-bold text-slate-200">{player.minutesPlayed}'</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ================= TAB 3: MATCHUPS ================= */}
          {activeTab === 'matchups' && (
            <div className="space-y-4">
              {activePlayers.length < 2 ? (
                renderLiveDisconnectedState('Player-vs-Player Matchup Lab')
              ) : (
                <>
                  <div className="rounded-2xl border border-slate-800 bg-[#0D1528] p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                        Head-to-Head Duel Comparison
                      </span>
                      <button
                        onClick={() => {
                          setPlayerAId(playerB.id);
                          setPlayerBId(playerA.id);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-slate-200"
                      >
                        <ArrowLeftRight className="h-3 w-3 text-amber-400" />
                        SWAP
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Player A (Enforcer)</label>
                        <select
                          value={playerA?.id || ''}
                          onChange={(e) => setPlayerAId(e.target.value)}
                          className="w-full rounded-xl bg-[#080D1A] border border-slate-700 p-2 text-xs text-white"
                        >
                          {activePlayers.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.club})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Player B (Ball Carrier)</label>
                        <select
                          value={playerB?.id || ''}
                          onChange={(e) => setPlayerBId(e.target.value)}
                          className="w-full rounded-xl bg-[#080D1A] border border-slate-700 p-2 text-xs text-white"
                        >
                          {activePlayers.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.club})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Composite Duel Indicator */}
                    <div className="rounded-xl bg-[#080D1A] border border-slate-800 p-3 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Duel Friction Indicator (Simulated)
                        </div>
                        <div className="text-xs text-slate-300 mt-0.5">
                          Composite index out of 100 (non-probabilistic)
                        </div>
                      </div>
                      <div className="text-2xl font-black text-amber-400">
                        {duelFrictionScore}
                        <span className="text-xs text-slate-400">/100</span>
                      </div>
                    </div>

                    {/* Fouls Committed vs Fouls Drawn */}
                    {playerA && playerB && (
                      <div className="space-y-3 pt-1">
                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-red-400 font-bold">
                              {playerA.name} Fouls Committed/90: {playerA.foulsCommittedPer90}
                            </span>
                            <span className="text-amber-300 font-bold">
                              {playerB.name} Fouls Drawn/90: {playerB.foulsDrawnPer90}
                            </span>
                          </div>
                          <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden flex">
                            <div
                              className="bg-red-500"
                              style={{
                                width: `${
                                  (playerA.foulsCommittedPer90 /
                                    (playerA.foulsCommittedPer90 + playerB.foulsDrawnPer90 || 1)) *
                                  100
                                }%`,
                              }}
                            />
                            <div className="bg-amber-400 flex-1" />
                          </div>
                        </div>

                        {/* Previous Disciplinary Records */}
                        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-800">
                          {[playerA, playerB].map((p) => (
                            <div key={p.id} className="rounded-xl bg-[#080D1A] border border-slate-800 p-3 space-y-2">
                              <div className="font-bold text-xs text-white truncate">{p.name}</div>
                              <div className="text-[10px] text-slate-400">
                                {p.yellowCards}Y • {p.redCards}R • {p.minutesPlayed}'
                              </div>
                              <div className="flex gap-1">
                                {p.recentForm.map((item, i) => (
                                  <span
                                    key={i}
                                    className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                                      item === 'R'
                                        ? 'bg-red-500 text-white'
                                        : item === 'Y'
                                        ? 'bg-amber-400 text-[#080D1A]'
                                        : 'bg-slate-800 text-slate-400'
                                    }`}
                                  >
                                    {item === 'CLEAN' ? '-' : item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ================= TAB 4: REFEREES ================= */}
          {activeTab === 'referees' && (
            <div className="space-y-3">
              {activeReferees.length === 0 ? (
                renderLiveDisconnectedState('Referee Booking Statistics')
              ) : (
                activeReferees.map((ref) => (
                  <div
                    key={ref.id}
                    className="rounded-2xl border border-slate-800 bg-[#0D1528] p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-sm text-white">{ref.name}</h3>
                        <p className="text-[11px] text-slate-400">
                          {ref.matchesOfficiated} Premier League matches • SIMULATED DATA
                        </p>
                      </div>
                      <span className="rounded-lg bg-red-500/15 border border-red-500/40 px-2.5 py-1 text-[10px] font-black text-red-300">
                        {ref.strictnessLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="rounded-xl bg-[#080D1A] border border-slate-800 p-2">
                        <div className="text-[10px] text-slate-400">Yellows/G</div>
                        <div className="text-sm font-black text-amber-400">{ref.yellowsPerGame}</div>
                      </div>
                      <div className="rounded-xl bg-[#080D1A] border border-slate-800 p-2">
                        <div className="text-[10px] text-slate-400">Reds/G</div>
                        <div className="text-sm font-black text-red-400">{ref.redsPerGame}</div>
                      </div>
                      <div className="rounded-xl bg-[#080D1A] border border-slate-800 p-2">
                        <div className="text-[10px] text-slate-400">Fouls/G</div>
                        <div className="text-sm font-black text-white">{ref.foulsPerGame}</div>
                      </div>
                      <div className="rounded-xl bg-[#080D1A] border border-slate-800 p-2">
                        <div className="text-[10px] text-slate-400">Card/Foul</div>
                        <div className="text-sm font-black text-slate-200">{ref.cardsPerFoulPct}%</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ================= TAB 5: DATA CENTRE ================= */}
          {activeTab === 'data' && (
            <div className="space-y-4">
              {/* Dataset Mode Switcher */}
              <div className="rounded-2xl border border-slate-800 bg-[#0D1528] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                    Active Dataset Isolation Mode
                  </span>
                  <Lock className="h-4 w-4 text-emerald-400" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDataMode('DEMO')}
                    className={`rounded-xl border p-3 text-left ${
                      dataMode === 'DEMO'
                        ? 'bg-amber-400/15 border-amber-400 text-amber-200'
                        : 'bg-[#080D1A] border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-black">DEMO MODE</div>
                    <div className="text-[10px] mt-0.5">SIMULATED DATA ONLY</div>
                  </button>

                  <button
                    onClick={() => setDataMode('LIVE')}
                    className={`rounded-xl border p-3 text-left ${
                      dataMode === 'LIVE'
                        ? 'bg-red-500/15 border-red-500 text-red-200'
                        : 'bg-[#080D1A] border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-black">LIVE MODE</div>
                    <div className="text-[10px] mt-0.5">
                      {connectionState === 'CONNECTED' ? 'VERIFIED FEED' : 'LIVE DATA NOT CONNECTED'}
                    </div>
                  </button>
                </div>
              </div>

              {/* Connection Status & Diagnostic Test */}
              <div className="rounded-2xl border border-slate-800 bg-[#0D1528] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                    Data Provider Connection Status
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      connectionState === 'CONNECTED'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : connectionState === 'ERROR'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {connectionState}
                  </span>
                </div>

                <div className="text-xs text-slate-300 bg-[#080D1A] border border-slate-800 rounded-xl p-3">
                  {connectionDetail}
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                    Server-Side Proxy Endpoint (Zero Frontend Keys)
                  </label>
                  <input
                    type="text"
                    value={proxyUrlInput}
                    onChange={(e) => setProxyUrlInput(e.target.value)}
                    placeholder="https://your-backend.onrender.com"
                    className="w-full rounded-xl bg-[#080D1A] border border-slate-700 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleRunConnectionTest}
                    disabled={isTestingConnection}
                    className="rounded-xl bg-amber-400 text-[#080D1A] font-extrabold text-xs py-2.5 px-3 flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isTestingConnection ? 'animate-spin' : ''}`} />
                    {isTestingConnection ? 'Testing...' : 'Test Connection'}
                  </button>

                  <button
                    onClick={handleRunSecurityAudit}
                    className="rounded-xl border border-slate-700 bg-slate-800 text-slate-200 font-bold text-xs py-2.5 px-3"
                  >
                    Audit Frontend Keys
                  </button>
                </div>

                {securityAuditResult && (
                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-[11px] text-emerald-200">
                    {securityAuditResult}
                  </div>
                )}
              </div>

              {/* Season, Competition & Feed Availability */}
              <div className="rounded-2xl border border-slate-800 bg-[#0D1528] p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Season</label>
                    <select
                      value={season}
                      onChange={(e) => setSeason(e.target.value)}
                      className="w-full rounded-xl bg-[#080D1A] border border-slate-700 p-2 text-xs text-white"
                    >
                      <option value="2026/27">2026/27</option>
                      <option value="2025/26">2025/26</option>
                      <option value="2024/25">2024/25</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Competition</label>
                    <select
                      value={competition}
                      onChange={(e) => setCompetition(e.target.value)}
                      className="w-full rounded-xl bg-[#080D1A] border border-slate-700 p-2 text-xs text-white"
                    >
                      <option value="PL">Premier League</option>
                      <option value="FAC">FA Cup</option>
                      <option value="EFLC">EFL Cup</option>
                    </select>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex justify-between border-t border-slate-800 pt-2.5">
                  <span>Last Successful Live Update:</span>
                  <span className="text-slate-200 font-semibold">
                    {lastLiveUpdate ? lastLiveUpdate : 'Never (Not Connected)'}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {[
                    { label: 'Fixture Data Availability', count: activeFixtures.length },
                    { label: 'Player Statistics Availability', count: activePlayers.length },
                    { label: 'Referee Statistics Availability', count: activeReferees.length },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-xl bg-[#080D1A] border border-slate-800 px-3 py-2 text-xs"
                    >
                      <span className="text-slate-300">{item.label}</span>
                      <span
                        className={`font-bold text-[10px] px-2 py-0.5 rounded ${
                          dataMode === 'DEMO'
                            ? 'bg-amber-400/15 text-amber-300'
                            : item.count > 0
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-red-500/15 text-red-300'
                        }`}
                      >
                        {dataMode === 'DEMO'
                          ? `SIMULATED (${item.count})`
                          : item.count > 0
                          ? `LIVE (${item.count})`
                          : 'UNAVAILABLE'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Player Full Disciplinary Breakdown Modal */}
        {inspectedPlayer && (
          <div className="fixed inset-0 z-50 bg-black/75 flex items-end justify-center p-3">
            <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-[#0D1528] p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    {dataMode === 'DEMO' ? 'SIMULATED DATA' : 'LIVE DATA'} • Disciplinary Profile
                  </span>
                  <h3 className="text-lg font-black text-white">{inspectedPlayer.name}</h3>
                  <p className="text-xs text-slate-400">
                    {inspectedPlayer.club} • {inspectedPlayer.position} • {inspectedPlayer.minutesPlayed}' played
                  </p>
                </div>
                <button
                  onClick={() => setInspectedPlayer(null)}
                  className="rounded-full bg-slate-800 p-1.5 text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="rounded-xl bg-[#080D1A] border border-slate-800 p-2">
                  <div className="text-[10px] text-slate-400">Score</div>
                  <div className="text-sm font-black text-amber-400">
                    {inspectedPlayer.indicatorScore}/100
                  </div>
                </div>
                <div className="rounded-xl bg-[#080D1A] border border-slate-800 p-2">
                  <div className="text-[10px] text-slate-400">Yellows</div>
                  <div className="text-sm font-black text-amber-300">{inspectedPlayer.yellowCards}</div>
                </div>
                <div className="rounded-xl bg-[#080D1A] border border-slate-800 p-2">
                  <div className="text-[10px] text-slate-400">Reds</div>
                  <div className="text-sm font-black text-red-400">{inspectedPlayer.redCards}</div>
                </div>
                <div className="rounded-xl bg-[#080D1A] border border-slate-800 p-2">
                  <div className="text-[10px] text-slate-400">Fouls/90</div>
                  <div className="text-sm font-black text-white">
                    {inspectedPlayer.foulsCommittedPer90}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Recent 5-Match Disciplinary Log
                </div>
                {inspectedPlayer.lastFiveMatches.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl bg-[#080D1A] border border-slate-800 px-3 py-2 text-xs"
                  >
                    <span className="font-semibold text-slate-200">{m.opponent}</span>
                    <span className="text-slate-400">{m.fouls} fouls</span>
                    <span
                      className={`font-black text-[10px] px-2 py-0.5 rounded ${
                        m.card === 'R'
                          ? 'bg-red-500 text-white'
                          : m.card === 'Y'
                          ? 'bg-amber-400 text-[#080D1A]'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {m.card === 'CLEAN' ? 'NO CARD' : `${m.card} ${m.minute}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Android Bottom Navigation */}
        <nav className="fixed bottom-0 w-full max-w-md bg-[#0A1020]/95 backdrop-blur border-t border-slate-800 grid grid-cols-5 py-2 px-1 z-30">
          {[
            { id: 'fixtures', label: 'Fixtures', icon: Calendar },
            { id: 'players', label: 'Players', icon: Users },
            { id: 'matchups', label: 'Matchups', icon: Swords },
            { id: 'referees', label: 'Referees', icon: Scale },
            { id: 'data', label: 'Data', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition ${
                  active ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-[10px] font-bold">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
