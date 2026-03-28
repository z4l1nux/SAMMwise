import c10_1 from "../surveypanels/c10/c10_1";
import c10_2 from "../surveypanels/c10/c10_2";
import c10_3 from "../surveypanels/c10/c10_3";
import c10_4 from "../surveypanels/c10/c10_4";
import c10_5 from "../surveypanels/c10/c10_5";
import c10_6 from "../surveypanels/c10/c10_6";

var tosend: any = { name: "Control 10", elements: [] };
tosend.elements.push(c10_1());
tosend.elements.push(c10_2());
tosend.elements.push(c10_3());
tosend.elements.push(c10_4());
tosend.elements.push(c10_5());
tosend.elements.push(c10_6());

const c10JSON = () => tosend;
export default c10JSON;