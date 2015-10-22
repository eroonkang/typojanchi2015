require 'yaml'
require 'json'

artworks = []
# full_name_en: Works
# full_name_ko: 워크스
# origin_city_en: Seoul
# origin_city_ko: 서울
# origin_country_en: KR
# origin_country_ko: 한국
# origin_lat: 37.57363
# origin_lng: 126.99054
# venue_lat: 37.55109
# venue_lng: 126.92022
# 
# artwork_name_en: 
# artwork_name_ko: 

is_284_ratio = 0

Dir["./projects/artworks/*.yml"].each_with_index do |filename, i|
  artwork_yaml = YAML.load_file(filename)
  
  puts artwork_yaml["venue_name_ko"].to_s


  artwork_yaml["artworks"].each do |artwork| 
    artwork_info = {
      artwork_name_ko: artwork["artwork_name_ko"].to_s,
      artwork_name_en: artwork["artwork_name_en"].to_s,
      coordinates: [artwork_yaml["venue_lat"], artwork_yaml["venue_lng"]],
      is_284: artwork_yaml["venue_name_ko"].to_s == "문화역 서울 284"
    }
    artworks << artwork_info

    is_284_ratio = is_284_ratio + 1 if artwork_yaml["venue_name_ko"].to_s == "문화역 서울 284"

  end
end


File.open('./projects/artwork_locations.json', 'w') {|f| f.write artworks.to_json } #Store
# puts venues.to_json.inspect
puts "successfully generated artwork_locations.json #{is_284_ratio} / #{artworks.length}"