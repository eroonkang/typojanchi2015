require 'yaml'
require 'json'
require 'byebug'
projects_ymls = projects_name_yaml["projects"].map {|project| "./projects/artworks/" + project["idx"].to_s + "-" + project["project_name_en"].downcase.gsub(/[^\w ]+/, '').gsub(/ +/, '-') + ".yml" }
# byebug
locations = {
  nodes: { 
    type: "FeatureCollection",
    features: []
  },
  links: []
}

idx = 0

(Dir["./projects/artworks/*.yml"] - projects_ymls).each_with_index do |filename, i|

puts "successfully splited projects yml"