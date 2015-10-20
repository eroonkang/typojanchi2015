require 'yaml'

locations = {}
locations['artists'] = []
locations['artworks'] = []


Dir["./projects/artworks/*.yml"].each do |filename|
  artwork = YAML.load_file(filename)
  
  artist_l = {}
  artist_l['full_name_en'] = artwork["full_name_en"]
  artist_l['full_name_ko'] = artwork["full_name_ko"]
  artist_l['origin_lat'] = artwork["origin_lat"]
  artist_l['origin_lng'] = artwork["origin_lng"]
  artist_l['url'] = filename[1..filename.length]

  artwork_l = {}
  artwork_l['venue_name_en'] = artwork["venue_name_en"]
  artwork_l['venue_name_ko'] = artwork["venue_name_ko"]

  artwork_l['artwork_name_en'] = artwork["artwork_name_en"]
  artwork_l['artwork_name_ko'] = artwork["artwork_name_ko"]

  artwork_l['venue_lat'] = artwork["venue_lat"]
  artwork_l['venue_lng'] = artwork["venue_lng"]
  artwork_l['url'] = filename[1..filename.length]


  locations['artists'] << artist_l
  locations['artworks'] << artwork_l
end

File.open('./projects/locations.yml', 'w') {|f| f.write locations.to_yaml } #Store

puts "Successfully built locations.yml"