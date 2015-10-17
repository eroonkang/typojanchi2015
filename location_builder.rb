require 'yaml'

artworks_location = []



Dir["./projects/artworks/*.yml"].each do |filename|
  artwork = YAML.load_file(filename)
  
  artwork_l = {}
  artwork_l['full_name_en'] = artwork["full_name_en"]
  artwork_l['full_name_ko'] = artwork["full_name_ko"]
  artwork_l['origin_lat'] = artwork["origin_lat"]
  artwork_l['origin_lng'] = artwork["origin_lng"]
  artwork_l['url'] = filename[1..filename.length]

  artworks_location << artwork_l
end

File.open('./projects/locations.yml', 'w') {|f| f.write artworks_location.to_yaml } #Store

puts "Successfully built locations.yml"