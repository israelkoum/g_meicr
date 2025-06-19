import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Phone, User, UserCheck, UserX, Save, X, Camera, Download, Upload, Settings, BarChart3 } from 'lucide-react';

const ChurchMembersApp = () => {
  // Données initiales simplifiées pour test
  const initialMembers = [
    { id: 1, nom: "Adaï Yvette (Mme)", statut: "Baptisée", telephone: "05 45 45 64 83", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-01-15", notes: "" },
    { id: 2, nom: "Adai Marie-Cécile", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-01-16", notes: "" },
    { id: 3, nom: "Christian (Frère)", statut: "Non baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-01-27", notes: "" }
  ];

  // États avec protection localStorage
  const [members, setMembers] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('churchMembers');
        return saved ? JSON.parse(saved) : initialMembers;
      } catch (error) {
        console.error('Erreur localStorage:', error);
        return initialMembers;
      }
    }
    return initialMembers;
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [newMember, setNewMember] = useState({
    nom: '',
    statut: 'Baptisé',
    telephone: '',
    evangeliste: '',
    photo: null,
    notes: ''
  });

  // Sauvegarder avec protection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('churchMembers', JSON.stringify(members));
      } catch (error) {
        console.error('Erreur sauvegarde:', error);
      }
    }
  }, [members]);

  // Statistiques
  const totalMembers = members.length;
  const baptizedMembers = members.filter(m => m.statut === 'Baptisé' || m.statut === 'Baptisée').length;
  const nonBaptizedMembers = members.filter(m => m.statut === 'Non baptisé' || m.statut === 'Non baptisée').length;
  const membersWithPhotos = members.filter(m => m.photo).length;
  const evangelists = [...new Set(members.filter(m => m.evangeliste).map(m => m.evangeliste))];

  // Filtrage
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.telephone.includes(searchTerm) ||
                         member.evangeliste.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (member.notes && member.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterStatus === 'Tous' || 
                         (filterStatus === 'Baptisés' && (member.statut === 'Baptisé' || member.statut === 'Baptisée')) ||
                         (filterStatus === 'Non baptisés' && (member.statut === 'Non baptisé' || member.statut === 'Non baptisée'));
    
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage);

  // Actions
  const handleAddMember = () => {
    if (newMember.nom.trim()) {
      const member = {
        id: Date.now(),
        ...newMember,
        dateAjout: new Date().toISOString().split('T')[0]
      };
      setMembers([member, ...members]);
      setNewMember({ nom: '', statut: 'Baptisé', telephone: '', evangeliste: '', photo: null, notes: '' });
      setShowAddForm(false);
    }
  };

  const handleFileUpload = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Taille max: 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (isEditing && editingMember) {
          setEditingMember({...editingMember, photo: event.target.result});
        } else {
          setNewMember({...newMember, photo: event.target.result});
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditMember = (member) => {
    setEditingMember({ ...member });
  };

  const handleSaveEdit = () => {
    setMembers(members.map(m => m.id === editingMember.id ? editingMember : m));
    setEditingMember(null);
  };

  const handleDeleteMember = (id) => {
    if (window.confirm('Supprimer ce membre ?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(members, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `membres_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getStatusIcon = (statut) => {
    return (statut === 'Baptisé' || statut === 'Baptisée') ?
      <UserCheck className="w-4 h-4 text-green-600" /> :
      <UserX className="w-4 h-4 text-orange-600" />;
  };

  const getStatusColor = (statut) => {
    return (statut === 'Baptisé' || statut === 'Baptisée') ?
      'bg-green-100 text-green-800' :
      'bg-orange-100 text-orange-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Gestionnaire de Membres
              </h1>
              <p className="text-gray-600 mt-1">Église - Administration des membres</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Admin
              </button>
            </div>
          </div>

          {/* Panel Admin */}
          {showAdminPanel && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3">Panel d'Administration</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={exportData}
                  className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Exporter
                </button>
                <div className="text-sm text-gray-600 flex items-center gap-4">
                  <span>📊 {evangelists.length} évangélistes</span>
                  <span>📸 {membersWithPhotos}/{totalMembers} photos</span>
                </div>
              </div>
            </div>
          )}

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <User className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-blue-600">{totalMembers}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <UserCheck className="w-6 h-6 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Baptisés</p>
                  <p className="text-xl font-bold text-green-600">{baptizedMembers}</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center">
                <UserX className="w-6 h-6 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Non Baptisés</p>
                  <p className="text-xl font-bold text-orange-600">{nonBaptizedMembers}</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Camera className="w-6 h-6 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Photos</p>
                  <p className="text-xl font-bold text-purple-600">{membersWithPhotos}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher un membre..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="Tous">Tous les statuts</option>
                <option value="Baptisés">Baptisés</option>
                <option value="Non baptisés">Non baptisés</option>
              </select>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </button>
            </div>
          </div>
        </div>

        {/* Formulaire d'ajout */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau membre</h2>
            
            <div className="mb-4 text-center">
              {newMember.photo ? (
                <div className="relative inline-block">
                  <img 
                    src={newMember.photo} 
                    alt="Prévisualisation"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                  />
                  <button
                    onClick={() => setNewMember({...newMember, photo: null})}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto border-2 border-dashed border-gray-300">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <label className="mt-2 inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer">
                <Camera className="w-4 h-4 inline mr-2" />
                Ajouter une photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, false)}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Nom complet *"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newMember.nom}
                onChange={(e) => setNewMember({...newMember, nom: e.target.value})}
              />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newMember.statut}
                onChange={(e) => setNewMember({...newMember, statut: e.target.value})}
              >
                <option value="Baptisé">Baptisé</option>
                <option value="Baptisée">Baptisée</option>
                <option value="Non baptisé">Non baptisé</option>
                <option value="Non baptisée">Non baptisée</option>
              </select>
              <input
                type="text"
                placeholder="Numéro de téléphone"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newMember.telephone}
                onChange={(e) => setNewMember({...newMember, telephone: e.target.value})}
              />
              <input
                type="text"
                placeholder="Évangéliste référent"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newMember.evangeliste}
                onChange={(e) => setNewMember({...newMember, evangeliste: e.target.value})}
              />
              <textarea
                placeholder="Notes personnelles"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                rows="3"
                value={newMember.notes}
                onChange={(e) => setNewMember({...newMember, notes: e.target.value})}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddMember}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Enregistrer
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Liste des membres */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Membres ({filteredMembers.length})
            </h2>
            {totalPages > 1 && (
              <div className="text-sm text-gray-600">
                Page {currentPage}/{totalPages}
              </div>
            )}
          </div>
          
          <div className="divide-y divide-gray-200">
            {currentMembers.map((member) => (
              <div key={member.id}>
                {editingMember && editingMember.id === member.id ? (
                  <div className="p-4">
                    <div className="mb-4 text-center">
                      {editingMember.photo ? (
                        <div className="relative inline-block">
                          <img 
                            src={editingMember.photo} 
                            alt="Prévisualisation"
                            className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                          />
                          <button
                            onClick={() => setEditingMember({...editingMember, photo: null})}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto border-2 border-dashed border-gray-300">
                          <Camera className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <label className="mt-2 inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 cursor-pointer">
                        <Camera className="w-3 h-3 inline mr-1" />
                        Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, true)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={editingMember.nom}
                        onChange={(e) => setEditingMember({...editingMember, nom: e.target.value})}
                      />
                      <select
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={editingMember.statut}
                        onChange={(e) => setEditingMember({...editingMember, statut: e.target.value})}
                      >
                        <option value="Baptisé">Baptisé</option>
                        <option value="Baptisée">Baptisée</option>
                        <option value="Non baptisé">Non baptisé</option>
                        <option value="Non baptisée">Non baptisée</option>
                      </select>
                      <input
                        type="text"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={editingMember.telephone}
                        onChange={(e) => setEditingMember({...editingMember, telephone: e.target.value})}
                        placeholder="Téléphone"
                      />
                      <input
                        type="text"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={editingMember.evangeliste}
                        onChange={(e) => setEditingMember({...editingMember, evangeliste: e.target.value})}
                        placeholder="Évangéliste"
                      />
                      <textarea
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                        value={editingMember.notes || ''}
                        onChange={(e) => setEditingMember({...editingMember, notes: e.target.value})}
                        placeholder="Notes"
                        rows="2"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setEditingMember(null)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedMember(member)}>
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        {member.photo ? (
                          <img 
                            src={member.photo} 
                            alt={member.nom}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                            {member.nom.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1">
                          {getStatusIcon(member.statut)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">{member.nom}</h3>
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.statut)} mt-1`}>
                              {member.statut}
                            </span>
                          </div>
                          <div className="flex gap-1 ml-4">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleEditMember(member); }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteMember(member.id); }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600 mt-1">
                          {member.telephone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <span className="truncate">{member.telephone}</span>
                            </div>
                          )}
                          {member.evangeliste && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span className="truncate">{member.evangeliste}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredMembers.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Aucun membre trouvé</p>
              <p className="text-sm text-gray-400 mt-1">Modifiez vos critères de recherche</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Précédent
              </button>
              <div className="flex gap-1">
                {[...Array(Math.min(5, totalPages))].map((_, index) => {
                  const pageNumber = currentPage <= 3 ? index + 1 : currentPage - 2 + index;
                  if (pageNumber > totalPages || pageNumber < 1) return null;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-1 rounded ${
                        currentPage === pageNumber
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            </div>
          )}
        </div>

        {/* Modal de détails */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Détails du membre</h2>
                <button 
                  onClick={() => setSelectedMember(null)} 
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-center mb-6">
                {selectedMember.photo ? (
                  <img 
                    src={selectedMember.photo} 
                    alt={selectedMember.nom}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl mx-auto">
                    {selectedMember.nom.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <p className="text-gray-900">{selectedMember.nom}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Statut</label>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMember.statut)}`}>
                    {selectedMember.statut}
                  </span>
                </div>
                {selectedMember.telephone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <p className="text-gray-900">{selectedMember.telephone}</p>
                  </div>
                )}
                {selectedMember.evangeliste && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Évangéliste</label>
                    <p className="text-gray-900">{selectedMember.evangeliste}</p>
                  </div>
                )}
                {selectedMember.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <p className="text-gray-900">{selectedMember.notes}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date d'ajout</label>
                  <p className="text-gray-900">
                    {new Date(selectedMember.dateAjout).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => {
                    setSelectedMember(null);
                    handleEditMember(selectedMember);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Modifier
                </button>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 space-y-1">
          <p>💾 Données sauvegardées automatiquement sur cet appareil</p>
          <p>📱 Application optimisée pour mobile et desktop</p>
          <p className="text-gray-400">Version 1.0 - Gestionnaire de Membres d'Église</p>
        </div>
      </div>
    </div>
  );
};

export default ChurchMembersApp;
