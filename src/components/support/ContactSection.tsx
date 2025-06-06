import React from 'react';
import { MessageCircle, Mail, Phone } from 'lucide-react';

export function ContactSection() {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          <MessageCircle className="h-5 w-5 inline-block mr-2 text-gray-400" />
          Nous contacter
        </h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-blue-600" />
              <h4 className="ml-3 text-base font-medium text-gray-900">Email</h4>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Envoyez-nous un email pour toute question
            </p>
            <a
              href="mailto:support@equiptrack.com"
              className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              support@equiptrack.com
            </a>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center">
              <Phone className="h-6 w-6 text-blue-600" />
              <h4 className="ml-3 text-base font-medium text-gray-900">Téléphone</h4>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Notre équipe est disponible du lundi au vendredi, 9h-18h
            </p>
            <p className="mt-3 text-sm font-medium text-blue-600">
              +33 (0)1 23 45 67 89
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center">
              <MessageCircle className="h-6 w-6 text-blue-600" />
              <h4 className="ml-3 text-base font-medium text-gray-900">Chat en direct</h4>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Discutez en direct avec notre équipe support
            </p>
            <button
              type="button"
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Démarrer le chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}