class Game < ApplicationRecord
  has_many :players, dependent: :delete_all
  has_many :pieces, through: :players
end