class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :name
      t.string :color
      t.datetime :date_created
      t.datetime :date_updated
    end
  end
end
