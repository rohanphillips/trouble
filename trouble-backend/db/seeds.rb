# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Game.delete_all
Player.delete_all
Piece.delete_all

game = Game.create(date_started: DateTime.current)

player = Player.create(game_id: game.id, name: "P1", color: "#0000FF")

Piece.create(player_id: player.id, piece_number: 1, board_location: 0)
Piece.create(player_id: player.id, piece_number: 2, board_location: 0)
Piece.create(player_id: player.id, piece_number: 3, board_location: 0)
Piece.create(player_id: player.id, piece_number: 4, board_location: 0)
