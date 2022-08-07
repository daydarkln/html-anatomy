const div = (className) => {
  let node = document.createElement("div");

  node.classList.add(className);
  return node;
};

const defaultOffset = 12;
const positions = ["top", "right", "bottom"];

export default class Tooltip {

  constructor(rootNode = null, options = {}) {
    this.type = options.type || "default";

    this.title = options.title;
    this.subtitle = options.subtitle;

    this.shown = false;

    this.tooltip = this.createTooltip(options.tooltipClass);
    this.tooltip.addEventListener("click", (event) => {
      this.hide();
      event.stopPropagation();
    });

    if (rootNode) {
      this.position(rootNode, options.position);
    }
  }

  position(target, position = "top") {
    let rects = target.getBoundingClientRect();
    let bodyTop = Math.abs(document.body.getBoundingClientRect().top);
    this.positionClass = position;
    this.target = target;
    positions.forEach((className) => this.tooltip.classList.remove(className));
    if (position == "top") {
      this.tooltip.style.left = `${
        rects.left - this.tooltip.clientWidth / 2 + rects.width / 2
      }px`;
      this.tooltip.style.top = `${
        rects.top + bodyTop - defaultOffset - this.tooltip.clientHeight
      }px`;
    }

    if (position == "right") {
      this.tooltip.style.left = `${rects.left + rects.width}px`;
      this.tooltip.style.top = `${rects.top + bodyTop}px`;
    }

    if (position == "bottom") {
      this.tooltip.style.left = `${
        rects.left - this.tooltip.clientWidth / 2 + rects.width / 2
      }px`;
      this.tooltip.style.top = `${rects.bottom + bodyTop - defaultOffset}px`;
    }

    this.tooltip.classList.add(this.positionClass);
  }

  updateContent(titleText = this.title, subtitleText = this.subtitle) {
    this.titleNode.textContent = titleText;
    this.subtitleNode.innerHTML = subtitleText;
  }

  createTooltip(tooltipClass = "tooltip") {
    this.tooltipNode = div(tooltipClass);
    this.titleNode = div("tooltip-title");
    this.subtitleNode = div("tooltip-subtitle");

    if (this.type) {
      this.tooltipNode.classList.add(this.type);
    }

    let updateContent = (
      titleText = this.title,
      subtitleText = this.subtitle
    ) => {
      this.titleNode.textContent = titleText;
      this.subtitleNode.innerHTML = subtitleText;
    };

    updateContent();

    [this.titleNode, this.subtitleNode].forEach((el) =>
      this.tooltipNode.appendChild(el)
    );
    document.body.appendChild(this.tooltipNode);

    return this.tooltipNode;
  }

  hide() {
    this.tooltip.classList.remove("shown");
    this.shown = false;
  }

  show() {
    this.tooltip.classList.add("shown");
    this.shown = true;
  }
}
