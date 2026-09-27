# Code Snippet Manager --- Nuxt

A Nuxt 3 migration of the original **Code Snippet Manager** application.

The project is a personal code snippet management application built with
**Nuxt 3, Vue 3, TypeScript, Quasar and Firebase**. Users can register
or log in, store code snippets in Cloud Firestore, organize them with
tags and programming languages, open snippets with syntax highlighting,
copy code to the clipboard, and delete stored snippets.

> This repository represents a Nuxt 3 / TypeScript rewrite of the
> original Vue + Quasar Code Snippet Manager project.

## Features

-   Firebase email/password authentication
-   User registration and login
-   Per-user snippet storage in Cloud Firestore
-   Add new code snippets
-   Delete individual snippets
-   Delete all snippets
-   Organize snippets with tags
-   Organize snippets by programming language
-   Search snippets by title
-   Filter snippets by tags and languages
-   Syntax highlighting with PrismJS
-   Copy snippets directly to the clipboard
-   Quasar dialogs, notifications and loading states
-   Authentication-aware Nuxt route middleware
-   Firebase integration through a Nuxt client plugin
-   Firebase operations separated into Nuxt composables

## Tech Stack

  Technology                Purpose
  ------------------------- -----------------------------
  Nuxt 3                    Application framework
  Vue 3                     Component-based UI
  TypeScript                Typed application code
  Quasar                    UI components and utilities
  Firebase Authentication   User authentication
  Cloud Firestore           Snippet persistence
  PrismJS                   Code syntax highlighting
  Sass                      Component styling
  UUID                      Unique snippet identifiers

## Supported Snippet Languages

The add-snippet form includes support for:

-   JavaScript
-   Python
-   Java
-   C
-   C++
-   SQL
-   JSX
-   Docker

## Application Flow

1.  A user registers or logs in using Firebase Authentication.
2.  Nuxt middleware controls access to authenticated and authentication
    pages.
3.  After authentication, the application loads snippets belonging to
    the current user from Firestore.
4.  Snippets are displayed as cards containing their title and tags.
5.  A snippet can be opened in a dialog with PrismJS syntax
    highlighting.
6.  Code can be copied directly to the clipboard.
7.  New snippets receive UUID identifiers before being stored in
    Firestore.
8.  Snippets are stored under the authenticated user's Firestore
    collection.

## Firestore Structure

``` text
users/
└── {userId}/
    └── snippets/
        └── {snippetId}
            ├── id
            ├── title
            ├── language
            ├── tags
            └── code
```

This keeps each user's snippets separated by Firebase Authentication
UID.

## Project Structure

``` text
Code-Snippet-Manager-Nuxt/
├── components/
│   ├── AddCode.vue
│   ├── Card-Component.vue
│   ├── CardGrid.vue
│   ├── LanguageMenu.vue
│   ├── OpenCard.vue
│   ├── TagMenu.vue
│   └── ToolbarComp.vue
├── composables/
│   ├── api.ts
│   ├── firebase-error-msg.ts
│   ├── firebase-login.ts
│   ├── firebase-register.ts
│   └── firebase-signout.ts
├── layouts/
├── middleware/
│   └── user-auth.ts
├── pages/
│   ├── error.vue
│   ├── index.vue
│   ├── login.vue
│   └── register.vue
├── plugins/
│   └── firebase-client.ts
├── public/
├── server/
├── app.vue
├── nuxt.config.ts
├── package.json
└── tsconfig.json
```

## Main Components

### `AddCode.vue`

Provides the form used to create snippets. It validates the title,
language, tags and code before generating a UUID and emitting the new
snippet.

### `Card-Component.vue`

Displays an individual snippet as a card. It provides quick **Copy** and
**Open** actions and displays the snippet's tags.

### `OpenCard.vue`

Displays the complete snippet inside a dialog and uses PrismJS for
syntax highlighting. It also provides copy and delete actions.

### `CardGrid.vue`

Renders the collection of snippet cards.

### `TagMenu.vue`

Provides selection of snippet tags for filtering.

### `LanguageMenu.vue`

Provides selection of programming languages for filtering.

### `ToolbarComp.vue`

Contains the main application toolbar, user information, logout action,
filtering controls, delete-all confirmation dialog and the button for
creating a new snippet.

## Authentication

Authentication is handled with Firebase Authentication.

The project contains dedicated composables for:

``` text
firebase-login.ts
firebase-register.ts
firebase-signout.ts
firebase-error-msg.ts
```

After authentication, Firebase user information is used to identify the
Firestore location containing that user's snippets.

## Route Protection

The `user-auth.ts` middleware checks the locally stored authentication
state.

Its intended flow is:

``` text
Unauthenticated user
        │
        ├── / ───────────► /login
        │
        ├── /login
        └── /register

Authenticated user
        │
        ├── / ───────────► Application
        │
        ├── /login ──────► /
        └── /register ───► /
```

## Firebase Integration

Firebase is initialized through the client plugin:

``` text
plugins/firebase-client.ts
```

The plugin initializes:

-   Firebase App
-   Firebase Authentication
-   Cloud Firestore

These services are then available to the Nuxt application and its
composables.

Snippet database operations are implemented in `composables/api.ts`,
including retrieving, saving and deleting user snippets.

## Installation

Clone the repository:

``` bash
git clone https://github.com/DujeVidas/Code-Snippet-Manager-Nuxt.git
cd Code-Snippet-Manager-Nuxt
```

Install dependencies:

``` bash
npm install
```

Start the development server:

``` bash
npm run dev
```

The Nuxt development server will display the local application URL in
the terminal.

## Production Build

Build the application:

``` bash
npm run build
```

Preview the production build:

``` bash
npm run preview
```

A static build can also be generated with:

``` bash
npm run generate
```

## Available Scripts

``` bash
npm run dev
npm run build
npm run generate
npm run preview
```

`postinstall` automatically runs `nuxt prepare`.

## Nuxt Migration

This repository is a migration of an earlier Vue/Quasar implementation
of Code Snippet Manager.

The Nuxt version reorganizes the application around Nuxt conventions
such as:

``` text
pages/        → file-based application pages
layouts/      → shared layouts
middleware/   → authentication route protection
plugins/      → Firebase client initialization
composables/  → Firebase and application logic
components/   → reusable Vue UI components
```

The migration also introduces TypeScript throughout the Nuxt-side
application structure while preserving the core snippet-management
concept of the original project.

## Notes

The Firebase project originally used by this repository is no longer
maintained. A new Firebase project/configuration is required to run the
application against an active backend.

Some parts of this repository reflect an earlier migration state from
the original Vue/Quasar application. The source should therefore be
reviewed before production use, particularly event wiring for
search/filter/delete-all interactions and Firebase configuration
management.

## License

This repository does not currently specify a license.
