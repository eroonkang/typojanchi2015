String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

Number.prototype.number_with_delimiter = function(delimiter) {
    var number = this + '', delimiter = delimiter || ',';
    var split = number.split('.');
    split[0] = split[0].replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1' + delimiter
    );
    return split.join('.');    
};

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

function extract_permalink_from_url(url) {
  var extracted_url = url.match(/[^\/]*$/)[0]

  return extracted_url.substring(0, extracted_url.length - 4);
}

function url_from_project_name(idx, project_name_en){
  return WY.constants.home_url + "/" + WY.constants.locale + "/" + idx + "-" + conv_to_slug(project_name_en);
}

function conv_to_slug(txt)
{
    return txt
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
}

function url_from_permalink(permalink) {
  return WY.constants.home_url + "/" + WY.constants.locale + "/" + permalink;
}

function make_url(filename){

  var extracted_url = filename.match(/[^\/]*$/)[0];
  return WY.constants.home_url + "/" + WY.constants.locale + "/" + extracted_url.substring(0, extracted_url.length - 4);
}

function constrain(v, min, max){
  if( v < min )
    v = min;
  else
  if( v > max )
    v = max;
  return v;
}

function text_color (bgColor) {
  var r = bgColor[0],
      g = bgColor[1],
      b = bgColor[2];
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}


function brighten_color(hex) {
      
  var before_color = chroma.hex(hex);
  var hue = before_color.hsv()[0]

  if (_.isNaN(hue)) { hue = 0; }

  var return_color = chroma.hsv(hue, Math.max(before_color.hsv()[1], 0.8), Math.max(before_color.hsv()[2], 0.8));

  return return_color.hex();
}


function normalize(num){
    

  var scalar = Math.sqrt( num * num );
  if ( scalar !== 0 ) {

    var invScalar = 1 / scalar;

    num *= invScalar;
    
  } else {

    num = 0;
    
  }

  return num;

}

function map(value, start1,  stop1, start2,  stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function randomBetween(low, high) {
  if (low >= high) return low;
  var diff = high - low;
  return Math.random() * diff + low;
}
