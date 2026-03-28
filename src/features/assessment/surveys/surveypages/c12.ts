import c12_1 from "../surveypanels/c12/c12_1";
import c12_2 from "../surveypanels/c12/c12_2";
import c12_3 from "../surveypanels/c12/c12_3";
import c12_4 from "../surveypanels/c12/c12_4";
import c12_5 from "../surveypanels/c12/c12_5";
import c12_6 from "../surveypanels/c12/c12_6";

var tosend: any = { name: "Control 12", elements: [] };
tosend.elements.push(c12_1());
tosend.elements.push(c12_2());
tosend.elements.push(c12_3());
tosend.elements.push(c12_4());
tosend.elements.push(c12_5());
tosend.elements.push(c12_6());

const c12JSON = () => tosend;
export default c12JSON;