const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
let count = 5;
const API_KEY = '6HL117qqw4aTFpcCjNEwtkCJKk8U6NVGIhiv5kvdMbY';
let API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}
`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}
`;
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Display photos
const displayPhotos = () => {
  totalImages = photosArray.length;
  imagesLoaded = 0;

  photosArray.forEach(photo => {
    // Create <a> linking to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    })

    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // Event Listerner, check when each is finished loading
    img.addEventListener('load', imageLoaded)

    // Put <img> inside <a>, then put both in the imageContainer;
    item.appendChild(img)
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(API_URL);
    photosArray = await response.json()

    displayPhotos();
  } catch (error) {

  }
}

// Hook up the scroll event
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
})

// On load
getPhotos();