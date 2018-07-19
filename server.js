var http = require('http');
var express = require('express');
var cors = require('cors');
var mailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var app = express();
var server = http.createServer(app);

app.configure(function () {
	app.use(cors());
  app.use(express.methodOverride());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.logger());  
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  var corsOptions = {
    origin: '*',
    allowedHeaders:'_apiKey'
  };
  app.use(cors(corsOptions));
});

app.post('/mail', function (req, res) {
	if (req.headers['_apikey'] == 'Super7UI')
	{
		var transport = mailer.createTransport(smtpTransport({
		    host: 'emailrelayserver.themedco.com',
		    port: 25,
		    maxConnections: 5,
		    maxMessages: 10
		}));
		
		var mail = {
		    from: "Effect Us <effectus@themedco.com>",
		    to: "effectus@themedco.com",
		    subject: req.body.personsName + "'s totem Story",
		    text: req.body.message
		}
		if (req.body.sendCopy === 'true')
		{
				mail.cc=req.body.personsEmail;
		}
		transport.sendMail(mail, function(error, response){
		    if(error){
		        console.log(error);
		    }else{
		        console.log("Message sent: " + response.message);
		    }
		    
		    transport.close();
		});
		res.json({
			"success":"success"
			}
		);
	}
	else
	{
		res.send(404, "no api key");
	}
});




// Start up the server on the port specified in the config
server.listen(8088, '0.0.0.0', 511, function() {
});
console.log('Mail Test Server - listening on port: 8088');
