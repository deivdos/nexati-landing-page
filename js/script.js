(() => {
  document.documentElement.classList.add("js-enabled");

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const form = document.querySelector("[data-contact-form]");
  const formStatus = document.querySelector("[data-form-status]");
  const heroScene = document.querySelector(".hero__scene");
  const contactSection = document.querySelector("#contato");
  const floatingContact = document.querySelector("[data-floating-contact]");
  const year = document.querySelector("[data-current-year]");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileMenuQuery = window.matchMedia("(max-width: 820px)");

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const setInert = (element, isInert) => {
    if ("inert" in element) {
      element.inert = isInert;
    }
    element.toggleAttribute("inert", isInert);
  };

  const setMenuAccessibility = (isOpen) => {
    if (!nav) return;

    if (!mobileMenuQuery.matches) {
      nav.hidden = false;
      nav.removeAttribute("aria-hidden");
      setInert(nav, false);
      return;
    }

    nav.hidden = !isOpen;
    if (isOpen) {
      nav.removeAttribute("aria-hidden");
    } else {
      nav.setAttribute("aria-hidden", "true");
    }
    setInert(nav, !isOpen);
  };

  const closeMenu = ({ returnFocus = false } = {}) => {
    if (!menuToggle || !nav || !header) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
    nav.classList.remove("is-open");
    header.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    setMenuAccessibility(false);

    if (returnFocus) {
      menuToggle.focus();
    }
  };

  const openMenu = () => {
    if (!menuToggle || !nav || !header) return;
    setMenuAccessibility(true);
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu de navegação");
    header.classList.add("is-open");
    document.body.classList.add("menu-open");
    window.requestAnimationFrame(() => nav.classList.add("is-open"));
  };

  const syncMenuForViewport = () => {
    if (!menuToggle || !nav || !header) return;
    closeMenu();
    if (!mobileMenuQuery.matches) {
      setMenuAccessibility(true);
    }
  };

  if (year) {
    year.textContent = new Date().getFullYear().toString();
  }

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (menuToggle && nav) {
    syncMenuForViewport();

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu({ returnFocus: true });
      } else {
        openMenu();
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu({ returnFocus: true });
      }
    });

    if ("addEventListener" in mobileMenuQuery) {
      mobileMenuQuery.addEventListener("change", syncMenuForViewport);
    } else {
      mobileMenuQuery.addListener(syncMenuForViewport);
    }
  }

  if (heroScene && !reducedMotionQuery.matches) {
    const handlePointerMove = (event) => {
      const rect = heroScene.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      heroScene.style.setProperty("--mx", x.toFixed(3));
      heroScene.style.setProperty("--my", y.toFixed(3));
    };

    heroScene.addEventListener("pointermove", handlePointerMove);
    heroScene.addEventListener("pointerleave", () => {
      heroScene.style.setProperty("--mx", "0");
      heroScene.style.setProperty("--my", "0");
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  const revealAll = () => {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  };

  if (reducedMotionQuery.matches) {
    revealAll();
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealAll();
  }

  if (floatingContact && contactSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        floatingContact.classList.toggle("is-hidden", entries.some((entry) => entry.isIntersecting));
      },
      { threshold: 0.1 }
    );

    observer.observe(contactSection);
  }

  const validationRules = {
    nome: {
      validate: (field) => field.value.trim().length >= 2,
      message: "Informe seu nome com pelo menos 2 caracteres."
    },
    email: {
      validate: (field) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()),
      message: "Informe um e-mail válido."
    },
    servico: {
      validate: (field) => field.value.trim().length > 0,
      message: "Selecione o interesse principal."
    },
    mensagem: {
      validate: (field) => field.value.trim().length >= 12,
      message: "Descreva o processo com pelo menos 12 caracteres."
    },
    consentimento: {
      validate: (field) => field.checked,
      message: "Confirme que você entende que os campos não serão enviados nesta versão."
    }
  };

  const getField = (id) => form?.querySelector(`#${id}`);

  const setFieldError = (field, message) => {
    const group = field.closest(".field-group");
    const checkbox = field.closest(".checkbox-field");
    const error = document.querySelector(`#erro-${field.id}`);

    if (message) {
      field.setAttribute("aria-invalid", "true");
    } else {
      field.removeAttribute("aria-invalid");
    }
    if (error) {
      error.textContent = message;
    }
    if (group) {
      group.classList.toggle("is-invalid", Boolean(message));
    }
    if (checkbox) {
      checkbox.classList.toggle("is-invalid", Boolean(message));
    }
  };

  const validateField = (field) => {
    const rule = validationRules[field.id];
    if (!rule) return true;

    const isValid = rule.validate(field);
    setFieldError(field, isValid ? "" : rule.message);
    return isValid;
  };

  const setStatus = (type, message) => {
    if (!formStatus) return;
    formStatus.classList.remove("is-success", "is-error");
    if (type) {
      formStatus.classList.add(`is-${type}`);
    }
    formStatus.textContent = message;
  };

  if (form) {
    form.noValidate = true;

    Object.keys(validationRules).forEach((id) => {
      const field = getField(id);
      if (!field) return;

      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") {
          validateField(field);
        }
      });
      field.addEventListener("change", () => {
        if (field.type === "checkbox" || field.tagName === "SELECT") {
          validateField(field);
        }
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      setStatus("", "");

      const fields = Object.keys(validationRules)
        .map((id) => getField(id))
        .filter(Boolean);

      const validationResults = fields.map((field) => validateField(field));
      const isFormValid = validationResults.every(Boolean);

      if (!isFormValid) {
        setStatus("error", "Revise os campos destacados antes de enviar.");
        const firstInvalid = fields.find((field) => field.getAttribute("aria-invalid") === "true");
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      setStatus(
        "success",
        "Mensagem validada na página. Em uma implementação real, o envio seria conectado ao canal escolhido pelo cliente."
      );
      form.reset();
      fields.forEach((field) => setFieldError(field, ""));
    });
  }
})();
