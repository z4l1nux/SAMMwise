import c04_1 from "../surveypanels/c04/c04_1";
import c04_2 from "../surveypanels/c04/c04_2";
import c04_3 from "../surveypanels/c04/c04_3";
import c04_4 from "../surveypanels/c04/c04_4";
import c04_5 from "../surveypanels/c04/c04_5";
import c04_6 from "../surveypanels/c04/c04_6";
import c04_7 from "../surveypanels/c04/c04_7";
import c04_8 from "../surveypanels/c04/c04_8";

var tosend: any = { name: "Control 4", elements: [] };
tosend.elements.push(c04_1());
tosend.elements.push(c04_2());
tosend.elements.push(c04_3());
tosend.elements.push(c04_4());
tosend.elements.push(c04_5());
tosend.elements.push(c04_6());
tosend.elements.push(c04_7());
tosend.elements.push(c04_8());

const c04JSON = () => tosend;
export default c04JSON;