var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var db = new sqlite3.Database(process.argv[2]);    

if (process.argv.length < 2) {
  console.log("Error! Missing TILES filename.]");
  process.exit(1);
}

var workingdir = "";

fs.exists('tile_data', function(exists){  
    if(exists == false){
      fs.mkdirSync('tile_data');
      process.chdir('tile_data');
      workingdir = process.cwd();
      console.log("here1" + workingdir);      
    }
    else{
      process.chdir('tile_data');
      workingdir = process.cwd(); 
      console.log("here2" + workingdir);
    }     
});



// process.chdir('tile_data');


db.each("select zoom_level, tile_column, tile_row, tile_data from tiles", function(err, row) {
      process.chdir(workingdir);
           
      var z = row.zoom_level.toString();;
      var y = row.tile_column.toString();;
      var x = row.tile_row.toString();;
      var td = row.tile_data;

      fs.exists(z, function(exists){
        if(exists == false){
           fs.mkdirSync(z);
           process.chdir(z);
           fs.writeFile(x+'.png', td, function (err) {
             console.log('error writing data')          
           });
           console.log(workingdir)

        }else{            
            process.chdir(z);
            fs.writeFile(x+'.png', td, function (err) {
              console.log('error writing data')          
            });

            console.log(workingdir)
        }
      });           
                 
     
   
      

});


