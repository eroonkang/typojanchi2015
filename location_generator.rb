require 'yaml'
require 'json'
require 'byebug'

def conv_to_permalink(filename)
  /^(.+\/)*(.+)\.(.+)$/.match(filename)[2].downcase
end

locations = {
  nodes: [],
  links: []
}

idx = 1

Dir["./projects/artworks/*.yml"].each_with_index do |filename, i|
  artwork_yaml = YAML.load_file(filename)

  #
  # Venues Node Creation Start
  # 
  
  venue_info = {
    venue_name_ko: artwork_yaml["venue_name_ko"].to_s,
    venue_name_en: artwork_yaml["venue_name_en"].to_s,
    coordinates: [artwork_yaml["venue_lat"], artwork_yaml["venue_lng"]],
    type: "Venue"
  }

  if conv_to_permalink(filename)[0] == "5" || conv_to_permalink(filename)[0] == "7" 
    venue_info[:permalink] = conv_to_permalink(filename)
  end
  
  if locations[:nodes].size == 0 
    
    venue_info[:id] = idx
    idx = idx + 1

    locations[:nodes] << venue_info
  else

    results = locations[:nodes].select { |node| node[:type] == "Venue" && node[:venue_name_ko] == venue_info[:venue_name_ko].to_s }

    unless results.size > 0 
      venue_info[:id] = idx
      idx = idx + 1

      locations[:nodes] << venue_info
    end

  end

  #
  # Venues Node Creation End
  # 
  

  #
  # Artist Node Creation Start 
  # 
  

  unless conv_to_permalink(filename)[0] == "5"  # 엽서전은 아티스트, 아트웍 없음 

    artist_info = {
      full_name_ko: artwork_yaml["full_name_ko"].to_s,
      full_name_en: artwork_yaml["full_name_en"].to_s,
      coordinates: [artwork_yaml["origin_lat"], artwork_yaml["origin_lng"]],
      type: "Artist",
      permalink: conv_to_permalink(filename),
      id: idx
    }
    current_artist_id = idx 

    idx = idx + 1
    locations[:nodes] << artist_info
    
    #
    # Artist Node Creation End
    #
    
    #
    # Artworks Node Creation Start 
    # 


    artwork_yaml["artworks"].each do |artwork| 
      artwork_info = {
        artwork_name_ko: artwork["artwork_name_ko"].to_s,
        artwork_name_en: artwork["artwork_name_en"].to_s,
        coordinates: [artwork_yaml["venue_lat"], artwork_yaml["venue_lng"]],
        is_284: artwork_yaml["venue_name_ko"].to_s == "문화역 서울 284",
        type: "Artwork",
        permalink: conv_to_permalink(filename),
        id: idx
      }
      current_artwork_id = idx

      idx = idx + 1
      locations[:nodes] << artwork_info

      # make links between artist and artwork
      locations[:links] << [current_artist_id, current_artwork_id]
    end
  end
  #
  # Artworks Node Creation End
  #
end

#
# Projects Node Creation Start 
#

projects_yaml = YAML.load_file("./projects/projects.yml")

projects_yaml["projects"].each do |project|
  
  project_info = {
    project_name_en: project["project_name_en"],
    project_name_ko: project["project_name_ko"],
    id: idx
  }
  current_project_id = idx

  idx = idx + 1
  locations[:nodes] << project_info
  


  # connecting project and artwork
  project["project_artists"].each do |artwork|
    selected_nodes = locations[:nodes].select { |node| (node[:type] == "Artwork" || node[:type] == "Venue") && node[:permalink] == conv_to_permalink(artwork["url"])  }
   
    # puts selected_nodes.first.inspect
    
    locations[:links] << [current_project_id, selected_nodes.first[:id]]

    unless conv_to_permalink(artwork['url'])[0] == "5" 
      artwork_yaml = YAML.load_file("." + artwork['url'])

      venue_node = locations[:nodes].select { |node| (node[:type] == "Venue") && node[:venue_name_ko] == artwork_yaml['venue_name_ko'] }
      byebug if venue_node.size == 0
      venue_node_id = venue_node.first[:id]

      locations[:links] << [current_project_id, venue_node_id]
    end
  end

end


locations[:links].uniq!

File.open('./projects/locations.json', 'w') {|f| f.write locations.to_json } #Store
# puts venues.to_json.inspect
puts 'successfully generated locations.json'