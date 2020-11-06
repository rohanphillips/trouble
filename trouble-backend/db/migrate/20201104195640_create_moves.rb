class CreateMoves < ActiveRecord::Migration[6.0]
  def change
    create_table :moves do |t|
      t.integer :player_id
      t.integer :piece_id
      t.integer :number_rolled
      t.integer :new_position
    end
  end
end
