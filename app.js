(() => {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let savedTheme;
  try {
    savedTheme = localStorage.getItem('sudip-portfolio-theme');
  } catch {
    // The site also works when browser storage is unavailable.
  }
  function setTheme(theme) {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-pressed', String(theme === 'light'));
    themeButton.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0d0d0f' : '#f6f2ed';
  }
  setTheme(savedTheme === 'light' ? 'light' : 'dark');
  themeButton.hidden = false;
  themeButton.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('sudip-portfolio-theme', next);
    } catch {
      // Theme switching does not depend on persistence.
    }
  });

  const filterGroup = document.querySelector('.filters');
  const filterButtons = [...filterGroup.querySelectorAll('button')];
  const projects = [...document.querySelectorAll('.project')];
  const filterStatus = document.getElementById('filter-status');
  filterGroup.hidden = false;
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      let count = 0;
      projects.forEach(project => {
        const visible = button.dataset.filter === 'all' || project.dataset.category === button.dataset.filter;
        project.hidden = !visible;
        if (visible) {
          project.classList.add('is-visible');
          count += 1;
        }
      });
      filterStatus.textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown.`;
    });
  });

  const skillAreas = {
    web: {
      label: 'WEB DEVELOPMENT',
      title: 'From a blank file to a working page.',
      description: 'HTML for structure, CSS for layout, and JavaScript for the moments when a page needs to respond. I practise through small projects, forms and API-powered apps.',
      tools: ['HTML', 'CSS', 'JavaScript', 'Git & GitHub', 'Responsive layouts', 'Accessibility']
    },
    editing: {
      label: 'VIDEO EDITING',
      title: 'Every frame has a reason to be there.',
      description: 'At LumaCreatives, I work with footage, pacing and color to shape a story. Editing has been part of my work since 2022, alongside my studies.',
      tools: ['Premiere Pro', 'DaVinci Resolve', 'Color grading', 'Visual storytelling', 'Pacing & sound']
    },
    engineering: {
      label: 'ENGINEERING',
      title: 'Understand the problem. Build from there.',
      description: 'I’m studying Computer Engineering at Gachon University. My current foundation includes Python, programming logic, databases and algorithms, with a longer-term interest in biomedical engineering.',
      tools: ['Python', 'Problem solving', 'Algorithms', 'Databases', 'Computer Engineering']
    }
  };
  const skillControls = document.querySelector('.skill-controls');
  const skillButtons = [...skillControls.querySelectorAll('button')];
  skillControls.hidden = false;
  skillButtons.forEach(button => {
    button.addEventListener('click', () => {
      const area = skillAreas[button.dataset.skill];
      skillButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.getElementById('skill-label').textContent = area.label;
      document.getElementById('skill-title').textContent = area.title;
      document.getElementById('skill-description').textContent = area.description;
      document.getElementById('skill-list').replaceChildren(...area.tools.map(tool => {
        const item = document.createElement('li');
        item.textContent = tool;
        return item;
      }));
    });
  });

  const revealElements = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !motionPreference.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealElements.forEach(element => observer.observe(element));
    root.classList.add('motion-ready');
  }

  const progress = document.querySelector('.scroll-progress');
  const sections = [...document.querySelectorAll('main section[id]')];
  const navigationLinks = [...document.querySelectorAll('.site-header nav a')];
  let scrollPending = false;
  function updateScroll() {
    const distance = root.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
    let activeId = 'home';
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= 160) activeId = section.id;
    });
    navigationLinks.forEach(link => {
      if (link.hash === `#${activeId}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollPending) {
      scrollPending = true;
      requestAnimationFrame(updateScroll);
    }
  }, { passive: true });
  window.addEventListener('resize', updateScroll);
  updateScroll();

  const portrait = document.querySelector('[data-tilt]');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  portrait.addEventListener('pointermove', event => {
    if (motionPreference.matches || !finePointer.matches) return;
    const bounds = portrait.getBoundingClientRect();
    portrait.style.setProperty('--ry', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 8}deg`);
    portrait.style.setProperty('--rx', `${((event.clientY - bounds.top) / bounds.height - 0.5) * -8}deg`);
  });
  function resetPortrait() {
    portrait.style.setProperty('--rx', '0deg');
    portrait.style.setProperty('--ry', '0deg');
  }
  portrait.addEventListener('pointerleave', resetPortrait);
  motionPreference.addEventListener('change', () => {
    resetPortrait();
    if (motionPreference.matches) root.classList.remove('motion-ready');
  });
})();
