import c14_1 from "../surveypanels/c14/c14_1";
import c14_2 from "../surveypanels/c14/c14_2";
import c14_3 from "../surveypanels/c14/c14_3";
import c14_4 from "../surveypanels/c14/c14_4";
import c14_5 from "../surveypanels/c14/c14_5";
import c14_6 from "../surveypanels/c14/c14_6";
import c14_7 from "../surveypanels/c14/c14_7";

var tosend: any = { name: "Control 14", elements: [] };
tosend.elements.push(c14_1());
tosend.elements.push(c14_2());
tosend.elements.push(c14_3());
tosend.elements.push(c14_4());
tosend.elements.push(c14_5());
tosend.elements.push(c14_6());
tosend.elements.push(c14_7());

const c14JSON = () => tosend;
export default c14JSON;