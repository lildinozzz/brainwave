export const scrollToNavElement = (key: string) => {
  if (key.startsWith('#')) {
    const element = document.getElementById(key.slice(1));
    if (element) {
      const SCROLL_OFFSET = 50;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - SCROLL_OFFSET,
        behavior: 'smooth',
      });

      setTimeout(() => {
        window.location.hash = key;
      }, 100);
    }
  }
};
