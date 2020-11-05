class Player < ApplicationRecord
  has_many :pieces
  belongs_to :game

  validates :name,  :presence => true
  validates :color,  :presence => true
end