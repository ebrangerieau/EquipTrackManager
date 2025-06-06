import React from 'react';
import { Book, FileText, Settings, Shield, Database, ArrowRight } from 'lucide-react';

export default function Documentation() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Documentation complète</h1>

      {/* Gestion des équipements */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FileText className="h-6 w-6 text-blue-500 mr-2" />
          Gestion des équipements
        </h2>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Ajouter un équipement</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Pour ajouter un nouvel équipement :
          </p>
          <ol className="list-decimal list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Cliquez sur le bouton "Ajouter un équipement"</li>
            <li>Remplissez les informations requises :
              <ul className="list-disc list-inside ml-8 mt-2">
                <li>Nom de l'équipement</li>
                <li>Numéro de série</li>
                <li>Catégorie</li>
                <li>Date d'achat</li>
                <li>Fin de garantie</li>
              </ul>
            </li>
            <li>Cliquez sur "Créer" pour enregistrer</li>
          </ol>

          <h3 className="text-lg font-medium mt-6">Gérer les catégories</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Les catégories permettent d'organiser vos équipements. Pour les gérer :
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Accédez aux paramètres</li>
            <li>Sélectionnez "Gestion des catégories"</li>
            <li>Ajoutez, modifiez ou supprimez des catégories</li>
          </ul>
        </div>
      </section>

      {/* Gestion des contrats */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Book className="h-6 w-6 text-blue-500 mr-2" />
          Gestion des contrats
        </h2>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Types de contrats</h3>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Maintenance : contrats de maintenance préventive</li>
            <li>Service : contrats de service et support</li>
            <li>Location : contrats de location d'équipements</li>
          </ul>

          <h3 className="text-lg font-medium mt-6">Suivi des échéances</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Le système vous alerte automatiquement :
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li>30 jours avant l'échéance (par défaut)</li>
            <li>À la date de renouvellement</li>
            <li>À l'expiration du contrat</li>
          </ul>
        </div>
      </section>

      {/* Gestion des interventions */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Settings className="h-6 w-6 text-blue-500 mr-2" />
          Gestion des interventions
        </h2>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Planification</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Pour planifier une intervention :
          </p>
          <ol className="list-decimal list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Sélectionnez l'équipement concerné</li>
            <li>Choisissez le type d'intervention</li>
            <li>Définissez la date prévue</li>
            <li>Assignez un technicien (optionnel)</li>
            <li>Ajoutez les détails et instructions</li>
          </ol>

          <h3 className="text-lg font-medium mt-6">Suivi des coûts</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Pour chaque intervention, vous pouvez :
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Définir un coût estimé</li>
            <li>Enregistrer le coût réel</li>
            <li>Suivre les écarts</li>
            <li>Générer des rapports de coûts</li>
          </ul>
        </div>
      </section>

      {/* Administration */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Shield className="h-6 w-6 text-blue-500 mr-2" />
          Administration
        </h2>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Gestion des utilisateurs</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Les administrateurs peuvent :
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Créer de nouveaux comptes</li>
            <li>Gérer les rôles et permissions</li>
            <li>Désactiver des comptes</li>
            <li>Suivre l'activité des utilisateurs</li>
          </ul>

          <h3 className="text-lg font-medium mt-6">Sauvegarde et restauration</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Pour sécuriser vos données :
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Exportez régulièrement vos données</li>
            <li>Sauvegardez la configuration</li>
            <li>Restaurez depuis une sauvegarde si nécessaire</li>
          </ul>
        </div>
      </section>

      {/* Import/Export */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Database className="h-6 w-6 text-blue-500 mr-2" />
          Import/Export
        </h2>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Formats supportés</h3>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li>CSV pour les données tabulaires</li>
            <li>JSON pour les sauvegardes complètes</li>
            <li>Excel (XLSX) pour les rapports</li>
          </ul>

          <h3 className="text-lg font-medium mt-6">Bonnes pratiques</h3>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Vérifiez le format des fichiers avant l'import</li>
            <li>Faites une sauvegarde avant un import massif</li>
            <li>Testez l'import sur un petit échantillon</li>
          </ul>
        </div>
      </section>
    </div>
  );
}