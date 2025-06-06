import React from 'react';
import { HelpCircle, Book, MessageCircle } from 'lucide-react';
import { FAQSection } from '../components/support/FAQSection';
import { DocumentationSection } from '../components/support/DocumentationSection';
import { ContactSection } from '../components/support/ContactSection';

export default function Support() {
  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Support</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Trouvez de l'aide et des ressources pour utiliser EquipTrack Manager
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <FAQSection />
          <DocumentationSection />
          <ContactSection />
        </div>
      </div>
    </div>
  );
}