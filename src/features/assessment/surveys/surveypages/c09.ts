import c09_1 from "../surveypanels/c09/c09_1";
import c09_2 from "../surveypanels/c09/c09_2";
import c09_3 from "../surveypanels/c09/c09_3";
import c09_4 from "../surveypanels/c09/c09_4";
import c09_5 from "../surveypanels/c09/c09_5";
import c09_6 from "../surveypanels/c09/c09_6";
import c09_7 from "../surveypanels/c09/c09_7";
import c09_8 from "../surveypanels/c09/c09_8";

var tosend: any = { name: "Control 9", elements: [] };
tosend.elements.push(c09_1());
tosend.elements.push(c09_2());
tosend.elements.push(c09_3());
tosend.elements.push(c09_4());
tosend.elements.push(c09_5());
tosend.elements.push(c09_6());
tosend.elements.push(c09_7());
tosend.elements.push(c09_8());

const c09JSON = () => tosend;
export default c09JSON;