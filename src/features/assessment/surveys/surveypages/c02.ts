import c02_1 from "../surveypanels/c02/c02_1";
import c02_2 from "../surveypanels/c02/c02_2";
import c02_3 from "../surveypanels/c02/c02_3";
import c02_4 from "../surveypanels/c02/c02_4";
import c02_5 from "../surveypanels/c02/c02_5";
import c02_6 from "../surveypanels/c02/c02_6";
import c02_7 from "../surveypanels/c02/c02_7";
import c02_8 from "../surveypanels/c02/c02_8";

var tosend: any = { name: "Control 2", elements: [] };
tosend.elements.push(c02_1());
tosend.elements.push(c02_2());
tosend.elements.push(c02_3());
tosend.elements.push(c02_4());
tosend.elements.push(c02_5());
tosend.elements.push(c02_6());
tosend.elements.push(c02_7());
tosend.elements.push(c02_8());

const c02JSON = () => tosend;
export default c02JSON;