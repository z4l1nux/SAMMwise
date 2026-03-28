import c03_1 from "../surveypanels/c03/c03_1";
import c03_2 from "../surveypanels/c03/c03_2";
import c03_3 from "../surveypanels/c03/c03_3";
import c03_4 from "../surveypanels/c03/c03_4";
import c03_5 from "../surveypanels/c03/c03_5";
import c03_7 from "../surveypanels/c03/c03_7";

var tosend: any = { name: "Control 3", elements: [] };
tosend.elements.push(c03_1());
tosend.elements.push(c03_2());
tosend.elements.push(c03_3());
tosend.elements.push(c03_4());
tosend.elements.push(c03_5());
tosend.elements.push(c03_7());

const c03JSON = () => tosend;
export default c03JSON;