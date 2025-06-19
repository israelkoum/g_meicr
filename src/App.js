import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Phone, User, UserCheck, UserX, Save, X, Camera, Download, Upload, Settings, LogOut, BarChart3 } from 'lucide-react';

const ChurchMembersApp = () => {
  // Données initiales avec tous vos membres existants
  const initialMembers = [
    { id: 1, nom: "Adaï Yvette (Mme)", statut: "Baptisée", telephone: "05 45 45 64 83", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-01-15", notes: "" },
    { id: 2, nom: "Adai Marie-Cécile", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-01-16", notes: "" },
    { id: 3, nom: "Adèle (Sœur)", statut: "Non baptisée", telephone: "Numéro non dispo.", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-01-17", notes: "Nouvelle convertie" },
    { id: 4, nom: "Anekore Nadège", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-01-18", notes: "" },
    { id: 5, nom: "Andréa (la nouvelle de Gonzague)", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-01-19", notes: "" },
    { id: 6, nom: "Armel TOULOU", statut: "Baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-01-20", notes: "" },
    { id: 7, nom: "Ayaaba Karen", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-01-21", notes: "" },
    { id: 8, nom: "Bissie Laurène", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-01-22", notes: "" },
    { id: 9, nom: "Boua Philippe", statut: "Baptisé", telephone: "07 87 41 64 88", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-01-23", notes: "" },
    { id: 10, nom: "Brigitte Sandrine Minga", statut: "Baptisée", telephone: "07 59 96 41 73", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-01-24", notes: "" },
    { id: 11, nom: "Catherine Gadedjisso", statut: "Baptisée", telephone: "07 11 29 41 90", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-01-25", notes: "" },
    { id: 12, nom: "Catherine Tanoh", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-01-26", notes: "" },
    { id: 13, nom: "Christian (Frère)", statut: "Non baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-01-27", notes: "" },
    { id: 14, nom: "Coba Rachelle (Mme)", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-01-28", notes: "" },
    { id: 15, nom: "Deborah Gadedjisso", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-01-29", notes: "" },
    { id: 16, nom: "Donald Gadedjisso", statut: "Baptisé", telephone: "07 59 09 04 65", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-01-30", notes: "" },
    { id: 17, nom: "EBOULE Julie", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-01", notes: "" },
    { id: 18, nom: "Eric KONIRA", statut: "Baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-02", notes: "" },
    { id: 19, nom: "Esther KONAN", statut: "Baptisée", telephone: "07 78 67 85 02", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-02-03", notes: "" },
    { id: 20, nom: "Eva OCHOU", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-04", notes: "" },
    { id: 21, nom: "Eugène Koua", statut: "Baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-05", notes: "" },
    { id: 22, nom: "Florence (Sœur)", statut: "Non baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-06", notes: "" },
    { id: 23, nom: "Frère KOFFI", statut: "Baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-07", notes: "" },
    { id: 24, nom: "Frère Phinéas", statut: "Baptisé", telephone: "05 56 21 53 78", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-02-08", notes: "" },
    { id: 25, nom: "Gisèle Tanoh", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-09", notes: "" },
    { id: 26, nom: "Isabelle KONAN", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-10", notes: "" },
    { id: 27, nom: "Joel Yobouet", statut: "Baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-11", notes: "" },
    { id: 28, nom: "Karen AYAABA", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-12", notes: "" },
    { id: 29, nom: "Kevin KONAN", statut: "Baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-13", notes: "" },
    { id: 30, nom: "KONAN Esther", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-14", notes: "" },
    { id: 31, nom: "KONAN Isabelle", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-15", notes: "" },
    { id: 32, nom: "KONAN Kevin", statut: "Baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-16", notes: "" },
    { id: 33, nom: "KONIRA Eric", statut: "Baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-17", notes: "" },
    { id: 34, nom: "Kossi (Mme)", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-18", notes: "" },
    { id: 35, nom: "KOUA Eugène", statut: "Baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-19", notes: "" },
    { id: 36, nom: "Laurène Bissie", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-20", notes: "" },
    { id: 37, nom: "Lucie (Sœur)", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-21", notes: "" },
    { id: 38, nom: "Magareth (Sœur)", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-22", notes: "" },
    { id: 39, nom: "Martine Winner", statut: "Baptisée", telephone: "01 51 21 05 93", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-02-23", notes: "" },
    { id: 40, nom: "Miezan (Mme)", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-24", notes: "" },
    { id: 41, nom: "Micheline Zaki", statut: "Baptisée", telephone: "05 02 43 03 18", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-02-25", notes: "" },
    { id: 42, nom: "Minga Brigitte Sandrine", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-02-26", notes: "" },
    { id: 43, nom: "Naomi (Sœur)", statut: "Non baptisée", telephone: "07 78 88 80 10", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-02-27", notes: "" },
    { id: 44, nom: "Natacha", statut: "Baptisée", telephone: "Numéro non dispo.", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-02-28", notes: "" },
    { id: 45, nom: "Phinéas (Frère)", statut: "Baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-03-01", notes: "" },
    { id: 46, nom: "Rachelle Coba (Mme)", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-03-02", notes: "" },
    { id: 47, nom: "Rebecca KONAN", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-03-03", notes: "" },
    { id: 48, nom: "Ruth YAO", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-03-04", notes: "" },
    { id: 49, nom: "Sandrine (sœur de Rachelle)", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-03-05", notes: "" },
    { id: 50, nom: "SANNA (Mme)", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-03-06", notes: "" },
    { id: 51, nom: "Stéphane (Frère)", statut: "Non baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-03-07", notes: "" },
    { id: 52, nom: "Syntyche (Sœur)", statut: "Non baptisée", telephone: "07 05 05 26 87", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-03-08", notes: "" },
    { id: 53, nom: "TOULOU Armel", statut: "Baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-03-09", notes: "" },
    { id: 54, nom: "Venance Koffi KAKOU", statut: "Baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-03-10", notes: "" },
    { id: 55, nom: "Winner Martine", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-03-11", notes: "" },
    { id: 56, nom: "Yannick (Frère)", statut: "Non baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-03-12", notes: "" },
    { id: 57, nom: "YAO Kevin", statut: "Baptisé", telephone: "05 64 48 90 22", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-03-13", notes: "" },
    { id: 58, nom: "YAVO Clémentine (Mme)", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-03-14", notes: "" },
    { id: 59, nom: "YAVO Michel", statut: "Baptisé", telephone: "05 45 52 02 28", evangeliste: "Évangéliste Loukou", photo: null, dateAjout: "2024-03-15", notes: "" },
    { id: 60, nom: "Yobouet Joel", statut: "Baptisé", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-03-16", notes: "" },
    { id: 61, nom: "Zaki Micheline", statut: "Baptisée", telephone: "", evangeliste: "", photo: null, dateAjout: "2024-03-17", notes: "" }
  ];

  // États de l'application
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('churchMembers');
    return saved ? JSON.parse(saved) : initialMembers;
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

  // Sauvegarder automatiquement dans localStorage
  useEffect(() => {
    localStorage.setItem('churchMembers', JSON.stringify(members));
  }, [members]);

  // Statistiques calculées
  const totalMembers = members.length;
  const baptizedMembers = members.filter(m => m.statut === 'Baptisé' || m.statut === 'Baptisée').length;
  const nonBaptizedMembers = members.filter(m => m.statut === 'Non baptisé' || m.statut === 'Non baptisée').length;
  const membersWithPhotos = members.filter(m => m.photo).length;
  const evangelists = [...new Set(members.filter(m => m.evangeliste).map(m => m.evangeliste))];

  // Filtrage des membres
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
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);

  // Réinitialiser la page lors du changement de recherche
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // Actions sur les membres
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
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La taille de l\'image ne doit pas dépasser 5MB');
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
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  // Export des données
  const exportData = () => {
    const dataStr = JSON.stringify({
      exportDate: new Date().toISOString(),
      totalMembers: members.length,
      members: members
    }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `membres_eglise_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import des données
  const importData = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target.result);
          if (importedData.members && Array.isArray(importedData.members)) {
            setMembers(importedData.members);
            alert(`${importedData.members.length} membres importés avec succès !`);
          } else if (Array.isArray(importedData)) {
            setMembers(importedData);
            alert(`${importedData.length} membres importés avec succès !`);
          } else {
            alert('Format de fichier invalide');
          }
        } catch (err) {
          alert('Erreur lors de l\'importation du fichier');
        }
      };
      reader.readAsText(file);
    }
    e.target.value = '';
  };

  // Utilitaires
  const getStatusIcon = (statut) => {
    if (statut === 'Baptisé' || statut === 'Baptisée') {
      return <UserCheck className="w-4 h-4 text-green-600" />;
    }
    return <UserX className="w-4 h-4 text-orange-600" />;
  };

  const getStatusColor = (statut) => {
    if (statut === 'Baptisé' || statut === 'Baptisée') {
      return 'bg-green-100 text-green-800';
    }
    return 'bg-orange-100 text-orange-800';
  };

  const resetToInitialData = () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser toutes les données ? Cette action est irréversible.')) {
      setMembers(initialMembers);
      localStorage.setItem('churchMembers', JSON.stringify(initialMembers));
      alert('Données réinitialisées avec succès !');
    }
  };

  const clearAllData = () => {
    if (window.confirm('Voulez-vous vraiment supprimer TOUS les membres ? Cette action est irréversible.')) {
      setMembers([]);
      localStorage.removeItem('churchMembers');
      alert('Toutes les données ont été supprimées !');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header optimisé mobile */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <div className="mb-4 md:mb-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Gestionnaire de Membres
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Église - Administration des membres
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2 text-sm"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden md:inline">Admin</span>
              </button>
            </div>
          </div>
          
          {/* Panel d'administration mobile-friendly */}
          {showAdminPanel && (
            <div className="bg-gray-50 rounded-lg p-3 md:p-4 mb-4">
              <h3 className="font-semibold mb-3 text-sm md:text-base">Panel d'Administration</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={exportData}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  Exporter
                </button>
                <label className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center gap-1 cursor-pointer">
                  <Upload className="w-3 h-3" />
                  Importer
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={resetToInitialData}
                  className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Reset
                </button>
                <button
                  onClick={clearAllData}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Vider
                </button>
                <div className="text-xs md:text-sm text-gray-600 flex items-center gap-2 md:gap-4 flex-wrap">
                  <span>📊 {evangelists.length} évangélistes</span>
                  <span>📸 {membersWithPhotos}/{totalMembers} photos</span>
                </div>
              </div>
            </div>
          )}

          {/* Statistiques optimisées mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
              <div className="flex items-center">
                <User className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mr-2" />
                <div>
                  <p className="text-xs text-gray-600">Total</p>
                  <p className="text-lg md:text-xl font-bold text-blue-600">{totalMembers}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-3 md:p-4 rounded-lg">
              <div className="flex items-center">
                <UserCheck className="w-5 h-5 md:w-6 md:h-6 text-green-600 mr-2" />
                <div>
                  <p className="text-xs text-gray-600">Baptisés</p>
                  <p className="text-lg md:text-xl font-bold text-green-600">{baptizedMembers}</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 p-3 md:p-4 rounded-lg">
              <div className="flex items-center">
                <UserX className="w-5 h-5 md:w-6 md:h-6 text-orange-600 mr-2" />
                <div>
                  <p className="text-xs text-gray-600">Non Baptisés</p>
                  <p className="text-lg md:text-xl font-bold text-orange-600">{nonBaptizedMembers}</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-3 md:p-4 rounded-lg">
              <div className="flex items-center">
                <Camera className="w-5 h-5 md:w-6 md:h-6 text-purple-600 mr-2" />
                <div>
                  <p className="text-xs text-gray-600">Photos</p>
                  <p className="text-lg md:text-xl font-bold text-purple-600">{membersWithPhotos}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Barre de recherche mobile-first */}
          <div className="space-y-3 md:space-y-0 md:flex md:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="flex-1 md:flex-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="Tous">Tous</option>
                <option value="Baptisés">Baptisés</option>
                <option value="Non baptisés">Non baptisés</option>
              </select>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-1 text-sm whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden md:inline">Ajouter</span>
              </button>
            </div>
          </div>
