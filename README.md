# SvelteKit Multilinker

This is a personal project to learn SvelteKit, leveraging TailwindCSS with DaisyUI. The application allows users to create and manage a profile with links to their social media accounts or other websites. Users can sign in with Google, choose a username, upload a profile picture, and add/edit links to their profile.

## Features

- User authentication with Google
- Profile creation and management
- Add, edit, and delete links
- Drag and drop to reorder links
- Responsive design with TailwindCSS and DaisyUI
- Firebase integration for authentication, Firestore for database, and Firebase Storage for profile pictures

## Technologies Used

- [SvelteKit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Firebase](https://firebase.google.com/)
- [Svelte](https://svelte.dev/)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/sveltekit-multilinker.git
cd sveltekit-multilinker
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:

```env
FB_PROJECT_ID=your-firebase-project-id
FB_CLIENT_EMAIL=your-firebase-client-email
FB_PRIVATE_KEY=your-firebase-private-key
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Authentication

- Users can sign in with their Google account.
- The authentication state is managed using Firebase Authentication.

### Profile Management

- After signing in, users can choose a username.
- Users can upload a profile picture.
- Users can add, edit, and delete links to their profile.
- Links can be reordered using drag and drop.

### Routes

- `/`: Home page with a welcome message and a button to get started.
- `/login`: Login page with Google authentication.
- `/login/username`: Page to choose a username.
- `/login/photo`: Page to upload a profile picture.
- `/[username]`: Public profile page displaying the user's links.
- `/[username]/bio`: Page to edit the user's bio.
- `/[username]/edit`: Page to manage the user's links.

## Components

### AnimatedRoute

A component that provides a transition effect when navigating between routes.

### AuthCheck

A component that checks if the user is authenticated. If not, it displays a sign-in prompt.

### SortableList

A component that allows users to reorder items in a list using drag and drop.

### StepNavigation

A component that displays a step navigation bar for the login process.

### UserLink

A component that displays a link with an icon and title.

## Firebase Integration

- Firebase Authentication is used for user authentication.
- Firestore is used to store user data, including usernames, bios, and links.
- Firebase Storage is used to store profile pictures.
