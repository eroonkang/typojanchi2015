require 'yaml'
require 'json'


projects_yaml = YAML.load_file("./projects/projects.yml")


projects_yaml["projects"].each do |project| 

  project_info = {}
  project_info["idx"] = project["idx"]
  project_info["permalink"] = "#{project["idx"]}-#{project["project_name_en"].downcase.gsub(/[^\w ]+/, '').gsub(/ +/, '-')}"
  project_info["project_name_en"] =  project["project_name_en"]
  project_info["project_name_ko"] =  project["project_name_ko"]
  project_info["curator_name_en"] =  project["curator_name_en"]
  project_info["curator_name_ko"] =  project["curator_name_ko"]
  project_info["project_desc_en"] =  project["project_desc_en"]
  project_info["project_desc_ko"] =  project["project_desc_ko"]
  project_info["curator_bio_en"] = project["curator_bio_en"]
  project_info["curator_bio_ko"] = project["curator_bio_ko"]
  project_info["type"] = "Project"


  filename = project["idx"].to_s + "-" + project["project_name_en"].downcase.gsub(/[^\w ]+/, '').gsub(/ +/, '-')


  File.open("./projects/artworks/#{filename}.yml", 'w') {|f| f.write project_info.to_yaml } #Store
end

puts "successfully splited projects yml"