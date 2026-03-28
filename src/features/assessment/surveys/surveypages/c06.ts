import c06_1 from "../surveypanels/c06/c06_1";
import c06_2 from "../surveypanels/c06/c06_2";
import c06_3 from "../surveypanels/c06/c06_3";
import c06_4 from "../surveypanels/c06/c06_4";
import c06_5 from "../surveypanels/c06/c06_5";
import c06_6 from "../surveypanels/c06/c06_6";
import c06_7 from "../surveypanels/c06/c06_7";

var tosend: any = { name: "Control 6", elements: [] };
tosend.elements.push(c06_1());
tosend.elements.push(c06_2());
tosend.elements.push(c06_3());
tosend.elements.push(c06_4());
tosend.elements.push(c06_5());
tosend.elements.push(c06_6());
tosend.elements.push(c06_7());

const c06JSON = () => tosend;
export default c06JSON;