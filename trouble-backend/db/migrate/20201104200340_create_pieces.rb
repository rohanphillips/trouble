class CreatePieces < ActiveRecord::Migration[6.0]
  def change
    create_table :pieces do |t|
      t.integer :player_id
      t.integer :piece_number
      t.string :board_location, :default => ""
    end
  end
end
