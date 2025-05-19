//JS code for the About Page
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
