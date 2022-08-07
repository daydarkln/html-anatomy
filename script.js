import wait from "waait";

import Tooltip from "./tooltip";
import config from "./config";

// Селекторы
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
// Части тэга
const tag = $$(".tag");
const opening = $$(".opening");
const noClosing = $(".no-closing");
const leftBracket = $$(".left-bracket");
const tagName = $$(".tag-name");
const tagProperty = $$(".tag-property");
const tagPropertyValue = $$(".tag-property-value");
const propValueInit = $$(".propperty-value-initialization");
const rightBracket = $$(".right-bracket");
const content = $(".content");
const closing = $(".closing");
const slash = $$(".slash");
const space = $$(".space");
// При наведении показываем краткую информацию
const tooltip = new Tooltip(document.body, {
  title: "",
  position: "top",
});

const addTooltip = (tooltip, { title, subtitle }, target) => {
  tooltip.show();
  tooltip.updateContent(title, subtitle);
  const hovered = $$(".hovered");
  hovered.forEach((target) => {
    target.classList.remove("hovered");
  });

  if (target) {
    tooltip.position(target);
    target.classList.add("hovered");
  }
};

const hideTooltip = (target) => {
  tooltip.hide();
  target.classList.remove("hovered");
};

const addTooltipOnHover = (target, title) => {
  target.addEventListener("mouseover", (e) => {
    e.stopPropagation();
    addTooltip(tooltip, { title, subtitle: "" }, e.target);
  });
};

const elements = [
  ...tag,
  ...opening,
  ...leftBracket,
  ...tagName,
  ...tagProperty,
  ...tagPropertyValue,
  ...rightBracket,
  ...slash,
  ...propValueInit,
  ...space,
  content,
  noClosing,
  closing,
];

elements.forEach((element) => {
  addTooltipOnHover(element, config[element.classList[0]].title);
});

elements.forEach((item) => {
  item.addEventListener("mouseleave", () => {
    hideTooltip(item);
  });
});

// При клике показываем подробную информацию
const message = new Tooltip(document.body, {
  title: "",
  tooltipClass: "message",
  position: "fixed",
});

elements.forEach((element) => {
  element.addEventListener("click", async (e) => {
    e.stopPropagation();
    const { title, subtitle } = config[element.classList[0]];
    addTooltip(message, { title, subtitle });
  });
});
