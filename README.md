# Fossil Finder

---

**Description**:

This project utilzed the Google Maps to display fossils found around New Mexico. The Database used for storing users and information was MongoDb Atlas. For those who want to add a new dinosaur you must become an admin. The default admin credentials are pandas for the username and panda for the password. This project was made in early 2018 and was a first attempt at using bootstrap.

---

---

**Run The Application**
You will need a MongoDb Atlas account to begin. The credentials need to be placed in the url:

```JavaScript
//not a real mongo link (for instruction purposes only)
let url = "mongodb://{username}:{password}@ds52254.mlab.com:222355/{collection name}";
```

Also in the index.ejs file under views you will need to get a google maps key:

```ejs
<script async defer src="https://maps.googleapis.com/maps/api/js?key={your api key goes here}}&callback=initMap"type="text/javascript"></script>
```

**_To start the application_**

```bash
    npm start
```

---

---

**Notes**

This project was created in Spring 2018.

---

---

#### Change Logs
