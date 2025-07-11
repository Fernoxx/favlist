'use client';

import React, { useState } from 'react';
import { Heart, DollarSign, Link2, Music, ExternalLink, TrendingUp, Sparkles, Trophy, Crown, Medal, ChevronRight, Grid3x3 } from 'lucide-react';

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

// We'll add the rest in next commits
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <h1 className="text-white text-center py-10">Farcaster Music App</h1>
    </div>
  );
}
