# Cahier des Charges - Projet Ange

## 1. Présentation du Projet

### 1.1 Contexte
Ange est une plateforme web permettant aux développeurs d'interagir avec différents modèles d'intelligence artificielle via leurs APIs respectives. Le projet vise à reproduire l'expérience utilisateur de Claude tout en offrant plus de flexibilité dans l'utilisation des modèles d'IA.

### 1.2 Objectifs
- Créer une interface utilisateur intuitive similaire à celle de Claude
- Permettre aux utilisateurs d'utiliser leurs propres clés API
- Offrir un support multi-modèles d'IA
- Fournir des fonctionnalités spécifiques pour les développeurs

## 2. Spécifications Fonctionnelles

### 2.1 Authentification
- Authentification via Supabase (email/mot de passe)
- Système de récupération de mot de passe
- Gestion des sessions utilisateur

### 2.2 Gestion des Clés API
- Interface de configuration des clés API
- Stockage sécurisé via Supabase
- Validation de la validité des clés
- Possibilité de modifier/supprimer les clés

### 2.3 Interface de Chat
- Zone de saisie de messages avec support Markdown
- Affichage des messages en temps réel avec Supabase Realtime
- Historique des conversations
- Système de titre automatique pour les conversations
- Navigation entre les conversations

### 2.4 Éditeur de Code
- Intégration d'un éditeur de code (Monaco Editor)
- Support multi-langages
- Fonction copier/coller
- Export du code

### 2.5 Gestion des Modèles d'IA
Phase 1 :
- Support de Claude 3.5 Sonnet

Phase 2 :
- ChatGPT
- Mistral
- Gemini
- Interface unifiée pour tous les modèles

### 2.6 Gestion des Conversations
- Sauvegarde automatique
- Système de recherche via Supabase
- Filtrage par date/modèle
- Export des conversations
- Suppression des conversations

## 3. Spécifications Techniques

### 3.1 Architecture Frontend
- Framework : React (Create React App) avec TypeScript
- UI : TailwindCSS
- État global : Supabase Client + Context API
- Responsive design (mobile-first)

### 3.2 Architecture Backend
- Supabase pour :
  - Base de données
  - Authentification
  - Stockage sécurisé
  - Temps réel (WebSocket)

### 3.3 Sécurité
- Gestion complète de l'authentification par Supabase
- Chiffrement des clés API via Supabase
- Rate limiting via les fournisseurs d'API
- Row Level Security (RLS) Supabase
- HTTPS obligatoire

### 3.4 Base de Données Supabase
Tables principales :
- users (gérée par Supabase Auth)

- api_keys
  - id (UUID)
  - user_id
  - provider (enum)
  - key_encrypted
  - created_at

- conversations
  - id (UUID)
  - user_id
  - title
  - model
  - created_at
  - updated_at

- messages
  - id (UUID)
  - conversation_id
  - content
  - role (user/assistant)
  - created_at

## 4. Contraintes Techniques

### 4.1 Performance
- Temps de chargement initial < 2s
- Time to Interactive < 3s
- Optimisation des images et assets

### 4.2 Compatibilité
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Versions mobiles
- Support iOS/Android

### 4.3 Hébergement
- Frontend : Vercel/Netlify
- Backend : Supabase Cloud

## 5. Livrables

### 5.1 Phase 1 (MVP) - 6 semaines
- Authentification Supabase
- Interface de chat basique
- Support Claude 3.5
- Stockage des conversations
- Interface responsive

### 5.2 Phase 2 - 4 semaines
- Éditeur de code
- Export des conversations
- Améliorations UI/UX
- Tests basiques

### 5.3 Phase 3 - 4 semaines
- Support multi-modèles
- Optimisations performances
- Documentation utilisateur
- Tests fonctionnels

## 6. Organisation

### 6.1 Méthodologie
- Développement itératif simple
- Code review selon besoins
- Tests manuels réguliers

### 6.2 Environnements
- Développement
- Production

### 6.3 Outils
- Versionning : Git/GitHub
- Déploiement : Vercel/Netlify
- Backend : Supabase

## 7. Maintenance

### 7.1 Support
- Monitoring via Supabase Dashboard
- Sauvegardes automatiques Supabase

### 7.2 Évolutions
- Mises à jour de sécurité
- Optimisations selon besoins
- Nouvelles fonctionnalités à la demande