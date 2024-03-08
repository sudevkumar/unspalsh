export const URL = "http://localhost:5100/api/v1";

export const categories = [
  {
    name: "Wallpapers",
    path: "Wallpapers",
  },
  {
    name: "Nature",
    path: "Nature",
  },
  {
    name: "3D Renders",
    path: "3DRenders",
  },
  {
    name: "Travel",
    path: "Travel",
  },
  {
    name: "Architecture & Interiors",
    path: "architecture&interiors",
  },
  {
    name: "Textures & Patterns",
    path: "textures&patterns",
  },
  {
    name: "Street Photography",
    path: "streetphotography",
  },
  {
    name: "Film",
    path: "film",
  },
  {
    name: "Archival",
    path: "archival",
  },
  {
    name: "Experimental",
    path: "experimental",
  },
  {
    name: "Animals",
    path: "animals",
  },
  {
    name: "Fashion & Beauty",
    path: "fashion&beauty",
  },
  {
    name: "People",
    path: "people",
  },

  {
    name: "Spirituality",
    path: "spirituality",
  },

  {
    name: "Business & Work",
    path: "business&work",
  },

  {
    name: "Food & Drink",
    path: "food&drink",
  },
  {
    name: "Health & Wellness",
    path: "health&wellness",
  },
  {
    name: "Sports",
    path: "sports",
  },
  {
    name: "Current Events",
    path: "currentevents",
  },
];

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
