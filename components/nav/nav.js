(function ($, Drupal) {
  function slugify(text) {
    // Generate a unique ID if no text is provided
    if (!text) return 'header-' + Math.random().toString(36).substring(7);
    let baseSlug = text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');

    if (!baseSlug) baseSlug = 'section';

    let potentialId = baseSlug;
    let counter = 1;

    // IDs should be unique
    while (document.getElementById(potentialId)) {
      potentialId = baseSlug + '-' + counter;
      counter++;
    }
    return potentialId;
  }

  function buildUIKitNavList(items, isTopLevelListContext) {
    if (!items || items.length === 0) {
      return '';
    }
    let html = '';
    items.forEach(function (item) {
      const hasChildren = item.children && item.children.length > 0;

      let liClasses = [];
      if (isTopLevelListContext) {
        liClasses.push('uk-nav-secondary');
      }
      if (hasChildren) {
        liClasses.push('uk-parent');
      }

      html += `<li class="${liClasses.join(' ').trim()}">`;

      let anchorContent = '';
      if (isTopLevelListContext) {
        anchorContent = `<div class="uk-text-emphasis">${item.text}</div>`;
      } else {
        anchorContent = item.text;
      }

      html += `<a href="#${item.id}">${anchorContent}`;
      if (hasChildren && isTopLevelListContext) {
        html += ' <span uk-nav-parent-icon></span>';
      }
      html += '</a>';

      if (hasChildren) {
        const childrenUlClass = isTopLevelListContext ? 'uk-nav-sub' : '';
        html += `<ul class="${childrenUlClass}">`;
        html += buildUIKitNavList(item.children, false);
        html += '</ul>';
      }
      html += '</li>';
    });
    return html;
  }

  Drupal.behaviors.dgiHeaderHierarchy = {
    attach: function (context, settings) {
      const $dgiNav = $('#dgi-nav-auto-gen')
      if ($dgiNav.length === 0) {
        return;
      }
      const headerSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        .map(h => `${h}.dgi-heading`)
        .join(', ');

      const $elements = $(context).find(headerSelectors).addBack(headerSelectors);

      if ($elements.length === 0) {
        return;
      }

      const hierarchy = [];
      const lastHeaderAtLevel = {};

      $elements.each(function () {
        const $el = $(this);
        const tagName = $el.prop('tagName').toUpperCase();
        const level = parseInt(tagName.substring(1), 10);

        if (isNaN(level)) return;

        let id = $el.attr('id');
        const textContent = $el.text().trim();

        if (!id) {
          id = slugify(textContent || tagName + '-' + Math.random().toString(36).substring(2,7) ); // Ensure slugify gets some input
          $el.attr('id', id);
        }

        const headerNode = {
          level: level,
          text: textContent,
          id: id,
          element: this,
          children: []
        };

        if (level === 1) {
          hierarchy.push(headerNode);
          lastHeaderAtLevel[1] = headerNode;
          for (let i = 2; i <= 6; i++) {
            lastHeaderAtLevel[i] = null;
          }
        } else {
          let parentNode = null;
          for (let i = level - 1; i >= 1; i--) {
            if (lastHeaderAtLevel[i]) {
              parentNode = lastHeaderAtLevel[i];
              break;
            }
          }
          if (parentNode) {
            parentNode.children.push(headerNode);
          } else {
            hierarchy.push(headerNode);
          }
          lastHeaderAtLevel[level] = headerNode;
          for (let i = level + 1; i <= 6; i++) {
            lastHeaderAtLevel[i] = null;
          }
        }
      });

      if (hierarchy.length > 0) {
        const $navComponent = $dgiNav.first();

        if ($navComponent.length) {
          const $targetUl = $navComponent.find('ul.uk-nav.uk-nav-divider');
          if ($targetUl.length) {
            const navHtml = buildUIKitNavList(hierarchy, true);
            $targetUl.empty().html(navHtml);
          } else {
            console.warn('Target <ul class="uk-nav uk-nav-divider"> not found inside .dgi-nav component.');
          }
        } else {
          console.warn('Navigation component container .dgi-nav not found on the page.');
        }
      }
    }
  };

})(jQuery, Drupal);
