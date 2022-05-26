import express, { json } from 'express';
// import mysql from 'mysql';
import cors from 'cors';
import mysql from 'mysql'; // create an instance
import multer from 'multer';
import fs from 'fs';
//const mysql = require("mysql");

const db = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'PhotoGallery'
});

// const db = mysql.createConnection({
//   host: 'localhost',
//   port: 8889,
//   user: 'root',
//   password: 'root',
//   database: 'Employees'
// });

let jsonData = [
    {
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "https://via.placeholder.com/600/92c952",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    },
    {
      "albumId": 1,
      "id": 2,
      "title": "reprehenderit est deserunt velit ipsam",
      "url": "https://via.placeholder.com/600/771796",
      "thumbnailUrl": "https://via.placeholder.com/150/771796"
    },
    {
      "albumId": 1,
      "id": 3,
      "title": "officia porro iure quia iusto qui ipsa ut modi",
      "url": "https://via.placeholder.com/600/24f355",
      "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    },
    {
      "albumId": 1,
      "id": 4,
      "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      "url": "https://via.placeholder.com/600/d32776",
      "thumbnailUrl": "https://via.placeholder.com/150/d32776"
    },
    {
      "albumId": 1,
      "id": 5,
      "title": "natus nisi omnis corporis facere molestiae rerum in",
      "url": "https://via.placeholder.com/600/f66b97",
      "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
    },
    {
      "albumId": 1,
      "id": 6,
      "title": "accusamus ea aliquid et amet sequi nemo",
      "url": "https://via.placeholder.com/600/56a8c2",
      "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
    },
    {
      "albumId": 1,
      "id": 7,
      "title": "officia delectus consequatur vero aut veniam explicabo molestias",
      "url": "https://via.placeholder.com/600/b0f7cc",
      "thumbnailUrl": "https://via.placeholder.com/150/b0f7cc"
    },
    {
      "albumId": 1,
      "id": 8,
      "title": "aut porro officiis laborum odit ea laudantium corporis",
      "url": "https://via.placeholder.com/600/54176f",
      "thumbnailUrl": "https://via.placeholder.com/150/54176f"
    },
    {
      "albumId": 1,
      "id": 9,
      "title": "qui eius qui autem sed",
      "url": "https://via.placeholder.com/600/51aa97",
      "thumbnailUrl": "https://via.placeholder.com/150/51aa97"
    }
];

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.static('uploads'));

db.connect( (error) => {
  if(error) console.log(error);
  else console.log('MySQL is connected to Node');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

const fileupload = multer({ storage: storage});

server.post('/upload', fileupload.single("file_fromC"), (req, res) => {
  res.json({ fileupload: true });
});


server.get('/photos', (req, res) => {
  let query = "CALL `getPhotos`()";
  db.query( query, (error, allphotos ) =>{
    if(error){
      res.json({ allphotos:false, message: error });
    }
    else{
      res.json({ allphotos: allphotos[0], message:"returned photos"});
    }
  })
});

server.get('/photos/:photoid', (req, res) => {
  let query = "CALL `getPhotoByID`(?)";
  db.query( query, [req.params.photoid], (error, photo ) =>{
    if(error){
      res.json({ photo: false, message: error });
    }
    else{
      res.json({ photo: photo[0][0], message: "Returned photo by ID"});
    }
  })
})

server.post('/photos', (req,res) => {
  let query = "CALL `addPhoto`(?, ?, ?, ?)";
  db.query( query, [req.body.albumId_fromC, req.body.title_fromC, req.body.url_fromC, req.body.tn_fromC], (error, newphoto) => {
    if(error){
      res.json({ newphoto: false, message: error });
    }
    else{
      res.json({ newphoto: newphoto[0], message:"Photo added to the table"});
    }
  })
});

server.delete('/photos/:id', (req, res) => {
  let query = "CALL `deletePhoto`(?)";
  let getFilename = "CALL `getPhotoByID`(?)";

  db.query( getFilename, [req.params.id], (error, data) =>{
    //res.json(data[0][0].url);
    if(error){

    }
    else{
      let file_to_be_deleted = data[0][0].url;
      fs.unlink('./uploads/'+file_to_be_deleted, (error) =>{
        if(error){
          res.json({ delStatus: false, message: error});
        }
        else{
          db.query(query, [req.params.id], (error, deleteStatus) =>{
            if(error){
              res.json({ delStatus: false, message: error });
            }
            else{
              let del_success = deleteStatus[0][0].DEL_SUCCESS;
              if(del_success === 1){
                res.json({ delStatus: del_success, message:"Successfully Deleted" });
              }
              else{
                res.json({ delStatus: del_success, message: "ID not found" });
              }
              
            }
          })
        }
      })
    }
    
  })
  
  
})



// server.get('/employees', (req, res) => {
//   let query = db.query("SELECT * FROM Employee", (error, data, fields )=>{
//     if(error) { console.log(error) }
//     else {
//       res.json(data);
//     }
//   })
// })

// server.get('/cities', (req, res) => {
//   let sp = "CALL `All-Places`()";
//   let query = db.query(sp, (error, data, fields )=>{
//     if(error) { console.log(error) }
//     else {
//       res.json(data);
//     }
//   })
// })

// server.get('/employee/:id', (req, res) => {
//   let emp_id = req.params.id;
//   let sp = "CALL `One_emp_data`(?)";
//   let query = db.query(sp, [emp_id], (error, data, fields ) => {
//     if(error) { console.log(error) }
//     else {
//       res.json(data);
//     }
//   })
// })

// req is data from the client to the server
// res is data from the server to the client
server.get('/photosapi', (req, res) => {
    res.json(jsonData);
});

server.get('/photosapi/:photoid', (req, res) => {
    let id_from_client = req.params.photoid;
    res.json(jsonData.find( x => x.id ==  id_from_client ));

});

server.post('/photosapi', (req, res) => {
  
    let newPhoto = {
      albumId: req.body.albumId,
      id:req.body.id,
      title: req.body.title,
      url:req.body.url,
      thumbnailUrl: req.body.thumbnailUrl
    }

    // console.log(newPhoto)

    jsonData.push(newPhoto);
    res.json(newPhoto);
});

server.put('/photosapi/:id', (req, res) => {
  let photoindex = jsonData.findIndex( x => x.id == req.params.id);
  console.log(photoindex);
  if(photoindex !== -1){
    let newPhotoData = {
      albumId: req.body.albumId,
      id:req.body.id,
      title: req.body.title,
      url:req.body.url,
      thumbnailUrl: req.body.thumbnailUrl
    }
    jsonData[photoindex] = newPhotoData;
    res.json(jsonData[photoindex]);
  }
  else
    res.status(400).json( { message: "There is no photo with ID: " + req.params.id})
  
})

server.delete('/photosapi/:id', (req, res) =>{
  let photoindex = jsonData.findIndex( x => x.id == req.params.id);
  if(photoindex !== -1){
    jsonData.splice(photoindex, 1);
    res.json({ message: "Photo ID: " + req.params.id + " deleted"});
  }
  else  
    res.status(400).json({ message: "ERROR: Photo ID: " + req.params.id + " not found"});
  
})

server.listen(4400, function(){
    console.log('Server is successfully running on port 4400');
})

