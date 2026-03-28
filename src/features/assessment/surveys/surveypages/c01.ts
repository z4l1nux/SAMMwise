import c01_1 from "../surveypanels/c01/c01_1";
import c01_2 from "../surveypanels/c01/c01_2";
import c01_3 from "../surveypanels/c01/c01_3";
import c01_4 from "../surveypanels/c01/c01_4";
import c01_5 from "../surveypanels/c01/c01_5";

var tosend: any = { name: "Control 1", elements: [] };
tosend.elements.push(c01_1());
tosend.elements.push(c01_2());
tosend.elements.push(c01_3());
tosend.elements.push(c01_4());
tosend.elements.push(c01_5());

const c01JSON = () => tosend;
export default c01JSON;