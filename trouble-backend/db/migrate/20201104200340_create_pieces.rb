class CreatePieces < ActiveRecord::Migration[6.0]
  def change
    create_table :pieces do |t|
      t.integer :player_id
      t.integer :board_location
    end
  end
end
