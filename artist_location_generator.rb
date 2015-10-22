require 'yaml'
require 'json'

artists = []
# full_name_en: Works
# full_name_ko: 워크스
# origin_city_en: Seoul
# origin_city_ko: 서울
# origin_country_en: KR
# origin_country_ko: 한국
# origin_lat: 37.57363
# origin_lng: 126.99054


Dir["./projects/artworks/*.yml"].each_with_index do |filename, i|
  artwork = YAML.load_file(filename)
  
  artist_info = {
    full_name_ko: artwork["full_name_ko"].to_s,
    full_name_en: artwork["full_name_en"].to_s,
    coordinates: [artwork["origin_lat"], artwork["origin_lng"]]
  }

  artists << artist_info

end


File.open('./projects/artist_locations.json', 'w') {|f| f.write artists.to_json } #Store
# puts venues.to_json.inspect
puts 'successfully generated artist_locations.json'