import React from 'react';
import { Book, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const resources = [
  {
    title: "Guide de démarrage",
    description: "Apprenez les bases de l'utilisation d'EquipTrack Manager",
    link: "/support/getting-started"
  },
  {
    title: "Documentation complète",
    description: "Consultez la documentation détaillée de toutes les fonctionnalités",
    link: "/support/documentation"
  }
];

export function DocumentationSection() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          <Book className="h-5 w-5 inline-block mr-2 text-gray-400" />
          Documentation et ressources
        </h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {resources.map((resource, index) => (
            <button
              key={index}
              onClick={() => navigate(resource.link)}
              className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
            >
              <h4 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                {resource.title}
                <ExternalLink className="h-4 w-4 ml-2" />
              </h4>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{resource.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}