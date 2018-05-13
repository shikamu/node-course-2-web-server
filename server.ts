import * as express from 'express';
import * as hbs from 'hbs';
import * as fs from 'fs';

let  app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) =>{
        if(err)
        {
            console.log("Unable to append to server.log");
        }
    });
    next();
});

app.use((req, res, next) => {
    //res.render("maintenance.hbs");
    next();
});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () : number => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text: string) : string =>{
    return text.toUpperCase();
});

app.get("/", (request, response) => {
    response.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to my website!"
    })
});

app.get("/about", (req, res) =>{
    res.render("about.hbs", {
        pageTitle: "About Page"
    });
});

app.get("/bad", (req, res) =>{
    res.send({
        errorMessage: "bad request"
    });
});

app.listen(3000, ()=>{
    console.log("Server is up on port 3000");
});
