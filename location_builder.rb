require 'yaml'

locations = {}
locations['artist_locations'] = []


Dir["./projects/artworks/*.yml"].each do |filename|
  artwork = YAML.load_file(filename)
  
  artist_l = {}
  artist_l['full_name_en'] = artwork["full_name_en"]
  artist_l['full_name_ko'] = artwork["full_name_ko"]
  artist_l['origin_lat'] = artwork["origin_lat"]
  artist_l['origin_lng'] = artwork["origin_lng"]
  artist_l['url'] = filename[1..filename.length]

  artwork_l = {}
  artwork_l['full_name_en'] = artwork["full_name_en"]
  artwork_l['full_name_ko'] = artwork["full_name_ko"]
  artwork_l['origin_lat'] = artwork["origin_lat"]
  artwork_l['origin_lng'] = artwork["origin_lng"]
  artwork_l['url'] = filename[1..filename.length]


  locations['artist_locations'] << artist_l
end

File.open('./projects/locations.yml', 'w') {|f| f.write locations.to_yaml } #Store

puts "Successfully built locations.yml"