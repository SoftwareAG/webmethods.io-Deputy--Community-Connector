module.exports = {

  name: "create_a_journal",

  title: "Create A Journal",

  description: "",
  version: "v1",

  input:{
    title: "Create A Journal",
    type: "object",
    properties: {
eid: {
        title: "Employee ID",
        type: "string",
        minLength: 0
      },
	  data: {
        title: "Comment/Text",
        type: "string",
        minLength: 0
      }
    }
  },

  output: {
    title: "output",
  	type: "object",
  	properties: {

    }
  },

  mock_input:{},

  execute: function(input, output){
   var request = require("request");
var x="https://"+input.auth.subdom+"/api/v1/supervise/journal";
 var y= "Bearer "+input.auth.access_token;
  
    var options = {
      "method": "POST",
      "url": x,
      "headers": {
          "Accept": "application/json",
		  "Content-Type": "application/json",
         "Authorization": y 
      },
	  "body":{"strComment" : input.data,
"intEmployeeId" : input.eid
	  },
	  "json": true
	 
     }
	 
	 
	 request(options, function (error, response, body) {
  try {
            if (body && typeof(body) === "string") {
                body = JSON.parse(body);
            }
        } catch (e) {
            return output(body);
        };
		
		  if (response.statusCode === 403) {
            return output("the authentication information is incorrect.");
        }
		 if (response.statusCode === 400) {
            return output("Employee cannot be deleted");
        }
		if (response.statusCode === 404) {
            return output(" the requested record could not be found. This may also occur if the user does not have access to the requested record");
        }
        if (response.statusCode !== 200) {
            return output(body.status.errorDetails);
        }
		 if (response.statusCode === 200) {
            return output(null, {
				data: body
			});
          
        }
        output(body);
		
});
  }

}
