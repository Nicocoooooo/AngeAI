# Planification des Sprints - Projet Ange

## Sprint 0 : Initialisation du Projet (1 semaine)

### GitHub Setup
1. Création du repository GitHub
   - Initialisation avec Create React App
   - Configuration du .gitignore
   - Mise en place des branches (main, develop)
   - Configuration basique des règles de protection

2. Documentation initiale
   - README.md
   - LICENSE

3. Configuration de l'environnement
   - Setup des variables d'environnement (.env.example)
   - Configuration ESLint basique
   - Configuration TypeScript

4. Setup Supabase
   - Création du projet Supabase
   - Configuration de l'authentification
   - Création des tables initiales
   - Setup des politiques RLS

### Structure des Tables Supabase
```sql
-- Enable RLS
alter table api_keys enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;

-- API Keys
create table api_keys (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  provider text not null,
  key_encrypted text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Conversations
create table conversations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  title text not null,
  model text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Messages
create table messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references conversations(id) on delete cascade,
  content text not null,
  role text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
create policy "Users can only see their own api keys"
  on api_keys for all
  using (auth.uid() = user_id);

create policy "Users can only see their own conversations"
  on conversations for all
  using (auth.uid() = user_id);

create policy "Users can only see messages from their conversations"
  on messages for all
  using (
    conversation_id in (
      select id from conversations where user_id = auth.uid()
    )
  );
```

## Sprint 1 : Architecture de Base (2 semaines)

### Semaine 1 : Setup Frontend
1. Configuration Create React App
   - Mise en place des dossiers
   - Configuration des routes
   - Setup TailwindCSS
   - Configuration du client Supabase

2. Mise en place de l'authentification
   - Intégration Auth Supabase
   - Page de login/register
   - Protection des routes
   - Tests basiques

### Semaine 2 : Interface Principale
1. Structure de base
   - Layout principal
   - Sidebar
   - Zone de chat
   - Composants réutilisables

2. Supabase Realtime
   - Configuration des souscriptions
   - Gestion des websockets
   - Tests de connexion

## Sprint 2 : Fonctionnalités Core (2 semaines)

### Semaine 1 : Système de Chat
1. Interface utilisateur
   - Composant de chat
   - Zone de saisie avec Markdown
   - Affichage des messages
   - Navigation des conversations

2. Intégration Supabase
   - Stockage des messages
   - Souscriptions temps réel
   - Gestion des conversations

### Semaine 2 : Intégration Claude
1. Gestion des clés API
   - Interface de configuration
   - Stockage sécurisé via Supabase
   - Validation des clés

2. Intégration API
   - Service d'appel API Claude
   - Gestion des erreurs
   - Tests d'intégration

## Sprint 3 : Améliorations et Tests (2 semaines)

### Semaine 1 : UI/UX
1. Responsive Design
   - Optimisation mobile
   - Tests cross-browser
   - Améliorations UI

2. Expérience Utilisateur
   - Messages d'erreur
   - États de chargement
   - Animations simples

### Semaine 2 : Tests et Documentation
1. Tests
   - Tests fonctionnels
   - Tests manuels
   - Documentation des tests

2. Documentation
   - Guide d'utilisation
   - Guide de déploiement
   - Documentation technique

## Sprint 4 : MVP et Déploiement (1 semaine)

1. Préparation au déploiement
   - Configuration production
   - Variables d'environnement
   - Tests finaux

2. Déploiement
   - Déploiement sur Vercel/Netlify
   - Configuration du domaine
   - Tests de production

## Conventions de Développement

### Commits
- Format : `type: description`
- Types : feat, fix, docs, refactor
- Messages en français
- Description claire et concise

### Branches
- main : production
- develop : développement
- feature/* : nouvelles fonctionnalités

### Code
- TypeScript avec configuration basique
- ESLint pour les erreurs importantes
- Tests fonctionnels manuels

## Points d'Attention

1. Sécurité
   - Ne jamais commit de clés API
   - Utiliser les variables d'environnement
   - Bien configurer les politiques RLS Supabase

2. Performance
   - Optimisation des requêtes Supabase
   - Gestion appropriée des souscriptions realtime
   - Lazy loading des composants principaux

3. Accessibilité
   - Navigation au clavier
   - HTML sémantique basique