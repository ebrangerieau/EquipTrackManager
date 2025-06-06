# EquipTrackManager

EquipTrackManager est une application web de gestion de parc matériel. Elle permet de suivre les équipements, les contrats et les interventions.

## Prérequis

- Node.js (>= 18)
- npm

## Installation

```bash
npm install
```

## Scripts principaux

- `npm run dev` : démarre le serveur de développement
- `npm run build` : crée la version de production
- `npm run preview` : prévisualise la version buildée
- `npm run lint` : lance les vérifications ESLint

## Fonctionnalités

- Gestion des équipements et des contrats
- Suivi des interventions et notifications
- Import, export et sauvegarde des données
- Authentification utilisateur et interface d'administration
- Interface multilingue (FR/EN) et thèmes clair/sombre

## Structure du projet

- `src/pages` : pages de l'application
- `src/components` : composants réutilisables
- `src/store` : stores Zustand pour l'état
- `src/services` : logique d'accès aux données (Firebase)

## Contribution

Les contributions sont les bienvenues. N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE).
