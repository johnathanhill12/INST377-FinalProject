new Splide( '.splide' ).mount();

new Splide( '.splide', {
    type       : 'loop',
    height     : '9rem',
    perPage    : 2,
    breakpoints: {
      640: {
        height: '6rem',
      },
    },
  } );
  
const accessToken = 'BQAmZltsUSdoq9Ku7xSBPvTw5-CLwQPBWvLnLeJSLYC7aov_0G7MNav87Z-fYJsfOOXW7X0pqOtCL8etaa0G1I4OEO_54xsrRJV_MWIaBPEaN4yXSUqqwFTzJLwWYjFN3-hLp3Q1cTY';

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

// new Splide( '.splide' ).mount();

// new Splide( '.splide', {
//     type       : 'loop',
//     height     : '9rem',
//     perPage    : 2,
//     breakpoints: {
//       640: {
//         height: '6rem',
//       },
//     },
//   } );