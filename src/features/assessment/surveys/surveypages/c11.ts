import c11_1 from "../surveypanels/c11/c11_1";
import c11_2 from "../surveypanels/c11/c11_2";
import c11_3 from "../surveypanels/c11/c11_3";
import c11_4 from "../surveypanels/c11/c11_4";
import c11_5 from "../surveypanels/c11/c11_5";
import c11_6 from "../surveypanels/c11/c11_6";
import c11_7 from "../surveypanels/c11/c11_7";
import c11_8 from "../surveypanels/c11/c11_8";
import c11_9 from "../surveypanels/c11/c11_9";
import c11_10 from "../surveypanels/c11/c11_10";

var tosend: any = { name: "Control 11", elements: [] };
tosend.elements.push(c11_1());
tosend.elements.push(c11_2());
tosend.elements.push(c11_3());
tosend.elements.push(c11_4());
tosend.elements.push(c11_5());
tosend.elements.push(c11_6());
tosend.elements.push(c11_7());
tosend.elements.push(c11_8());
tosend.elements.push(c11_9());
tosend.elements.push(c11_10());

const c11JSON = () => tosend;
export default c11JSON;