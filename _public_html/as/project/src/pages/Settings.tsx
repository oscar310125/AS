import React, { useState } from 'react';
import { Settings as SettingsIcon, Store, Truck, Tag, Save, Plus, Edit, Trash2 } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import AnimatedBackground from '../components/Layout/AnimatedBackground';

export default function Settings() {
  const { 
    settings, 
    deliveryPrices, 
    discountCodes, 
    updateSettings, 
    updateDeliveryPrices, 
    addDiscountCode, 
    updateDiscountCode, 
    deleteDiscountCode 
  } = useStore();

  const [activeTab, setActiveTab] = useState('general');
  const [isAddingDiscount, setIsAddingDiscount] = useState(false);
  const [newDiscount, setNewDiscount] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: 0,
    minOrderAmount: 0
  });

  const handleSettingsUpdate = (field: string, value: any) => {
    updateSettings({ [field]: value });
  };

  const handleAddDiscount = () => {
    if (newDiscount.code && newDiscount.value > 0) {
      addDiscountCode({
        id: Date.now().toString(),
        code: newDiscount.code.toUpperCase(),
        type: newDiscount.type,
        value: newDiscount.value,
        isActive: true,
        minOrderAmount: newDiscount.minOrderAmount || undefined
      });
      setNewDiscount({ code: '', type: 'percentage', value: 0, minOrderAmount: 0 });
      setIsAddingDiscount(false);
    }
  };

  const tabs = [
    { id: 'general', name: 'Général', icon: Store },
    { id: 'delivery', name: 'Livraison', icon: Truck },
    { id: 'discounts', name: 'Codes Promo', icon: Tag }
  ];

  return (
    <div className="space-y-6">
      <AnimatedBackground />
      
      {/* Header */}
      <div className="flex items-center space-x-3">
        <SettingsIcon className="h-8 w-8 text-slate-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Paramètres du Magasin</h1>
          <p className="text-slate-400">Configurez les préférences de votre boutique</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Paramètres Généraux</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nom du Magasin
              </label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => handleSettingsUpdate('storeName', e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <input
                type="text"
                value={settings.storeDescription}
                onChange={(e) => handleSettingsUpdate('storeDescription', e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Devise
              </label>
              <select
                value={settings.currency}
                onChange={(e) => handleSettingsUpdate('currency', e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              >
                <option value="DA">Dinar Algérien (DA)</option>
                <option value="EUR">Euro (€)</option>
                <option value="USD">Dollar US ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Taux de TVA (%)
              </label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => handleSettingsUpdate('taxRate', parseFloat(e.target.value))}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold text-white mb-4">Options Produits</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.enableSizeSelection}
                  onChange={(e) => handleSettingsUpdate('enableSizeSelection', e.target.checked)}
                  className="w-4 h-4 text-blue-500 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
                />
                <span className="text-slate-300">Activer la sélection de tailles</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.enableColorSelection}
                  onChange={(e) => handleSettingsUpdate('enableColorSelection', e.target.checked)}
                  className="w-4 h-4 text-blue-500 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
                />
                <span className="text-slate-300">Activer la sélection de couleurs</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.enableWeightBasedShipping}
                  onChange={(e) => handleSettingsUpdate('enableWeightBasedShipping', e.target.checked)}
                  className="w-4 h-4 text-blue-500 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
                />
                <span className="text-slate-300">Livraison basée sur le poids</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.enableDiscountCodes}
                  onChange={(e) => handleSettingsUpdate('enableDiscountCodes', e.target.checked)}
                  className="w-4 h-4 text-blue-500 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
                />
                <span className="text-slate-300">Activer les codes de réduction</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Settings */}
      {activeTab === 'delivery' && (
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Paramètres de Livraison</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-slate-700/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Wilaya</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Livraison à Domicile</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Stop Desk</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Multiplicateur Poids</th>
                </tr>
              </thead>
              <tbody>
                {deliveryPrices.slice(0, 10).map((price) => (
                  <tr key={price.state} className="border-b border-slate-700/30">
                    <td className="p-4 text-white font-medium">{price.state}</td>
                    <td className="p-4 text-slate-300">{price.homeDelivery} DA</td>
                    <td className="p-4 text-slate-300">{price.stopDesk} DA</td>
                    <td className="p-4 text-slate-300">×{price.weightMultiplier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-slate-400 text-sm">
              Affichage de 10 wilayas sur {deliveryPrices.length}. 
              Les prix peuvent être modifiés selon les changements économiques.
            </p>
          </div>
        </div>
      )}

      {/* Discount Codes */}
      {activeTab === 'discounts' && (
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Codes de Réduction</h3>
            <button
              onClick={() => setIsAddingDiscount(true)}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Ajouter Code</span>
            </button>
          </div>

          {/* Add Discount Form */}
          {isAddingDiscount && (
            <div className="bg-slate-800/30 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Code (ex: SAVE10)"
                  value={newDiscount.code}
                  onChange={(e) => setNewDiscount({...newDiscount, code: e.target.value})}
                  className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newDiscount.type}
                  onChange={(e) => setNewDiscount({...newDiscount, type: e.target.value as 'percentage' | 'fixed'})}
                  className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="percentage">Pourcentage</option>
                  <option value="fixed">Montant Fixe</option>
                </select>
                <input
                  type="number"
                  placeholder={newDiscount.type === 'percentage' ? 'Pourcentage' : 'Montant DA'}
                  value={newDiscount.value}
                  onChange={(e) => setNewDiscount({...newDiscount, value: parseFloat(e.target.value)})}
                  className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Commande min. (DA)"
                  value={newDiscount.minOrderAmount}
                  onChange={(e) => setNewDiscount({...newDiscount, minOrderAmount: parseFloat(e.target.value)})}
                  className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-3 mt-4">
                <button
                  onClick={handleAddDiscount}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => setIsAddingDiscount(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          {/* Discount Codes List */}
          <div className="space-y-3">
            {discountCodes.map((code) => (
              <div key={code.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-1">
                    <span className="text-blue-400 font-mono font-bold">{code.code}</span>
                  </div>
                  <div>
                    <p className="text-white">
                      {code.type === 'percentage' ? `${code.value}%` : `${code.value} DA`} de réduction
                    </p>
                    {code.minOrderAmount && (
                      <p className="text-slate-400 text-sm">
                        Commande minimum: {code.minOrderAmount} DA
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateDiscountCode(code.id, { isActive: !code.isActive })}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      code.isActive 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {code.isActive ? 'Actif' : 'Inactif'}
                  </button>
                  <button
                    onClick={() => deleteDiscountCode(code.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}