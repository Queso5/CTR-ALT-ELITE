import React, { useState } from 'react';
import { Button } from './ui/button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardHeader, CardTitle } from './ui/card';
import ReactModal from 'react-modal';

// Data model for a  project card
export interface KanbanProject {
  id: string;
  title: string;
  description: string;
  status: string;
  tags: string[];
  collaborators: string[];
  budget?: string;
}

const initialProjects: KanbanProject[] = [
  {
    id: '1',
    title: 'AI-Powered Healthcare Monitor',
    description: 'A system to monitor patient health using AI.',
    status: 'Idea & Research',
    tags: ['AI', 'Healthcare'],
    collaborators: ['Jane Doe', 'John Smith'],
    budget: '$120,000',
  },
  {
    id: '2',
    title: 'Smart Patent Filing',
    description: 'Automated patent filing workflow.',
    status: 'IPR Filing',
    tags: ['Automation', 'IPR'],
    collaborators: ['Alice', 'Bob'],
    budget: '$80,000',
  },
  {
    id: '4',
    title: 'NexusFlow',
    description: 'A central repository for the investors to know about the on-going projects in the industry and their scope.',
    status: 'IPR Filing',
    tags: ['Education'],
    collaborators: [],
    budget: '$100,000',
    // progress: 'validation',
  },
  {
    id: '3',
    title: 'Startup Launchpad',
    description: 'Platform to accelerate startup growth.',
    status: 'Startup / Commercialization',
    tags: ['Startup', 'Growth'],
    collaborators: ['Eve'],
    budget: '$200,000',
  },
];

const columns = [
  { key: 'Idea & Research', label: 'Idea & Research', icon: '💡' },
  { key: 'IPR Filing', label: 'IPR Filing', icon: '📄' },
  { key: 'Startup / Commercialization', label: 'Startup / Commercialization', icon: '🚀' },
];

function KanbanBoard() {
  // Settings dropdown state
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  // Search bar state and suggestions
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [activeDomain, setActiveDomain] = useState<string>('');
  const domainSuggestions = ['AI', 'Healthcare', 'Automation', 'IPR', 'Startup', 'Growth', 'Patent', 'Commercialization'];
  const [projects, setProjects] = useState<KanbanProject[]>(initialProjects);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<KanbanProject | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  // Modal state for project insight (LLM summary)
  const [insightOpen, setInsightOpen] = useState(false);
  const [insightContent, setInsightContent] = useState('');

  // Budget filter state
  const [budgetFilter, setBudgetFilter] = useState(5000000);
  const [budgetFilterActive, setBudgetFilterActive] = useState(false);

  // Document upload state
  const [attachedDocs, setAttachedDocs] = useState([
    { name: 'market-research.pdf', size: '2.4 MB', date: '2024-01-18', tag: 'Idea & Research' },
    { name: 'patent-draft.pdf', size: '1.8 MB', date: '2024-01-25', tag: 'IPR Filing' },
    { name: 'technical-specifications.pdf', size: '3.2 MB', date: '2024-01-28', tag: 'IPR Filing' },
    { name: 'business-plan.pdf', size: '4.1 MB', date: '2024-02-05', tag: 'Startup / Commercialization' },
  ]);
  const [showAttachDoc, setShowAttachDoc] = useState(false);
  const [newDocFile, setNewDocFile] = useState<File | null>(null);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const destCol = result.destination.droppableId;
    const projId = result.draggableId;
    const updated = projects.map(p =>
      p.id === projId ? { ...p, status: destCol } : p
    );
    setProjects(updated);
  };

  // Timeline events with notes/comments
  const timelineEvents = [
    { label: 'Project created in Idea & Research phase', date: '2024-01-15', note: 'Initial concept and brainstorming.' },
    { label: "Document 'market-research.pdf' uploaded", date: '2024-01-18', note: 'Comprehensive market analysis completed.' },
    { label: 'Status changed to IPR Filing', date: '2024-01-22', note: 'Started intellectual property registration.' },
    { label: "Document 'patent-draft.pdf' uploaded", date: '2024-01-25', note: 'Draft patent prepared for review.' },
    { label: "Document 'technical-specifications.pdf' uploaded", date: '2024-01-28', note: 'Technical details finalized.' },
    { label: 'Patent application submitted', date: '2024-02-01', note: 'Patent officially submitted.' },
  ];

  const statusColors = {
    'Idea & Research': 'bg-yellow-100 text-yellow-800',
    'IPR Filing': 'bg-purple-100 text-purple-800',
    'Startup / Commercialization': 'bg-green-100 text-green-800',
  };

  const openModal = (project: KanbanProject) => {
    if (project.id === '') {
      setIsAdding(true);
      setSelectedProject({
        id: '',
        title: '',
        description: '',
        status: project.status,
        tags: [],
        collaborators: [],
        budget: '',
      });
    } else {
      setIsAdding(false);
      setSelectedProject({
        id: project.id,
        title: project.title || '',
        description: project.description || '',
        status: project.status || columns[0].key,
        tags: project.tags || [],
        collaborators: project.collaborators || [],
        budget: project.budget || '',
      });
    }
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    setIsAdding(false);
  };

  // Dummy LLM summary function (replace with real API call)
  const getProjectInsight = (project) => {
    return `Project "${project.title}" aims to ${project.description.toLowerCase()}.
Key milestones include: ${timelineEvents.map(e => e.label).join(', ')}.`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto mb-8 px-16 py-3 bg-white rounded-xl shadow border border-gray-100">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-blue-400 rounded-lg shadow">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H13L13 2Z" fill="white" />
            </svg>
          </span>
          <span className="text-2xl font-bold text-gray-900">NexusFlow</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Search Bar with filter funnel and suggestions */}
          <div className="relative" style={{ minWidth: '160px', maxWidth: '200px' }}>
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-10 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all w-full"
              style={{ height: '40px' }}
              onFocus={e => setShowSuggestions(true)}
              onBlur={e => setTimeout(() => setShowSuggestions(false), 150)}
              onChange={e => setSearchValue(e.target.value)}
              value={searchValue}
            />
            {/* Magnifying lens icon */}
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
            {/* Funnel filter icon */}
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
              title="Filter options"
              onClick={() => setShowFilter(true)}
            >
              {/* Upgraded funnel icon - modern look */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 4 21 4 14 14 14 19 10 19 10 14 3 4" fill="#3b82f6" stroke="#2563eb" />
                <rect x="10" y="19" width="4" height="2" rx="1" fill="#2563eb" />
              </svg>
            </button>
            {/* Budget Filter Slider Modal */}
            {showFilter && (
              <ReactModal
                isOpen={showFilter}
                onRequestClose={() => setShowFilter(false)}
                ariaHideApp={false}
                className="max-w-md w-full mx-auto mt-16 bg-white rounded-xl shadow-2xl outline-none p-8 flex flex-col items-center justify-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
              >
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="text-lg font-semibold mb-4 text-gray-900">Filter by Budget</div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range ($)</label>
                  <input
                    type="range"
                    min={0}
                    max={5000000}
                    step={10000}
                    value={budgetFilter}
                    onChange={e => setBudgetFilter(Number(e.target.value))}
                    className="w-full mb-2"
                  />
                  <div className="flex justify-between w-full text-xs text-gray-500 mt-1">
                    <span>$0</span>
                    <span>$5,000,000</span>
                  </div>
                  <div className="mt-4 text-blue-700 font-bold">Selected: ${budgetFilter.toLocaleString()}</div>
                  <div className="flex gap-2 mt-6">
                    <Button onClick={() => { setBudgetFilterActive(true); setShowFilter(false); }} className="bg-blue-500 hover:bg-blue-600 text-white">Apply</Button>
                    <Button onClick={() => { setBudgetFilter(5000000); setBudgetFilterActive(false); setShowFilter(false); }} variant="outline">Reset</Button>
                  </div>
                </div>
              </ReactModal>
            )}
            {/* Suggestions dropdown */}
            {showSuggestions && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {domainSuggestions.filter(s => s.toLowerCase().includes(searchValue.toLowerCase())).map(suggestion => (
              <div
                key={suggestion}
                className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-gray-700"
                onMouseDown={() => {
                  setSearchValue(suggestion);
                  setShowSuggestions(false);
                  setActiveDomain(suggestion);
                }}
              >
                {suggestion}
              </div>
            ))}
                {domainSuggestions.filter(s => s.toLowerCase().includes(searchValue.toLowerCase())).length === 0 && (
                  <div className="px-4 py-2 text-gray-400">No suggestions</div>
                )}
              </div>
            )}
          </div>
          <Button variant="outline" className="flex items-center gap-1"><span>🏠</span> Home</Button>
          <Button variant="outline" className="flex items-center gap-1" onClick={() => openModal({id: '', title: '', description: '', status: columns[0].key, tags: [], collaborators: []})}><span>➕</span> New Project</Button>
          <Button variant="outline" className="flex items-center gap-1"><span>👤</span> Profile</Button>
          <div className="relative inline-block">
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => setShowSettingsDropdown((prev) => !prev)}
            >
              <span>⚙️</span> Settings
            </Button>
            {showSettingsDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-50">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Account Settings</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Theme</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Notifications</button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Removed Kanban Board Title for cleaner look */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(col => {
            // Filter projects by activeDomain/searchValue and budget
            let filteredProjects = projects.filter(p => p.status === col.key);
            const domain = activeDomain || searchValue;
            if (domain) {
              filteredProjects = filteredProjects.filter(p =>
                p.tags.some(tag => tag.toLowerCase() === domain.toLowerCase())
              );
            }
            if (budgetFilterActive) {
              filteredProjects = filteredProjects.filter(p => {
                if (!p.budget) return false;
                // Remove $ and commas, parse as number
                const num = Number(p.budget.replace(/[$,]/g, ''));
                return !isNaN(num) && num <= budgetFilter;
              });
            }
            return (
              <Droppable droppableId={col.key} key={col.key}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="rounded-xl shadow-lg p-4 bg-white border border-gray-100"
                  >
                    <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                      <span className="text-2xl">{col.icon}</span> {col.label}
                    </h3>
                    {filteredProjects.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <span className="text-gray-300 text-6xl mb-2">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H13L13 2Z" fill="#dbeafe" />
                          </svg>
                        </span>
                        <div className="text-blue-500 font-semibold mb-2">no projects in the domain found</div>
                        <Button variant="outline" className="flex items-center gap-2" onClick={() => openModal({id: '', title: '', description: '', status: col.key, tags: [], collaborators: []})}>
                          <span>➕</span> Add Card
                        </Button>
                      </div>
                    ) : (
                      <>
                        {filteredProjects.map((p, idx) => (
                          <Draggable draggableId={p.id} index={idx} key={p.id}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-4 ${snapshot.isDragging ? 'scale-105 shadow-2xl' : ''}`}
                                onClick={() => openModal(p)}
                              >
                                <Card className="border border-gray-200 bg-white cursor-pointer hover:shadow-lg transition">
                                  {/* ...existing code... */}
                                  <CardHeader className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg">{col.icon}</span>
                                      <CardTitle className="text-base font-semibold text-gray-900 truncate">{p.title}</CardTitle>
                                    </div>
                                    <div className="text-sm text-gray-500 line-clamp-2">{p.description}</div>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      {p.tags.map(tag => (
                                        <span key={tag} className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold whitespace-nowrap">{tag}</span>
                                      ))}
                                    </div>
                                    {p.budget && (
                                      <div className="mt-2 text-xs text-green-700 font-semibold">Budget: {p.budget}</div>
                                    )}
                                    <div className="mt-3 flex flex-col items-center justify-center w-full">
                                      <span className="text-xs text-blue-700 font-bold mb-1">Project Progress</span>
                                      <div className="relative w-[28rem] h-20 flex flex-col items-center justify-center">
                                        <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 bg-blue-200 rounded-full z-0"></div>
                                        <div className="absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full z-10 transition-all duration-500" style={{ width: `${p.status === 'Idea & Research' ? '25%' : p.status === 'IPR Filing' ? '50%' : p.status === 'Startup / Commercialization' ? '75%' : p.status === 'Profitable Business' ? '100%' : '0%'}`, background: '#2563eb' }}></div>
                                        <div className="relative w-full flex justify-between items-center z-20">
                                          {[0, 1, 2, 3].map(idx => {
                                            const phases = ['Idea & Research', 'IPR Filing', 'Startup / Commercialization', 'Profitable Business'];
                                            const labels = ['Ideation', 'Validation', 'Traction', 'Scaling'];
                                            const active = phases.indexOf(p.status) >= idx;
                                            return (
                                              <div key={phases[idx]} className="flex flex-col items-center w-1/4">
                                                <span className={`relative z-30 text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center ${active ? 'bg-blue-500 text-white shadow-lg' : 'bg-blue-200 text-blue-500'}`}>{idx + 1}</span>
                                              </div>
                                            );
                                          })}
                                        </div>
                                        <div className="absolute left-0 top-16 w-full flex justify-between items-center z-30">
                                          {['Ideation', 'Validation', 'Traction', 'Scaling'].map((label, idx) => (
                                            <span key={label} className="text-lg font-semibold text-blue-700 w-1/4 text-center">{label}</span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </CardHeader>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="max-w-6xl w-full mx-auto mt-8 bg-white rounded-2xl shadow-2xl outline-none p-4 md:p-16 overflow-hidden"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        {selectedProject && (
          isAdding ? (
            <form
              onSubmit={e => {
                e.preventDefault();
                if (selectedProject && selectedProject.title.trim()) {
                  const newCard: KanbanProject = {
                    ...selectedProject,
                    id: Date.now().toString(),
                    tags: selectedProject.tags || [],
                    collaborators: selectedProject.collaborators || [],
                  };
                  setProjects(prev => [...prev, newCard]);
                  setTimeout(() => openModal(newCard), 0); // Open modal for new card after adding
                }
              }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-400 rounded-xl shadow-lg">
                    <span className="text-white font-bold text-2xl">{columns.find(c => c.key === selectedProject.status)?.icon || '⚡'}</span>
                  </div>
                  <input
                    type="text"
                    className="text-2xl font-bold text-gray-900 bg-transparent border-b border-gray-300 outline-none px-2 py-1 w-full"
                    placeholder="Project Title"
                    value={selectedProject.title}
                    onChange={e => setSelectedProject(sp => ({ ...sp, title: e.target.value }))}
                    required
                  />
                </div>
                <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-700 text-xl">×</button>
              </div>
              <textarea
                className="w-full border border-gray-200 rounded-lg p-2 text-gray-900"
                placeholder="Project Description"
                value={selectedProject.description}
                onChange={e => setSelectedProject(sp => ({ ...sp, description: e.target.value }))}
                required
              />
              {/* Tag input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={tag + idx} className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold flex items-center gap-1">
                      {tag}
                      <button type="button" className="ml-1 text-gray-400 hover:text-red-500" onClick={() => setSelectedProject(sp => ({ ...sp, tags: sp.tags.filter((_, i) => i !== idx) }))}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  className="border border-gray-200 rounded px-2 py-1 w-full"
                  placeholder="Add tag and press Enter"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      e.preventDefault();
                      const newTag = e.currentTarget.value.trim();
                      if (!selectedProject.tags.includes(newTag)) {
                        setSelectedProject(sp => ({ ...sp, tags: [...sp.tags, newTag] }));
                      }
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
              {/* Add/Edit modal budget input */}
              {isAdding && (
                <input
                  type="text"
                  className="w-full border border-green-200 rounded-lg p-2 text-green-900 mb-2"
                  placeholder="Project Budget (e.g. $50,000)"
                  value={selectedProject.budget}
                  onChange={e => setSelectedProject(sp => ({ ...sp, budget: e.target.value }))}
                />
              )}
              <div className="flex gap-2">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 transition flex items-center justify-center gap-2">
                  <span>➕</span> Add Project
                </Button>
                <Button type="button" onClick={closeModal} variant="outline">Cancel</Button>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-start gap-6 w-full">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-3 bg-blue-400 rounded-xl shadow-lg">
                      <span className="text-white font-bold text-2xl">{columns.find(c => c.key === selectedProject.status)?.icon || '⚡'}</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col items-start">
                        <h2 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h2>
                        {/* Status badge - only expand to fit text, not title width */}
                        <span className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[selectedProject.status] || 'bg-gray-100 text-gray-800'} whitespace-nowrap self-start`}>
                          {selectedProject.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedProject.budget && (
                    <div className="flex flex-col items-end">
                      <span className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-1">Budget</span>
                      <span className="text-4xl md:text-5xl font-extrabold text-blue-700 bg-gray-50 rounded-lg px-6 py-2 shadow border border-blue-100">{selectedProject.budget}</span>
                    </div>
                  )}
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 text-xl ml-4">×</button>
                </div>
              </div>
              <div className="text-gray-500 mb-2">Innovation Project Snapshot - Generated on 7/17/2025</div>
              <div className="mt-6">
                    <div className="text-lg font-bold mb-1">Description</div>
                    <div className="text-gray-900 text-base mb-4">{selectedProject.description}</div>
                  </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Project History */}
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
                    <span>📅</span> Project History
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
                    <ul className="space-y-0 relative">
                      {timelineEvents.map((item, idx, arr) => (
                        <li key={item.label + item.date} className={`flex items-start gap-2 relative ${idx !== arr.length - 1 ? 'pb-6' : ''}`}>
                          <span className="mt-1 h-2 w-2 rounded-full bg-purple-500 z-10"></span>
                          <div>
                            <span className="font-semibold text-gray-900">{item.label}</span>
                            <div className="text-xs text-gray-500">{item.date}</div>
                            {/* Timeline note/comment */}
                            {item.note && (
                              <div className="text-xs text-blue-500 mt-1 italic">{item.note}</div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Description section with subtitle */}
                </div>
                {/* Attached Documents */}
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
                    <span>📄</span> Attached Documents
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto hide-scrollbar">
                    <ul className="space-y-3">
                      {attachedDocs.map(doc => (
                        <li key={doc.name} className="flex items-center justify-between group">
                          <div>
                            <span className="font-semibold text-gray-900">{doc.name}</span>
                            <div className="text-xs text-gray-500">{doc.size} • {doc.date}</div>
                            <span className="ml-2 px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-semibold">{doc.tag}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-blue-500 border-blue-200 group-hover:bg-blue-50"
                            title={`Download ${doc.name}`}
                            onClick={() => alert(`Download ${doc.name}`)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                            </svg>
                            Download
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <div className="flex flex-col md:flex-row gap-3 mt-8 justify-center items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-green-600 border-green-200 hover:bg-green-50"
                    onClick={() => setShowAttachDoc(true)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Attach Document
                  </Button>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-6 transition flex items-center justify-center gap-2"
                    onClick={() => {
                      setInsightContent(getProjectInsight(selectedProject));
                      setInsightOpen(true);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a7 7 0 00-7 7c0 3.53 2.61 6.43 6 6.92V18a1 1 0 001 1h2a1 1 0 001-1v-2.08c3.39-.49 6-3.39 6-6.92a7 7 0 00-7-7z" />
                    </svg>
                    Project Insight
                  </Button>
                </div>
                {showAttachDoc && (
                  <ReactModal
                    isOpen={showAttachDoc}
                    onRequestClose={() => setShowAttachDoc(false)}
                    ariaHideApp={false}
                    className="max-w-md w-full mx-auto mt-16 bg-white rounded-xl shadow-2xl outline-none p-8 flex flex-col items-center justify-center"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                  >
                    <div className="w-full flex flex-col items-center justify-center">
                      <div className="text-lg font-semibold mb-4 text-gray-900">Upload Document</div>
                      <label htmlFor="doc-upload" className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 mb-4 cursor-pointer hover:border-blue-400 transition">
                        <span className="text-base">Drag & drop or click to upload</span>
                        <input
                          id="doc-upload"
                          type="file"
                          className="hidden"
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              setNewDocFile(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                      {newDocFile && (
                        <div className="w-full text-center text-sm text-gray-700 mb-2">Selected: {newDocFile.name} ({(newDocFile.size / (1024 * 1024)).toFixed(2)} MB)</div>
                      )}
                      <div className="flex gap-2 mt-2">
                        <Button
                          onClick={() => {
                            if (newDocFile && selectedProject) {
                              const newDoc = {
                                name: newDocFile.name,
                                size: `${(newDocFile.size / (1024 * 1024)).toFixed(2)} MB`,
                                date: new Date().toISOString().slice(0, 10),
                                tag: selectedProject.status,
                              };
                              setAttachedDocs(prev => [...prev, newDoc]);
                              setNewDocFile(null);
                              setShowAttachDoc(false);
                            }
                          }}
                          disabled={!newDocFile}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          Upload
                        </Button>
                        <Button onClick={() => { setShowAttachDoc(false); setNewDocFile(null); }} variant="outline">Cancel</Button>
                      </div>
                    </div>
                  </ReactModal>
                )}
              </div>
            </div>
          )
        )}
      </ReactModal>
      {/* Project Insight Modal */}
      <ReactModal
        isOpen={insightOpen}
        onRequestClose={() => setInsightOpen(false)}
        ariaHideApp={false}
        className="max-w-lg w-full mx-auto mt-16 bg-white rounded-xl shadow-2xl outline-none p-8"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-yellow-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a7 7 0 00-7 7c0 3.53 2.61 6.43 6 6.92V18a1 1 0 001 1h2a1 1 0 001-1v-2.08c3.39-.49 6-3.39 6-6.92a7 7 0 00-7-7z" />
          </svg>
          Project Insight
        </h2>
        <div className="text-gray-700 mb-6 whitespace-pre-line">{insightContent}</div>
        <Button onClick={() => setInsightOpen(false)} className="bg-blue-500 hover:bg-blue-600 text-white">Close</Button>
      </ReactModal>
      {/* Persistent Footer */}
      <footer className="w-full text-center py-6 mt-12 text-gray-400 text-sm">
        NexusFlow © 2025. Innovation made easy.
      </footer>
    </div>
  );
}

// Hide scrollbars for timeline and documents sections
// Add this to your global CSS or in a <style> tag if using CSS-in-JS
/*
.hide-scrollbar::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
*/
export default KanbanBoard;
