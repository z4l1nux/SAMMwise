var tosend = {
  name: "Details",
  elements: [{
      "type": "text",
      "name": "Company Name",
      "title": "Company Name"
     },
     {
      "type": "text",
      "name": "Project name",
      "title": "Project name"
     },
     {
      "type": "text",
      "name": "Description of Project",
      "title": "Description of Project"
     }
    ],
    "description": "These are optional fields. They will help categorize your results, e.g., the title of the results document."

}




const detailsJSON = () => {
    return ( 
    tosend
     );
}
 
export default detailsJSON