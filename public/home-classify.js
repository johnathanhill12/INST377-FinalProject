//JS code for the home page 

const accessToken = 'BQAmZltsUSdoq9Ku7xSBPvTw5-CLwQPBWvLnLeJSLYC7aov_0G7MNav87Z-fYJsfOOXW7X0pqOtCL8etaa0G1I4OEO_54xsrRJV_MWIaBPEaN4yXSUqqwFTzJLwWYjFN3-hLp3Q1cTY';
// Update this with the actual token

document.getElementById('submitBtn').addEventListener('click', () => {
    const userId = document.getElementById('userIdInput').value.trim();
    if (userId === '') {
        alert('Please enter a Spotify User ID');
        return;
    }
    fetchPlaylists(userId);
});

function fetchPlaylists(userId) {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

    fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        displayPlaylists(data.items);
    })
    .catch(error => {
        console.error('Failed to fetch playlists:', error);
        alert('Failed to fetch playlists. Check the console for details.');
    });
}

function displayPlaylists(playlists) {
    const container = document.getElementById('playlistsContainer');
    container.innerHTML = ''; // Clear existing content

    if (playlists.length === 0) {
        container.innerHTML = '<p>No playlists found for this user.</p>';
        return;
    }

    playlists.forEach(playlist => {
        const iframe = document.createElement('iframe');
        iframe.src = `https://open.spotify.com/embed/playlist/${playlist.id}`;
        iframe.width = '300';
        iframe.height = '380';
        iframe.frameBorder = '0';
        iframe.allow = 'encrypted-media';

        container.appendChild(iframe);
    });
}

document.getElementById('submitBtn').addEventListener('click', () => {
    const userId = document.getElementById('userIdInput').value.trim();
    if (userId === '') {
        alert('Please enter a Spotify User ID');
        return;
    }

    fetchPlaylists(userId);
    fetchRecentlyPlayed();
    fetchRecommendations();
});

function fetchPlaylists(userId) {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

    fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => displayPlaylists(data.items))
    .catch(error => {
        console.error('Failed to fetch playlists:', error);
        alert('Failed to fetch playlists.');
    });
}

function displayPlaylists(playlists) {
    const container = document.getElementById('playlistsContainer');
    container.innerHTML = '';

    if (playlists.length === 0) {
        container.innerHTML = '<p>No playlists found.</p>';
        return;
    }

    playlists.forEach(playlist => {
        const iframe = document.createElement('iframe');
        iframe.src = `https://open.spotify.com/embed/playlist/${playlist.id}`;
        iframe.width = '300';
        iframe.height = '380';
        iframe.frameBorder = '0';
        iframe.allow = 'encrypted-media';

        container.appendChild(iframe);
    });
}

// NEW: Display last 10 recently played tracks
function fetchRecentlyPlayed() {
    fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const trackUris = data.items.map(item => item.track.uri);
        createPlaylist('Recent Tracks', 'Your last 10 played tracks', trackUris, 'recentPlaylistContainer');
    })
    .catch(error => {
        console.error('Failed to fetch recently played tracks:', error);
    });
}

// NEW: Generate recommended playlist based on recently played
function fetchRecommendations() {
    fetch('https://api.spotify.com/v1/me/player/recently-played?limit=5', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const seedTracks = data.items.slice(0, 5).map(item => item.track.id).join(',');
        const url = `https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks}&limit=10`;

        return fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    })
    .then(response => response.json())
    .then(data => {
        const trackUris = data.tracks.map(track => track.uri);
        createPlaylist('Recommended Tracks', 'Based on your recent listens', trackUris, 'recommendationsContainer');
    })
    .catch(error => {
        console.error('Failed to fetch recommendations:', error);
    });
}

// Helper to create playlist and show embed
function createPlaylist(name, description, trackUris, containerId) {
    const userId = document.getElementById('userIdInput').value.trim();
    if (!userId) return;

    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, public: false })
    })
    .then(response => response.json())
    .then(playlist => {
        return fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uris: trackUris })
        }).then(() => playlist.id);
    })
    .then(playlistId => {
        const container = document.getElementById(containerId);
        const iframe = document.createElement('iframe');
        iframe.src = `https://open.spotify.com/embed/playlist/${playlistId}`;
        iframe.width = '300';
        iframe.height = '380';
        iframe.frameBorder = '0';
        iframe.allow = 'encrypted-media';

        container.innerHTML = '';
        container.appendChild(iframe);
    })
    .catch(error => {
        console.error(`Failed to create and populate ${name} playlist:`, error);
    });
}