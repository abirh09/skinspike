'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Mail, Info, Menu, X, AlertCircle, BarChart2, Target, Shield, Users, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 9,
    currentPage: 1,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  useEffect(() => {
    fetchItems();
  }, [filter, pagination.currentPage]);

  const fetchItems = async () => {
    setLoading(true);

    try {
      const typeParam = filter !== 'all' ? `&type=${filter}` : '';
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    const res = await fetch(
      `${apiUrl}?limit=9&page=${pagination.currentPage}${typeParam}`,
      {
        method: 'GET',
      }
    );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const parsed = await res.json();
      console.log('Function response:', parsed);

      if (!parsed.success || !Array.isArray(parsed.items)) {
        throw new Error('Invalid payload from function');
      }

      const normalizedItems = parsed.items.map((doc) => ({
        ...doc,
        id: doc.$id,
        detected_at: doc.$createdAt,
        image_url: doc.image_url,
      }));

      setItems(normalizedItems);
      setPagination(parsed.pagination);
    } catch (err) {
      console.error('❌ Fetch failed:', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const formatPrice = (price) => `$${(price / 100).toFixed(2)}`;

  const formatTime = (dateString) => {
    const diff = Math.floor((Date.now() - new Date(dateString)) / 60000);
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C3DBFF] via-white to-[#C3DBFF] text-slate-800 flex flex-col">
      {/* NAVBAR */}
      <nav className="border-b border-[#C3DBFF]/50 sticky top-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <img src="/logo.png" alt="SkinSpike Logo" className="w-15 h-15" /> {/* Adjust src, alt, and className */}
              <span className="font-bold text-xl text-[#4B4E8A]">
                SkinSpike
                </span>
                </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setCurrentPage('home')}
                className={`transition-colors hover:text-[#4B4E8A] ${
                  currentPage === 'home' ? 'text-[#4B4E8A] font-semibold' : 'text-slate-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('about')}
                className={`transition-colors hover:text-[#4B4E8A] ${
                  currentPage === 'about' ? 'text-[#4B4E8A] font-semibold' : 'text-slate-600'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className={`transition-colors hover:text-[#4B4E8A] ${
                  currentPage === 'contact' ? 'text-[#4B4E8A] font-semibold' : 'text-slate-600'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-600 hover:text-[#4B4E8A] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'home' ? 'bg-[#C3DBFF] text-[#4B4E8A]' : 'text-slate-600 hover:bg-[#C3DBFF]/50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('about');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'about' ? 'bg-[#C3DBFF] text-[#4B4E8A]' : 'text-slate-600 hover:bg-[#C3DBFF]/50'
                }`}
              >
                About
              </button>
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'contact' ? 'bg-[#C3DBFF] text-[#4B4E8A]' : 'text-slate-600 hover:bg-[#C3DBFF]/50'
                }`}
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* MAIN */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {currentPage === 'home' && (
          <>
            <div className="text-center mb-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-[#4B4E8A]">
                CS2 Market Insights
              </h1>
              <p className="text-slate-600 text-base sm:text-lg">
                Discover significant price changes and trends for Steam items
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-5 sm:px-6 py-2.5 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  filter === 'all'
                    ? 'bg-[#4B4E8A] text-white shadow-lg shadow-[#4B4E8A]/50'
                    : 'bg-white text-slate-600 hover:bg-[#C3DBFF]/50 border border-[#C3DBFF]'
                }`}
              >
                All Alerts
              </button>
              <button
                onClick={() => handleFilterChange('surge')}
                className={`px-5 sm:px-6 py-2.5 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center gap-2 ${
                  filter === 'surge'
                    ? 'bg-gradient-to-r from-lime-500 to-green-500 text-white shadow-lg shadow-lime-400/50'
                    : 'bg-white text-slate-600 hover:bg-lime-100 border border-lime-300'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Price Surge
              </button>
              <button
                onClick={() => handleFilterChange('crash')}
                className={`px-5 sm:px-6 py-2.5 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center gap-2 ${
                  filter === 'crash'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-400/50'
                    : 'bg-white text-slate-600 hover:bg-red-100 border border-red-300'
                }`}
              >
                <TrendingDown className="w-4 h-4" />
                Price Crash
              </button>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-12 h-12 border-4 border-[#4B4E8A] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-600">Loading market data...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-block bg-white p-6 rounded-2xl shadow-lg border border-[#C3DBFF]">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C3DBFF] to-[#4B4E8A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-[#4B4E8A]" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No Fluctuations Detected</h3>
                  <p className="text-slate-600">
                    No significant price movements in the past 24 hours.
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Check back later for new alerts!
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-white rounded-xl overflow-hidden border border-[#C3DBFF] hover:border-[#4B4E8A] transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl shadow-md"
                    >
                      <div className="relative h-44 sm:h-48 bg-gradient-to-br from-[#C3DBFF] to-white flex items-center justify-center p-4 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#C3DBFF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img
                          src={item.image_url}
                          alt={item.item_name}
                          className="max-h-full max-w-full object-contain drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                          }}
                        />
                        <div
                          className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 backdrop-blur-sm shadow-md ${
                            item.type === 'surge'
                              ? 'bg-lime-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}
                        >
                          {item.type === 'surge' ? (
                            <>
                              <TrendingUp className="w-3 h-3" />
                              <span>Surge</span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="w-3 h-3" />
                              <span>Crash</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        <h3 className="font-semibold text-base sm:text-lg mb-3 text-center text-slate-800 group-hover:text-[#4B4E8A] transition-colors leading-snug min-h-[3rem]">{item.item_name}</h3>
                        <div className="mb-4">
                          <p className="text-xs text-slate-500 mb-1">Price Change</p>
                          <div
                          className={`text-l font-bold flex items-center justify-center gap-2 text-center whitespace-nowrap ${
                            item.type === 'surge' ? 'text-lime-600' : 'text-red-600'}`}>
                            {item.type === 'surge' ? (
                              <TrendingUp className="w-5 h-5" />
                            ) : (
                              <TrendingDown className="w-5 h-5" />
                            )}
                            <span>
                              {item.type === 'surge' ? '+' : '-'}
                              {Math.abs(item.price_change_percent)}% price change over a period of {item.period}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm border-t border-[#C3DBFF]/50 pt-4">
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Old Price</p>
                            <p className="font-semibold text-slate-700">
                              {formatPrice(item.old_price)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-500 text-xs mb-1">Current</p>
                            <p className={`font-semibold ${item.type === 'surge' ? 'text-lime-600' : 'text-red-600'}`}>
                              {formatPrice(item.current_price)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 text-xs text-slate-500 text-center bg-[#C3DBFF]/50 py-2 rounded border border-[#C3DBFF]/50">
                          Detected {formatTime(item.detected_at)}
                        </div>

                        <a
                          href={`https://steamcommunity.com/market/listings/730/${encodeURIComponent(item.item_name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 block text-center text-[#4B4E8A] hover:text-[#4B4E8A]/80 font-medium underline"
                        >
                          View on Steam Market
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {pagination.totalPages > 1 && (
                  <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-xl border border-[#C3DBFF] shadow-md">
                    <div className="text-sm text-slate-600">
                      Page <span className="font-semibold text-[#4B4E8A]">{pagination.currentPage}</span> of{' '}
                      <span className="font-semibold text-[#4B4E8A]">{pagination.totalPages}</span>
                      {' '}• Total: <span className="font-semibold text-[#4B4E8A]">{pagination.total}</span> alerts
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={!pagination.hasPrevPage}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                          pagination.hasPrevPage
                            ? 'bg-white text-[#4B4E8A] hover:bg-[#C3DBFF]/50 border border-[#C3DBFF] hover:border-[#4B4E8A]'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Previous</span>
                      </button>

                      <div className="flex items-center gap-1">
                        {[...Array(Math.min(5, pagination.totalPages))].map((_, idx) => {
                          let pageNum;
                          if (pagination.totalPages <= 5) {
                            pageNum = idx + 1;
                          } else if (pagination.currentPage <= 3) {
                            pageNum = idx + 1;
                          } else if (pagination.currentPage >= pagination.totalPages - 2) {
                            pageNum = pagination.totalPages - 4 + idx;
                          } else {
                            pageNum = pagination.currentPage - 2 + idx;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                                pagination.currentPage === pageNum
                                  ? 'bg-[#4B4E8A] text-white shadow-lg'
                                  : 'bg-white text-slate-600 hover:bg-[#C3DBFF]/50 border border-[#C3DBFF]'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={!pagination.hasNextPage}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                          pagination.hasNextPage
                            ? 'bg-white text-[#4B4E8A] hover:bg-[#C3DBFF]/50 border border-[#C3DBFF] hover:border-[#4B4E8A]'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
                        }`}
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {currentPage === 'about' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#C3DBFF] hover:border-[#4B4E8A] transition-all shadow-lg">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#4B4E8A] p-3 rounded-full shadow-md">
                  <Info className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl sm:text-2xl font-bold text-slate-800 text-[#4B4E8A]">About SkinSpike - Steam Market Price Tracker</h1>
              </div>
              <div className="space-y-10">
                <section className="bg-[#C3DBFF]/20 p-6 rounded-lg border border-[#C3DBFF]/50 shadow-sm">
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    Welcome to SkinSpike. We collect publicly available market data at regular intervals and provide historical insights to help users observe trends and notable price movements over time.
                  </p>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#4B4E8A] p-2 rounded-lg shadow">
                      <BarChart2 className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-[#4B4E8A]">What We Do</h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    SkinSpike monitors Steam Community Market prices and stores historical snapshots to give users a clear picture of how item values have changed. Our tools highlight significant increases or decreases in price across different time periods, making it easier to understand market trends and volatility.
                  </p>
                </section>
{/* 
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#4B4E8A] p-2 rounded-lg shadow">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-[#4B4E8A]">Our Purpose</h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Our mission is to provide transparency and insight into Steam's digital item market. SkinSpike is designed for educational and informational purposes, helping users analyze historical trends without influencing or predicting future market activity.
                  </p>
                </section> */}

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-red-500 to-orange-500 p-2 rounded-lg shadow">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-[#4B4E8A]">Important Disclaimers</h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 bg-[#C3DBFF]/20 p-4 rounded-lg border border-[#C3DBFF]">
                      <Shield className="w-5 h-5 text-[#4B4E8A] mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-slate-800">Informational Use Only:</strong> <span className="text-slate-600">SkinSpike is not financial or investment advice. All information provided is for informational purposes only, and users are solely responsible for any decisions they make based on it.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 bg-[#C3DBFF]/20 p-4 rounded-lg border border-[#C3DBFF]">
                      <Shield className="w-5 h-5 text-[#4B4E8A] mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-slate-800">No Affiliation:</strong> <span className="text-slate-600">SkinSpike is not affiliated with, endorsed by, or sponsored by Valve Corporation or Steam. All trademarks, item names, and logos belong to their respective owners.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 bg-[#C3DBFF]/20 p-4 rounded-lg border border-[#C3DBFF]">
                      <Shield className="w-5 h-5 text-[#4B4E8A] mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-slate-800">No Market Manipulation:</strong> <span className="text-slate-600">We do not promote, participate in, or coordinate market manipulation, including pump-and-dump schemes. SkinSpike does not encourage buying or selling any specific items and does not benefit from market movements.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 bg-[#C3DBFF]/20 p-4 rounded-lg border border-[#C3DBFF]">
                      <Shield className="w-5 h-5 text-[#4B4E8A] mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-slate-800">Data Accuracy:</strong> <span className="text-slate-600">While we strive to keep our data accurate and up to date, SkinSpike cannot guarantee completeness or precision at all times. Prices may change rapidly, and temporary discrepancies may occur due to API limitations, market delays, or other conditions.</span>
                      </div>
                    </li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#4B4E8A] p-2 rounded-lg shadow">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-[#4B4E8A]">User Responsibility</h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    By using SkinSpike, you acknowledge that any actions taken based on the information provided are at your own risk. Our goal is to provide unbiased insights and historical data, not to direct buying, selling, or trading decisions.
                  </p>
                </section>

                {/* <p className="text-sm text-slate-500 mt-6 italic text-center">
                  Keywords: Steam market tracker, CS2 skin prices, Steam Community Market analysis, historical price data, market trends, price alerts
                </p> */}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#C3DBFF] hover:border-[#4B4E8A] transition-all shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#4B4E8A] p-2 rounded-lg shadow-md">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Contact Us</h2>
              </div>
              <div className="space-y-6 text-slate-600">
                <p>
                  Have questions, feedback, or suggestions? We would love to hear from you!
                </p>
                <div className="flex items-start gap-3 bg-[#C3DBFF]/50 p-4 rounded-lg hover:bg-[#C3DBFF] transition-colors border border-[#C3DBFF]">
                  <Mail className="w-5 h-5 text-[#4B4E8A] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1 text-slate-800">Email</p>
                    <a
                      href="mailto:contact@skinspike.com"
                      className="text-[#4B4E8A] hover:text-[#4B4E8A]/80 transition-colors underline"
                    >
                      contact@skinspike.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="border-t border-[#C3DBFF] py-6 mt-auto bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-xs sm:text-sm">
          <p>© 2026 SkinSpike. Not affiliated with Steam or Valve Corporation.</p>
          <p className="mt-2">Prices and item information are sourced from the publicly available sources</p>
          <p className="mt-4">All information is for educational and informational purposes only. SkinSpike is not financial or investment advice. Users are responsible for their own decisions.</p>
        </div>
      </footer>
    </div>
  );
}