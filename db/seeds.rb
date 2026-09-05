# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

[
  { name: 'Wizard Whitebeard', x: 69.28, y: 6.81, x_expand: 2, y_expand: 7 },
  { name: 'Woof', x: 62.16, y: 49.89, x_expand: 1, y_expand: 1 },
  { name: 'Odlaw', x: 18.85, y: 73.26, x_expand: 1, y_expand: 4 },
  { name: 'Wenda', x: 29.29, y: 74.58, x_expand: 1, y_expand: 4 },
  { name: 'Wally', x: 41.60, y: 20.80, x_expand: 2, y_expand: 7 }
].each_with_index do |character, i|
  Character.find_or_create_by!(name: character[:name], serial_no: i,
                               x: character[:x], y: character[:y],
                               x_expand: character[:x_expand], y_expand: character[:y_expand])
end
