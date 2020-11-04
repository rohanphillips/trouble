class Player < ApplicationRecord
  has_many :pieces
  belongs_to :game
end