import c13_1 from "../surveypanels/c13/c13_1";
import c13_2 from "../surveypanels/c13/c13_2";
import c13_3 from "../surveypanels/c13/c13_3";
import c13_4 from "../surveypanels/c13/c13_4";
import c13_5 from "../surveypanels/c13/c13_5";
import c13_6 from "../surveypanels/c13/c13_6";
import c13_7 from "../surveypanels/c13/c13_7";

var tosend: any = { name: "Control 13", elements: [] };
tosend.elements.push(c13_1());
tosend.elements.push(c13_2());
tosend.elements.push(c13_3());
tosend.elements.push(c13_4());
tosend.elements.push(c13_5());
tosend.elements.push(c13_6());
tosend.elements.push(c13_7());

const c13JSON = () => tosend;
export default c13JSON;