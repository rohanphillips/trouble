class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.datetime :date_started
      t.datetime :date_finished
      t.boolean :complete, :default => false
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
