const CSS_SELECTOR_ERRORS = [
"Element, id and pseudo-element should not occur more then one time inside the selector",
"Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element",
];
function cssSelector(fromCombine) {
fromCombine = fromCombine || "";
const values = {
element: "",
id: "",
class: "",
attr: "",
pseudoClass: "",
pseudoElement: "",
 };
function checkOrder(currentPart) {
let b = false;
for (let i in values)
if (values.hasOwnProperty(i))
if (b && values[i]) throw new Error(CSS_SELECTOR_ERRORS[1]);
else if (!b && i === currentPart) b = true;
 }
this.element = function (value) {
if (values.element) throw new Error(CSS_SELECTOR_ERRORS[0]);
checkOrder("element");
values.element = value;
return this;
 };
this.id = function (value) {
if (values.id) throw new Error(CSS_SELECTOR_ERRORS[0]);
checkOrder("id");
values.id = "#" + value;
return this;
 };
this.class = function (value) {
checkOrder("class");
values.class += "." + value;
return this;
 };
this.attr = function (value) {
checkOrder("attr");
values.attr += "[" + value + "]";
return this;
 };
this.pseudoClass = function (value) {
checkOrder("pseudoClass");
values.pseudoClass += ":" + value;
return this;
 };
this.pseudoElement = function (value) {
if (values.pseudoElement) throw new Error(CSS_SELECTOR_ERRORS[0]);
checkOrder("pseudoElement");
values.pseudoElement = "::" + value;
return this;
 };
this.stringify = function () {
let result = "";
for (let i in values) if (values.hasOwnProperty(i)) result += values[i];
return fromCombine + result;
 };
}
const cssSelectorBuilder = {
element: function (value) {
return new cssSelector().element(value);
 },
id: function (value) {
return new cssSelector().id(value);
 },
class: function (value) {
return new cssSelector().class(value);
 },
attr: function (value) {
return new cssSelector().attr(value);
 },
pseudoClass: function (value) {
return new cssSelector().pseudoClass(value);
 },
pseudoElement: function (value) {
return new cssSelector().pseudoElement(value);
 },
combine: function (selector1, combinator, selector2) {
return new cssSelector(
selector1.stringify() + ` ${combinator} ` + selector2.stringify()
 );
 },
};