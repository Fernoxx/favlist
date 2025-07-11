import React, { useState } from 'react';
import { Heart, DollarSign, Link2, Music, ExternalLink, TrendingUp, Sparkles, Trophy, Crown, Medal, ChevronRight, Grid3x3 } from 'lucide-react';

// Mock data for demonstration
const initialPlaylists = [
  {
    id: '1',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
    name: 'Today\'s Top Hits',
    owner: '@musiclover.eth',
    ownerAvatar: 'https://i.pravatar.cc/150?img=1',
    votes: 234,
    totalTips: 45.50,
    tracks: ['Anti-Hero', 'Flowers', 'Kill Bill', 'Unholy'],
    imageUrl: 'https://i.scdn.co/image/ab67706f00000002c414e7daf34690c9f983f76e',
    hasVoted: false,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd',
    name: 'RapCaviar',
    owner: '@hiphophead.eth',
    ownerAvatar: 'https://i.pravatar.cc/150?img=2',
    votes: 189,
    totalTips: 78.25,
    tracks: ['First Person Shooter', 'Paint The Town Red', 'Monaco', 'Fukumean'],
    imageUrl: 'https://i.scdn.co/image/ab67706f00000002993f49e37caa24e8460c5666',
    hasVoted: false,
    createdAt: new Date('2024-01-14')
  },
  {
    id: '3',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO',
    name: 'Peaceful Piano',
    owner: '@chillvibes.eth',
    ownerAvatar: 'https://i.pravatar.cc/150?img=3',
    votes: 156,
    totalTips: 23.75,
    tracks: ['River Flows In You', 'Comptine d\'un autre été', 'Nuvole Bianche', 'Experience'],
    imageUrl: 'https://i.scdn.co/image/ab67706f00000002d073e656e546e43bc387ad79',
    hasVoted: false,
    createdAt: new Date('2024-01-13')
  },
  {
    id: '4',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX1lVhptIYRda',
    name: 'Hot Country',
    owner: '@countryfan.eth',
    ownerAvatar: 'https://i.pravatar.cc/150?img=4',
    votes: 145,
    totalTips: 34.00,
    tracks: ['Last Night', 'Fast Car', 'Need A Favor', 'Love You Anyway'],
    imageUrl: 'https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32daaf7e',
    hasVoted: false,
    createdAt: new Date('2024-01-12')
  },
  {
    id: '5',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4JAvHpjipBk',
    name: 'New Music Friday',
    owner: '@newmusic.eth',
    ownerAvatar: 'https://i.pravatar.cc/150?img=5',
    votes: 134,
    totalTips: 67.50,
    tracks: ['Greedy', 'Yes, And?', 'Lovin On Me', 'Beautiful Things'],
    imageUrl: 'https://i.scdn.co/image/ab67706f00000002db32a17c1f5291b19f392180',
    hasVoted: false,
    createdAt: new Date('2024-01-11')
  },
  {
    id: '6',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4UtSsGT1Sbe',
    name: 'All Out 80s',
    owner: '@retro.eth',
    ownerAvatar: 'https://i.pravatar.cc/150?img=6',
    votes: 98,
    totalTips: 12.25,
    tracks: ['Take On Me', 'Don\'t Stop Believin\'', 'Africa', 'Sweet Child O\' Mine'],
    imageUrl: 'https://picsum.photos/300/300?random=6',
    hasVoted: false,
    createdAt: new Date('2024-01-10')
  },
  {
    id: '7',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd',
    name: 'Chill Hits',
    owner: '@relaxmode.eth',
    ownerAvatar: 'https://i.pravatar.cc/150?img=7',
    votes: 87,
    totalTips: 45.00,
    tracks: ['Blinding Lights', 'Levitating', 'Stay', 'Heat Waves'],
    imageUrl: 'https://picsum.photos/300/300?random=7',
    hasVoted: false,
    createdAt: new Date('2024-01-09')
  },
  {
    id: '8',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
    name: 'Dance Pop Hits',
    owner: '@danceparty.eth',
    ownerAvatar: 'https://i.pravatar.cc/150?img=8',
    votes: 76,
    totalTips: 23.00,
    tracks: ['Flowers', 'Unholy', 'I\'m Good', 'Tití Me Preguntó'],
    imageUrl: 'https://picsum.photos/300/300?random=8',
    hasVoted: false,
    createdAt: new Date('2024-01-08')
  }
];

export default function FarcasterMusicApp() {
  const [playlists, setPlaylists] = useState(initialPlaylists);
  const [currentPage, setCurrentPage] = useState('home');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [tipAmount, setTipAmount] = useState('1');
  const [isConnected, setIsConnected] = useState(false);
  const [votedPlaylists, setVotedPlaylists] = useState(new Set());

  // Sort playlists by votes
  const sortedPlaylists = [...playlists].sort((a, b) => b.votes - a.votes);
  const topPlaylists = sortedPlaylists.slice(0, 5);

  const handleVote = (playlistId) => {
    if (!isConnected) {
      alert('Please connect your Farcaster wallet to vote!');
      return;
    }

    if (votedPlaylists.has(playlistId)) {
      return;
    }

    setPlaylists(prev => prev.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, votes: playlist.votes + 1 }
        : playlist
    ));

    setVotedPlaylists(prev => new Set([...prev, playlistId]));
  };

  const handleTip = () => {
    if (!isConnected) {
      alert('Please connect your Farcaster wallet to tip!');
      return;
    }

    const amount = parseFloat(tipAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setPlaylists(prev => prev.map(playlist => 
      playlist.id === selectedPlaylist.id 
        ? { ...playlist, totalTips: playlist.totalTips + amount }
        : playlist
    ));
    
    setShowTipModal(false);
    setTipAmount('1');
    alert(`Successfully tipped $${amount} USDC!`);
  };

  const handleAddPlaylist = () => {
    if (!isConnected) {
      alert('Please connect your Farcaster wallet to share playlists!');
      return;
    }

    const playlistId = playlistUrl.match(/playlist\/([a-zA-Z0-9]+)/)?.[1];
    if (!playlistId) {
      alert('Invalid Spotify playlist URL');
      return;
    }

    const newPlaylist = {
      id: Date.now().toString(),
      spotifyUrl: playlistUrl,
      name: 'My Awesome Playlist',
      owner: '@yourname.eth',
      ownerAvatar: 'https://i.pravatar.cc/150?img=9',
      votes: 0,
      totalTips: 0,
      tracks: ['Song 1', 'Song 2', 'Song 3', 'Song 4'],
      imageUrl: `https://picsum.photos/300/300?random=${Date.now()}`,
      hasVoted: false,
      createdAt: new Date()
    };

    setPlaylists([...playlists, newPlaylist]);
    setShowAddModal(false);
    setPlaylistUrl('');
    alert('Playlist shared successfully!');
  };

  const getRankIcon = (index) => {
    if (index === 0) return <Crown className="w-8 h-8 text-yellow-400" />;
    if (index === 1) return <Medal className="w-7 h-7 text-gray-300" />;
    if (index === 2) return <Medal className="w-6 h-6 text-orange-600" />;
    return <span className="text-2xl font-bold text-white/60">#{index + 1}</span>;
  };

  const PlaylistCard = ({ playlist, index, isTopFive = false }) => {
    const isVoted = votedPlaylists.has(playlist.id);
    
    return (
      <div className="group backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 relative">
        {/* Ranking badge for top 3 in all playlists view */}
        {!isTopFive && index < 3 && (
          <div className={`absolute -top-3 -right-3 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg ${
            index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
            index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
            'bg-gradient-to-br from-orange-600 to-orange-700 text-white'
          }`}>
            #{index + 1}
          </div>
        )}

        <div className="relative mb-4 rounded-2xl overflow-hidden group-hover:shadow-xl transition-all duration-500">
          <img 
            src={playlist.imageUrl} 
            alt={playlist.name}
            className="w-full aspect-square object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <a
            href={playlist.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
          </a>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 truncate">{playlist.name}</h3>
        
        <div className="mb-4 space-y-1">
          {playlist.tracks.slice(0, 3).map((track, i) => (
            <div key={i} className="text-sm text-white/40 truncate">
              {i + 1}. {track}
            </div>
          ))}
          {playlist.tracks.length > 3 && (
            <div className="text-sm text-white/30">+{playlist.tracks.length - 3} more</div>
          )}
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <img 
            src={playlist.ownerAvatar} 
            alt={playlist.owner}
            className="w-8 h-8 rounded-full border-2 border-white/20"
          />
          <span className="text-sm text-white/60">{playlist.owner}</span>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => handleVote(playlist.id)}
            disabled={isVoted}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              isVoted 
                ? 'bg-pink-500/20 text-pink-400 cursor-not-allowed' 
                : 'bg-white/10 hover:bg-white/20 text-white hover:bg-pink-500/20 hover:text-pink-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${isVoted ? 'fill-current' : ''}`} />
            <span className="font-semibold">{playlist.votes}</span>
          </button>

          <div className="flex items-center space-x-3">
            <span className="text-green-400 font-bold">${playlist.totalTips.toFixed(2)}</span>
            <button
              onClick={() => {
                setSelectedPlaylist(playlist);
                setShowTipModal(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-green-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-1"
            >
              <DollarSign className="w-4 h-4" />
              <span>Tip</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-screen animate-pulse"
              style={{
                background: `radial-gradient(circle, ${i % 2 ? '#8B5CF6' : '#EC4899'} 0%, transparent 70%)`,
                width: `${Math.random() * 400 + 200}px`,
                height: `${Math.random() * 400 + 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${10 + i * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="backdrop-blur-xl bg-black/20 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Music className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">
                  Farcaster <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Music</span>
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Share Playlist</span>
                </button>
                
                <button
                  onClick={() => setIsConnected(!isConnected)}
                  className={`px-6 py-3 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    isConnected 
                      ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {isConnected ? '✓ Connected' : 'Connect Wallet'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <div className="flex items-center justify-center mb-8">
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-1 border border-white/10 flex">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  currentPage === 'home' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Trophy className="w-5 h-5" />
                <span>Top 5</span>
              </button>
              <button
                onClick={() => setCurrentPage('all')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  currentPage === 'all' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
                <span>All Playlists</span>
              </button>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 pb-8">
          {currentPage === 'home' ? (
            /* Top 5 Featured Layout */
            <div className="space-y-8">
              {/* Hero Section for #1 */}
              {topPlaylists[0] && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-3xl" />
                  <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 overflow-hidden">
                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                      <Crown className="w-10 h-10 text-yellow-400 animate-pulse" />
                      <span className="text-3xl font-bold text-yellow-400">#1</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                          src={topPlaylists[0].imageUrl} 
                          alt={topPlaylists[0].name}
                          className="w-full aspect-square object-cover"
                        />
                        <a
                          href={topPlaylists[0].spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        >
                          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                            <ExternalLink className="w-10 h-10 text-white" />
                          </div>
                        </a>
                      </div>
                      
                      <div className="flex flex-col justify-center">
                        <h2 className="text-4xl font-bold text-white mb-4">{topPlaylists[0].name}</h2>
                        
                        <div className="flex items-center space-x-3 mb-6">
                          <img 
                            src={topPlaylists[0].ownerAvatar} 
                            alt={topPlaylists[0].owner}
                            className="w-12 h-12 rounded-full border-2 border-white/20"
                          />
                          <span className="text-lg text-white/80">{topPlaylists[0].owner}</span>
                        </div>
                        
                        <div className="space-y-2 mb-6">
                          {topPlaylists[0].tracks.map((track, i) => (
                            <div key={i} className="text-white/60">
                              {i + 1}. {track}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleVote(topPlaylists[0].id)}
                            disabled={votedPlaylists.has(topPlaylists[0].id)}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
                              votedPlaylists.has(topPlaylists[0].id)
                                ? 'bg-pink-500/20 text-pink-400 cursor-not-allowed' 
                                : 'bg-white/10 hover:bg-white/20 text-white hover:bg-pink-500/20 hover:text-pink-400'
                            }`}
                          >
                            <Heart className={`w-6 h-6 ${votedPlaylists.has(topPlaylists[0].id) ? 'fill-current' : ''}`} />
                            <span className="font-bold text-lg">{topPlaylists[0].votes}</span>
                          </button>
                          
                          <div className="flex items-center space-x-3">
                            <span className="text-green-400 font-bold text-xl">${topPlaylists[0].totalTips.toFixed(2)}</span>
                            <button
                              onClick={() => {
                                setSelectedPlaylist(topPlaylists[0]);
                                setShowTipModal(true);
                              }}
                              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-lg shadow-green-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                            >
                              <DollarSign className="w-5 h-5" />
                              <span>Tip USDC</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rest of Top 5 */}
              <div className="grid md:grid-cols-2 gap-6">
                {topPlaylists.slice(1, 5).map((playlist, index) => (
                  <div
                    key={playlist.id}
                    className="group backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getRankIcon(index + 1)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="relative w-32 h-32 rounded-2xl overflow-hidden mb-4 group-hover:shadow-xl transition-all duration-500 float-right ml-4">
                          <img 
                            src={playlist.imageUrl} 
                            alt={playlist.name}
                            className="w-full h-full object-cover"
                          />
                          <a
                            href={playlist.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                          >
                            <ExternalLink className="w-8 h-8 text-white" />
                          </a>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2">{playlist.name}</h3>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <img 
                            src={playlist.ownerAvatar} 
                            alt={playlist.owner}
                            className="w-6 h-6 rounded-full border border-white/20"
                          />
                          <span className="text-sm text-white/60">{playlist.owner}</span>
                        </div>
                        
                        <div className="text-sm text-white/40 mb-4">
                          {playlist.tracks.slice(0, 2).join(' • ')}
                          {playlist.tracks.length > 2 && ` • +${playlist.tracks.length - 2} more`}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleVote(playlist.id)}
                            disabled={votedPlaylists.has(playlist.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                              votedPlaylists.has(playlist.id)
                                ? 'bg-pink-500/20 text-pink-400 cursor-not-allowed' 
                                : 'bg-white/10 hover:bg-white/20 text-white hover:bg-pink-500/20 hover:text-pink-400'
                            }`}
                          >
                            <Heart className={`w-5 h-5 ${votedPlaylists.has(playlist.id) ? 'fill-current' : ''}`} />
                            <span className="font-semibold">{playlist.votes}</span>
                          </button>

                          <div className="flex items-center space-x-3">
                            <span className="text-green-400 font-bold">${playlist.totalTips.toFixed(2)}</span>
                            <button
                              onClick={() => {
                                setSelectedPlaylist(playlist);
                                setShowTipModal(true);
                              }}
                              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-green-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-1"
                            >
                              <DollarSign className="w-4 h-4" />
                              <span>Tip</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="flex justify-center pt-8">
                <button
                  onClick={() => setCurrentPage('all')}
                  className="group flex items-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <span className="text-white font-semibold">View All {playlists.length} Playlists</span>
                  <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ) : (
            /* All Playlists Grid */
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">All Playlists</h2>
                <p className="text-white/60">{playlists.length} curated playlists from the community</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPlaylists.map((playlist, index) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} index={index} isTopFive={false} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Playlist Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Share Your Playlist</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/60 mb-2">Spotify Playlist URL</label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={playlistUrl}
                  onChange={(e) => setPlaylistUrl(e.target.value)}
                  placeholder="https://open.spotify.com/playlist/..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleAddPlaylist}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Share Playlist
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tip Modal */}
      {showTipModal && selectedPlaylist && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">Tip Playlist</h3>
            <p className="text-white/60 mb-6">Support {selectedPlaylist.owner}'s music taste!</p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/60 mb-2">Amount (USDC)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="number"
                  value={tipAmount}
                  onChange={(e) => setTipAmount(e.target.value)}
                  min="0.01"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Network</span>
                <span className="text-white font-medium">Base</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-white/60">Token</span>
                <span className="text-white font-medium">USDC</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleTip}
                className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Send ${tipAmount} USDC
              </button>
              <button
                onClick={() => setShowTipModal(false)}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
