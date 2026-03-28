import c05_1 from "../surveypanels/c05/c05_1";
import c05_2 from "../surveypanels/c05/c05_2";
import c05_3 from "../surveypanels/c05/c05_3";
import c05_4 from "../surveypanels/c05/c05_4";
import c05_5 from "../surveypanels/c05/c05_5";
import c05_6 from "../surveypanels/c05/c05_6";

var tosend: any = { name: "Control 5", elements: [] };
tosend.elements.push(c05_1());
tosend.elements.push(c05_2());
tosend.elements.push(c05_3());
tosend.elements.push(c05_4());
tosend.elements.push(c05_5());
tosend.elements.push(c05_6());

const c05JSON = () => tosend;
export default c05JSON;