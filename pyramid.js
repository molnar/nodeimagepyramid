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
    }
    else{
      process.chdir('tile_data');
      workingdir = process.cwd();      
    }     
});

function flip_y(zoom, y){
  return (Math.pow(2,zoom)-1) - y;
}

db.each("select zoom_level, tile_column, tile_row, tile_data from tiles", function(err, row) {
      process.chdir(workingdir);
           
      var z = row.zoom_level.toString();
      var x = row.tile_column.toString();
      var y = row.tile_row.toString();
      y = flip_y(z, y);
      var td = row.tile_data;
      //console.log(workingdir)
      if (fs.existsSync(z)) {
          //console.log("Enter "+z)
      }else{
        fs.mkdirSync(z);
      };

      process.chdir(z);
      console.log(process.cwd());
      if (fs.existsSync(x)) {
          //console.log("Enter "+x)
      }else{
        fs.mkdirSync(x);
      };
      process.chdir(x);
      //console.log(process.cwd());
      //add fs.open to see if it already exists or something
      fs.writeFile(y+'.png', td, function (err) {
             console.log('error writing data')          
           });
     
});


