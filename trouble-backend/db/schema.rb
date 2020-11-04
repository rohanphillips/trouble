# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_04_200340) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.datetime "date_started"
    t.datetime "date_finished"
    t.boolean "complete"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "moves", force: :cascade do |t|
    t.integer "player_id"
    t.integer "piece_id"
    t.integer "number_rolled"
    t.integer "new_position"
  end

  create_table "pieces", force: :cascade do |t|
    t.integer "player_id"
    t.integer "piece_number"
    t.integer "board_location"
  end

  create_table "players", force: :cascade do |t|
    t.integer "game_id"
    t.string "name"
    t.string "color"
    t.datetime "date_created"
    t.datetime "date_updated"
  end

end
