import { SpyneTrait, ViewStream, SpyneAppProperties } from 'spyne';
import { PageItemCustomTraits } from 'traits/page-item-custom-traits.js';

export class PageItemCoreTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'pageItemCore$';
    super(context, traitPrefix);
  }

  static pageItemCore$AddStyles(element, cssString) {
    if (!element) return;
    if (typeof cssString !== 'string' || !cssString.trim()) return;

    // Check for an existing Spyne inline style
    const existing = element.querySelector(
      'style[data-spyne-inline-style="true"]',
    );
    if (existing) {
      existing.textContent = cssString;
      return;
    }

    const styleTag = document.createElement('style');
    styleTag.setAttribute('data-spyne-inline-style', 'true');
    styleTag.textContent = cssString;

    element.appendChild(styleTag);
  }

  static pageItemCore$CheckToAddPageTraitContainer(options = {}) {
    const {
      isEnabled = true,
      classOptions = {},
      spacing = 'default',
      selector,
    } = options;

    if (selector) {
      return selector;
    }

    const getContainerClass = () => {
      const classes = ['page-item'];

      // ---------------------------------------------
      // Variant (surface style)
      // ---------------------------------------------
      if (classOptions.variant) {
        classes.push(`page-item--${classOptions.variant}`);
      }

      // ---------------------------------------------
      // Flush (remove internal padding)
      // ---------------------------------------------
      if (classOptions.flush === true) {
        classes.push('page-item--flush');
      }

      // ---------------------------------------------
      // Bleed (full-width section)
      // ---------------------------------------------
      if (classOptions.bleed === true) {
        classes.push('page-item--bleed');
      }

      // ---------------------------------------------
      // Spacing (vertical rhythm)
      // ---------------------------------------------
      if (spacing === 'none') {
        classes.push('page-item--no-spacing');
      }

      if (spacing === 'tight') {
        classes.push('page-item--tight-spacing');
      }

      return classes.join(' ');
    };

    if (isEnabled) {
      const props = {};
      props.class = getContainerClass();

      const vs = new ViewStream(props);
      this.appendView(vs, '.page-body');
      return vs.props.id$;
    }

    return '.page-body';
  }

  static pageItemCore$AddPageItems(elementsArr = this.props.data.pageItems) {
    const addElement = (obj) => {
      const { props, container, viewClass, isPrototype } = obj;
      props.template = this.pageItemCore$GetTemplate(props, isPrototype);

      const ViewClass = PageItemCustomTraits.pageItem$GetViewClass(viewClass);

      const appendElSelector =
        this.pageItemCore$CheckToAddPageTraitContainer(container);

      const view = new ViewClass(props);

      this.appendView(view, appendElSelector);

      if (props?.styles) {
        PageItemCoreTraits.pageItemCore$AddStyles(view.props.el, props.styles);
      }
    };

    elementsArr.forEach(addElement);
  }

  static pageItemCore$GetTemplate(
    pageItemProps = { template: '' },
    isPrototype = true,
  ) {
    const { template } = pageItemProps;

    if (isPrototype === true) {
      return template;
    }

    const templateLookup = SpyneAppProperties.getProp('pageItemTemplateLookup');
    if (isPrototype === false) {
      return templateLookup[template] || '<h1>Missing Template</h1>';
    }
    return template;
  }
}
