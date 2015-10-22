require 'yaml'
require 'json'

# venue_names = ["문화역 서울 284", "1984", "알라딘", "아트선재센터", "북바이북", "북소사이어티", "청계상가 200/20", "대림상가 800/40", "DDP 살림터", "두성 인더페이퍼", "에포카", "이음책방", "가가린", "하자센터", "일민미술관", "KCDF 갤러리", "코발트숍", "피노키오", "포스트포에틱스", "라운드어바웃", "세컨호텔", "세운상가 300/20", "스몰하우스빅도어", "송파주민문화발전소 다락", "테이크아웃드로잉", "땡스북스", "TWL", "베로니카 이펙트", "유어마인드", "이리카페", "자그마치", "파티"]
venues = []

def float_equal(a, b)
  if a + 0.0000001 > b and a - 0.0000001 < b
    true
  else
    false
  end
end

Dir["./projects/artworks/*.yml"].each_with_index do |filename, i|
  artwork = YAML.load_file(filename)
  
  venue_info = {
    venue_name_ko: artwork["venue_name_ko"].to_s,
    venue_name_en: artwork["venue_name_en"].to_s,
    coordinates: [artwork["venue_lat"], artwork["venue_lng"]]
  }


  
  if venues.size == 0 
    venues << venue_info
  else

    results = venues.select { |venue| venue[:venue_name_ko] == venue_info[:venue_name_ko].to_s }

    unless results.size > 0 
      venues << venue_info
    end

  end

end


File.open('./projects/venue_locations.json', 'w') {|f| f.write venues.to_json } #Store
# puts venues.to_json.inspect
puts 'successfully generated venues.json'