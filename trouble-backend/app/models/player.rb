class Player < ApplicationRecord
  has_many :pieces, dependent: :delete_all
  belongs_to :game

  validates :name,  :presence => true
  validates :color,  :presence => true
end