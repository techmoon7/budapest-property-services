(() => {
  const style = document.createElement("style");
  style.textContent = `
    #projectModal .project-layout,
    #projectModal .project-layout > *,
    #projectModal .details,
    #projectModal .project-carousel,
    #projectModal .carousel-stage,
    #projectModal .carousel-viewport,
    #projectModal .carousel-track {
      min-width: 0;
      max-width: 100%;
    }

    #projectModal .project-layout,
    #projectModal .details {
      overflow-x: hidden;
    }

    #projectModal .project-carousel,
    #projectModal .carousel-stage,
    #projectModal .carousel-viewport,
    #projectModal .carousel-track {
      width: 100%;
    }

    #projectModal .carousel-slide {
      flex: 0 0 100%;
      min-width: 100%;
      max-width: 100%;
    }

    @media (max-width: 680px) {
      #projectModal .project-layout {
        grid-template-columns: minmax(0, 1fr);
        width: 100%;
        padding: 16px;
      }

      #projectModal .details {
        width: 100%;
        overflow-wrap: anywhere;
      }

      #projectModal .carousel-arrow {
        display: grid;
        width: 42px;
        height: 42px;
      }

      #projectModal .carousel-prev {
        left: 8px;
      }

      #projectModal .carousel-next {
        right: 8px;
      }

      #projectModal .carousel-thumbs {
        grid-template-columns: repeat(5, minmax(0, 1fr));
      }

      #projectModal .carousel-thumbs button {
        height: 34px;
      }
    }
  `;
  document.head.append(style);
})();

