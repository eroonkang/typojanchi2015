require 'yaml'
require 'json'
require 'byebug'

def conv_to_permalink(filename)
  /^(.+\/)*(.+)\.(.+)$/.match(filename)[2].downcase
end



projects_name_yaml = YAML.load_file("./projects/projects.yml")

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
  artwork_yaml = YAML.load_file(filename)
  #
  # Venues Node Creation Start
  # 
  # 

  venue_info = {
    type: "Feature",
    properties: {
      venue_name_ko: artwork_yaml["venue_name_ko"].to_s,
      venue_name_en: artwork_yaml["venue_name_en"].to_s,
      type: "Venue"
    },
    geometry: {
      type: "Point",
      coordinates: [artwork_yaml["venue_lng"], artwork_yaml["venue_lat"]]
    }    
  }

  if conv_to_permalink(filename)[0] == "5" || conv_to_permalink(filename)[0] == "7" 
    venue_info[:properties][:permalink] = conv_to_permalink(filename)
  end
  
  if locations[:nodes][:features].size == 0 
    
    venue_info[:properties][:id] = idx
    idx = idx + 1

    locations[:nodes][:features] << venue_info
  else

    results = locations[:nodes][:features].select { |node| node[:properties][:type] == "Venue" && node[:properties][:venue_name_ko] == venue_info[:venue_name_ko].to_s }

    unless results.size > 0 
      venue_info[:properties][:id] = idx
      idx = idx + 1

      locations[:nodes][:features] << venue_info
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
      type: "Feature",
      properties: {
        full_name_ko: artwork_yaml["full_name_ko"].to_s,
        full_name_en: artwork_yaml["full_name_en"].to_s,
        type: "Artist",
        permalink: conv_to_permalink(filename),
        id: idx
      },
      geometry: {
        type: "Point",
        coordinates: [artwork_yaml["origin_lng"], artwork_yaml["origin_lat"]]
      } 
    }
    current_artist_id = idx 

    idx = idx + 1
    locations[:nodes][:features] << artist_info
    
    #
    # Artist Node Creation End
    #
    
    #
    # Artworks Node Creation Start 
    # 


    if conv_to_permalink(filename).split("-")[0].to_i < 11 || conv_to_permalink(filename).split("-")[0].to_i == 7
      # puts conv_to_permalink(filename)
      

      # byebug if artwork_yaml["artworks"].nil?
      artwork_yaml["artworks"].each do |artwork| 
        artwork_info = {

          type: "Feature",
          properties: {
            artwork_name_ko: artwork["artwork_name_ko"].to_s,
            artwork_name_en: artwork["artwork_name_en"].to_s,
            is_284: artwork_yaml["venue_name_ko"].to_s == "문화역 서울 284",
            type: "Artwork",
            permalink: conv_to_permalink(filename),
            id: idx
          },
          geometry: {
            type: "Point",
            coordinates: [artwork_yaml["venue_lng"], artwork_yaml["venue_lat"]]
          } 
        }
        current_artwork_id = idx

        idx = idx + 1
        locations[:nodes][:features] << artwork_info

        # make links between artist and artwork
        locations[:links] << {
          source: current_artist_id,
          target: current_artwork_id,
          value: 1 
        }
      end
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
    type: "Feature",
    properties: {
      project_name_en: project["project_name_en"],
      project_name_ko: project["project_name_ko"],
      permalink: "#{project["idx"]}-#{project["project_name_en"].downcase.gsub(/[^\w ]+/, '').gsub(/ +/, '-')}",
      type: "Project",
      idx: project["idx"],
      id: idx
    },
    geometry: {
      type: "Point",
      coordinates: project["idx"] == 7 ? [126.68672, 37.70884] : [126.9716173, 37.5558393]
    }   
  }
  current_project_id = idx

  idx = idx + 1
  locations[:nodes][:features] << project_info
  


  # connecting project and artwork
  # 
  if project["idx"].to_i >= 11 || project["idx"].to_i == 7
    puts project["project_name_ko"]
    tp = "Artist"
  else
    tp = "Artwork"
  end


  project["project_artists"].each do |artwork|  
    selected_nodes = locations[:nodes][:features].select { |node| (node[:properties][:type] == tp || node[:properties][:type] == "Venue") && node[:properties][:permalink] == conv_to_permalink(artwork["url"])  }
   
    # puts selected_nodes.inspect if project["idx"].to_i >= 12
    
    selected_nodes.each do |selected_node|

      locations[:links] << {
        source: current_project_id, 
        target: selected_node[:properties][:id],
        value: 1 
      }
    end


    unless conv_to_permalink(artwork['url']).split('-')[0].to_i == 5 
      artwork_yaml = YAML.load_file("." + artwork['url'])

      venue_node = locations[:nodes][:features].select { |node| (node[:properties][:type] == "Venue") && node[:properties][:venue_name_ko] == artwork_yaml['venue_name_ko'] }
      byebug if venue_node.size == 0
      venue_node_id = venue_node.first[:properties][:id]

      locations[:links] << {
        source: current_project_id, 
        target: venue_node_id,
        value: 1
      }
    end
  end

end


locations[:links].uniq!

File.open('./projects/locations.json', 'w') {|f| f.write locations.to_json } #Store
# puts venues.to_json.inspect
puts 'successfully generated locations.json'