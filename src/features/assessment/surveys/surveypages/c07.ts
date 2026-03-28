import c07_1 from "../surveypanels/c07/c07_1";
import c07_2 from "../surveypanels/c07/c07_2";
import c07_3 from "../surveypanels/c07/c07_3";
import c07_4 from "../surveypanels/c07/c07_4";
import c07_5 from "../surveypanels/c07/c07_5";
import c07_6 from "../surveypanels/c07/c07_6";
import c07_7 from "../surveypanels/c07/c07_7";
import c07_8 from "../surveypanels/c07/c07_8";

var tosend: any = { name: "Control 7", elements: [] };
tosend.elements.push(c07_1());
tosend.elements.push(c07_2());
tosend.elements.push(c07_3());
tosend.elements.push(c07_4());
tosend.elements.push(c07_5());
tosend.elements.push(c07_6());
tosend.elements.push(c07_7());
tosend.elements.push(c07_8());

const c07JSON = () => tosend;
export default c07JSON;