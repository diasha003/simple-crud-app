import express, { response } from "express";
import cors from "cors";
import db from "./data/config.js";
import bodyParser from "body-parser";
import path from "path";

var app = express();

const __dirname = path.resolve();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/index.html")));
app.use(cors());

//hbs
app.set("view engine", "hbs");
app.get("/", (_, response) => {
  var stroka = [];
  db.query(
    `SELECT id, LastName, FirstName, MiddleName, PhoneNumber, Age, DATE_FORMAT(BirthDate,'%d.%m.%Y') AS BirthDate,
    CASE WHEN Gender = 'w' THEN 'Woman' ELSE 'Man' END AS Gender, WorExperience, Position,
    department.Name_department FROM new_table JOIN department ON department.id_department = new_table.NumberDepartment`,
    (err, rows) => {
      if (err) throw err;
      response.render("records.hbs", {
        records: rows,
      });
    }
  );
});

app.get("/edit/:id", (request, response) => {
  const id = request.params.id;
  let sql = `SELECT id, LastName, FirstName, MiddleName, PhoneNumber, Age, DATE_FORMAT(BirthDate,'%Y-%m-%d') AS BirthDate, Gender, WorExperience, Position, NumberDepartment,
    department.Name_department FROM new_table JOIN department ON department.id_department = new_table.NumberDepartment WHERE new_table.id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;

    const isMale = result[0].Gender == "m" ? "checked" : " ";
    const isFemale = result[0].Gender == "w" ? "checked" : " ";

    //console.log(result)
    response.render("edit.hbs", {
      user: result[0],
      isMale: isMale,
      isFemale: isFemale,
    });
  });
});

app.post("/edit", (request, response) => {
  //console.log(request.body);
  let sql = `UPDATE new_table SET LastName = '${request.body.user_last_name}', FirstName = '${request.body.user_first_name}', MiddleName = '${request.body.user_middle_name}',
    PhoneNumber = '${request.body.user_phone}', Age = '${request.body.user_age}', BirthDate = '${request.body.user_bith_date}', Gender = '${request.body.user_gender}',
    WorExperience = '${request.body.user_work_experience}', Position = '${request.body.user_position}', NumberDepartment = '${request.body.name_department}' WHERE new_table.id = ${request.body.user_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    //console.log(result);
    response.redirect("/");
  });
});

app.get("/delete/:id", (request, response) => {
  const id = request.params.id;
  let sql = `DELETE FROM new_table WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    response.redirect("/");
  });
});

app.post("/", (request, response) => {
  //console.log(request)
  let sql = `INSERT INTO new_table (LastName, FirstName, MiddleName, PhoneNumber, Age, BirthDate, Gender, WorExperience, Position, NumberDepartment)
  VALUES ('${request.body.user_last_name}', '${request.body.user_first_name}', '${request.body.user_middle_name}',
   '${request.body.user_phone}', '${request.body.user_age}',
  '${request.body.user_bith_date}', '${request.body.user_gender}', '${request.body.user_work_experience}', 
  '${request.body.user_position}', ${request.body.name_department});`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    response.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server is running");
});
