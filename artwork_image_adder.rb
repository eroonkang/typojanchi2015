require 'yaml'
require 'json'
require 'byebug'

def conv_to_permalink(filename)
  /^(.+\/)*(.+)\.(.+)$/.match(filename)[2].downcase
end

def conv_to_permalink_jpg(filename)
  /^(.+\/)*(.+)\.(.+)$/.match(filename)[2].downcase.gsub(/-[0-9]*$/, "").split("__")[0]
end


# 아트워크를 조사한다
# 아트워크를 조사하여 퍼머링크를 추출한다
# images/exhibition에 퍼머링크에 맞는 이미지들을 찾아내어 넣는다
# 모든 이미지들을 찾아내어 그 이미지들을 projects.yml에 하나씩 넣는다 
projects_yaml = YAML.load_file("./projects/projects.yml")
# projects_yaml[]

Dir["./projects/artworks/*.yml"].each_with_index do |filename, i|
  #프로젝트인지 아닌지 
  artwork_yaml = YAML.load_file(filename)
  
  unless artwork_yaml["project_name_en"] == nil
    #프로젝트임 
    #프로젝트면 1- 은 다 넣어야됨
    idx = conv_to_permalink(filename).split("-")[0].to_i
    artwork_yaml["photos"] = []
    # puts idx
    
    Dir["./images/exhibitions/640/*.jpg"].each_with_index do |jpg_name, i|
      # byebug
      permalink = conv_to_permalink_jpg(jpg_name)
      info = YAML.load_file("./projects/artworks/#{permalink}.yml")

      if permalink.split("-")[0].to_i == idx
        photo_info = {}
        photo_info["url"] = jpg_name
        photo_info["permalink"] = permalink
        photo_info["idx"] = idx
        photo_info["project_name_ko"] = artwork_yaml["project_name_ko"]
        photo_info["project_name_en"] = artwork_yaml["project_name_en"]
        photo_info["title_ko"] = info["full_name_ko"]# == nil ? artwork_yaml["project_name_ko"] : info["full_name_ko"]
        photo_info["title_en"] = info["full_name_en"]# == nil ? artwork_yaml["project_name_en"] : info["full_name_en"]

        artwork_yaml["photos"] << photo_info
      end
    end

    projects_yaml["projects"][idx - 1]["photos"] = artwork_yaml["photos"]
    File.open(filename, 'w') {|f| f.write artwork_yaml.to_yaml } #Store

  else
    # #아트워크임 
    permalink = conv_to_permalink(filename)
    artwork_yaml["photos"] = []
    

    Dir["./images/exhibitions/640/*.jpg"].each_with_index do |jpg_name, i|
      unless jpg_name.index(permalink) == nil
        artwork_yaml["photos"] << jpg_name
      end
    end
    
    File.open(filename, 'w') {|f| f.write artwork_yaml.to_yaml } 
    
  end
end

File.open("./projects/projects.yml", 'w') {|f| f.write projects_yaml.to_yaml } #Store

# projects_ymls = projects_name_yaml["projects"].map {|project| "./projects/artworks/" + project["idx"].to_s + "-" + project["project_name_en"].downcase.gsub(/[^\w ]+/, '').gsub(/ +/, '-') + ".yml" }

# (Dir["./projects/artworks/*.yml"] - projects_ymls).each_with_index do |filename, i|

# end

# puts "successfully splited projects yml"