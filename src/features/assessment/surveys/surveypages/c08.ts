import c08_1 from "../surveypanels/c08/c08_1";
import c08_2 from "../surveypanels/c08/c08_2";
import c08_3 from "../surveypanels/c08/c08_3";
import c08_4 from "../surveypanels/c08/c08_4";
import c08_5 from "../surveypanels/c08/c08_5";

var tosend: any = { name: "Control 8", elements: [] };
tosend.elements.push(c08_1());
tosend.elements.push(c08_2());
tosend.elements.push(c08_3());
tosend.elements.push(c08_4());
tosend.elements.push(c08_5());

const c08JSON = () => tosend;
export default c08JSON;