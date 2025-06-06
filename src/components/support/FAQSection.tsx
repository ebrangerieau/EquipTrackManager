import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Comment ajouter un nouvel équipement ?",
    answer: "Pour ajouter un nouvel équipement, cliquez sur le bouton 'Ajouter un équipement' dans la section Équipements. Remplissez le formulaire avec les informations requises et cliquez sur 'Enregistrer'."
  },
  {
    question: "Comment gérer les notifications ?",
    answer: "Vous pouvez configurer vos préférences de notification dans la section Paramètres > Notifications. Activez ou désactivez les notifications pour les contrats, maintenances et garanties."
  },
  {
    question: "Comment exporter mes données ?",
    answer: "Rendez-vous dans la section Import/Export, choisissez le type de données à exporter (équipements ou contrats) et cliquez sur le bouton d'export correspondant."
  }
];

export function FAQSection() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          <HelpCircle className="h-5 w-5 inline-block mr-2 text-gray-400" />
          Questions fréquentes
        </h3>
        <div className="mt-6 space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
              <dt className="text-base font-medium text-gray-900 dark:text-white">{faq.question}</dt>
              <dd className="mt-2 text-sm text-gray-600 dark:text-gray-300">{faq.answer}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}