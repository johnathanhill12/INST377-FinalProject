# INST377-FinalProject
Project Team Members - Johnathan Hill & Daniel Hu


Classify - A Multi-Browser webapp that provides the user the ability to access the metadata from Spotify to edit and refine their playlists 

# 🛠 Developer Manual


## 📦 Installation Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. File Structure (After Unzipping/Cloning)
```
your-repo-name/
├── node_modules/           # Installed dependencies via npm
├── public/                 # Static HTML/CSS files
├── index.js                # Main server script
├── .gitignore              # Git ignore rules
├── package.json            # Project metadata & dependencies
├── package-lock.json       # Dependency lock file
├── README.md               # Project overview and manual
├── vercel.json             # Vercel deployment config
└── docs/
    └── DEVELOPER_MANUAL.md # This file
```

### 3. Install Dependencies
```bash
npm install
```

---

## 🚀 Running the Application

### 1. Start the Server Locally
```bash
node index.js
```

### 2. Access the Application
Run 'home.html' located at \INST377-FinalProject-main\public\

---

## 🧪 Running Tests

Currently, our manual test includes:
- Input a Spotify user ID and press "Submit".
- Confirm that no error popup is triggered.

---

## 📡 API Endpoints

### curl --request GET \
  --url https://api.spotify.com/v1/me/player/recently-played \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'

  **Purpose**: Provides a list of the most recently played tracks 


### curl --request GET \
  --url 'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
**Purpose**: Generates a list of recommended tracks based on a list of recommended tracks 


### `curl --request GET \
  --url https://api.spotify.com/v1/users/username/playlists \
  --header 'Authorization: Bearer AUTHTOKEN' \`
- **Purpose**: Fetches public playlists of a given user ID.
- **Params**: `userId` – Spotify user’s ID.

### `curl --request POST \
  --url https://accounts.spotify.com/api/token \`

- **Purpose**: Retrieves a Spotify API token.
- **Body**: Credentials are provided via external cURL command.
- **Note**: Token generation must be done manually due to OAuth constraints.

---

## 🐞 Known Bugs and Issues

- Voice recognition (Annyang) is inconsistent across browsers.
- Spotify API token must be generated manually via external `cURL` call.
- Application may experience API rate limits without refreshed token.
- Certain Spotify API commands are deprecated and may fail silently.
- Spotify endpoints may intermittently cease functioning.

---

## 🛣 Roadmap for Future Development

- [ ] Automate token generation using OAuth2 Authorization Code Flow.
- [ ] Expand playlist sorting/filtering features.
- [ ] Add persistent state using localStorage or backend database.
- [ ] Improve UI accessibility and mobile responsiveness.
- [ ] Add formal unit and integration tests.

---

**Reminder**: Always refer to the [Spotify Web API documentation](https://developer.spotify.com/documentation/web-api/) for updates and best practices.