import React from 'react';
import { ArrowRight, Package, FileText, Wrench, Settings, Users } from 'lucide-react';

export default function GettingStarted() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Guide de démarrage</h1>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Bienvenue dans EquipTrack Manager ! Cette application vous permet de gérer efficacement vos équipements, 
          contrats et interventions. Ce guide vous aidera à prendre en main les fonctionnalités essentielles.
        </p>
      </section>

      {/* Configuration initiale */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Configuration initiale</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <Settings className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium mb-2">Paramètres généraux</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Commencez par configurer les paramètres de base dans la section "Paramètres" :
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Définissez le nom de votre entreprise</li>
                <li>Choisissez votre langue préférée</li>
                <li>Configurez le thème de l'interface</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Users className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium mb-2">Gestion des utilisateurs</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Si vous êtes administrateur, vous pouvez :
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Créer des comptes pour votre équipe</li>
                <li>Définir les rôles (administrateur ou utilisateur)</li>
                <li>Gérer les permissions d'accès</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnalités principales */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Fonctionnalités principales</h2>
        
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Package className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="text-lg font-medium">Gestion des équipements</h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Gérez votre parc d'équipements en :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Ajoutant de nouveaux équipements</li>
                <li>Suivant leur statut (actif, en maintenance, retiré)</li>
                <li>Gérant les dates de garantie et de maintenance</li>
                <li>Organisant par catégories</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="text-lg font-medium">Gestion des contrats</h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Suivez vos contrats de maintenance et de service :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Création et suivi des contrats</li>
                <li>Gestion des dates d'échéance</li>
                <li>Configuration des alertes de renouvellement</li>
                <li>Association avec les équipements concernés</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Wrench className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="text-lg font-medium">Gestion des interventions</h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Planifiez et suivez les interventions :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Planification des maintenances</li>
                <li>Suivi des interventions en cours</li>
                <li>Historique des interventions</li>
                <li>Gestion des coûts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Prochaines étapes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Prochaines étapes</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <ul className="space-y-4">
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Commencez par ajouter vos premiers équipements dans la section "Équipements"
              </span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Créez vos contrats de maintenance dans la section "Contrats"
              </span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Planifiez vos premières interventions dans la section "Interventions"
              </span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Configurez vos notifications pour ne manquer aucune échéance importante
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}